import { makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';
import { CouncilsViewModel, NationViewModel } from './cybercom.store.council';
import { ApprovalStatus, fromUnixTimestamp } from './cybercom.store.common';
import { AddDocumentViewModel } from './cybercom.store.documents';
import { ProposalsViewModel, ProposalViewModel } from './cybercom.store.proposals';
import { VoteViewModel } from './cybercom.store.voting';
import { MembershipRemovalManager__factory } from './typechain';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipRemovalManager';
import { ZeroAddress } from 'ethers/constants';
export class RemoveMemberStore {
    cyberComStore: ContractModel | undefined = undefined;
    deploying: boolean = false;
    selectedNationAddress: string | undefined = undefined;
    isOpen: boolean = false;
    councils: CouncilsViewModel;

    constructor(store: ContractModel, councils: CouncilsViewModel) {
        makeAutoObservable(this);
        this.cyberComStore = store;
        this.councils = councils;
    }
    async removeMember(): Promise<boolean> {
        try {
            if (this.selectedNationAddress === undefined ||
                this.cyberComStore?.contract === undefined || this.cyberComStore.signer === undefined)
                return false;
            runInAction(() => {
                this.deploying = true;
            });
            const resp = await this.cyberComStore.contract.submitMembershipRemovalProposal({
                owner: this.cyberComStore.signer.address,
                nationToRemove: this.selectedNationAddress,
                duration: BigInt(0)
            });
            await resp.wait();
            return true;
        }
        catch {
            return false;
        }
        finally {
            runInAction(() => {
                this.deploying = false;
                this.selectedNationAddress = undefined;
                this.isOpen = false;
            });
        }
    }
}

export class MembershipRemovalsViewModel extends ProposalsViewModel<MembershipManagement.MembershipRemovalResponseStructOutput, MembershipRemovalViewModel> {
    councils: CouncilsViewModel;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            councils: observable,
            enteredProposals: observable,
            pendingProposals: observable,
            readyProposals: observable,
            acceptedProposals: observable,
            rejectedProposals: observable,
            isLoading: observable
        });
    }
    async loadProposals(status: ApprovalStatus): Promise<MembershipRemovalViewModel[]> {
        const vms: MembershipRemovalViewModel[] = [];
        if (this.contractModel.contract && this.contractModel.contractAddresses.membershipRemovalAddress) {
            const contract = MembershipRemovalManager__factory.connect(this.contractModel.contractAddresses.membershipRemovalAddress, this.contractModel.signer);
            const contracts = await contract.getMembershipRemovalRequests(status);
            contracts.forEach((v) => {
                const vm = new MembershipRemovalViewModel(this.contractModel, this.councils);
                vm.updateObj(v);
                vms.push(vm);
            });
        }
        return vms;
    }
}
export class MembershipRemovalViewModel extends ProposalViewModel<MembershipManagement.MembershipRemovalResponseStructOutput> {
    nationToRemove: NationViewModel | undefined = undefined;
    councils: CouncilsViewModel;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            nationToRemove: observable,
            votes: observable,
            duration: observable,
            status: observable,
            isProcessing: observable,
            votingStarted: observable,
            owner: observable,
            proposalAddress: observable,
            documents: observable,
            addDocument: observable,
            id: observable,
            vote: observable,
            packageAddress: observable
        });
    }
    updateObj(obj: MembershipManagement.MembershipRemovalResponseStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.nationToRemove = this.councils.getNation(obj.nationToRemove.id);
            this.votes.length = 0;
            obj.votes.forEach(v => {
                const vm = new VoteViewModel(this.councils);
                vm.updateObj(v);
                this.votes.push(vm);
            });
            this.packageAddress = obj.packageAddress === ZeroAddress ? undefined : obj.packageAddress;
            this.duration = fromUnixTimestamp(obj.duration);
            this.status = Number(obj.status);
            this.isProcessing = obj.isProcessing;
            this.votingStarted = obj.votingStarted;
            this.owner = obj.owner;
            this.proposalAddress = obj.proposalAddress;
            this.addDocument = new AddDocumentViewModel(this.contractModel, obj.proposalAddress);
        });
    }
    
}