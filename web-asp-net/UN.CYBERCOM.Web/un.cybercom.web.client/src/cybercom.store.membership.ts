import { runInAction, makeObservable, observable } from 'mobx';
import { AddDocumentViewModel} from './cybercom.store.documents';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipManager';
import { NationViewModel, CouncilsViewModel, CouncilGroupViewModel, CouncilViewModel } from './cybercom.store.council';
import { ProposalViewModel, ProposalsViewModel } from './cybercom.store.proposals';
import { ApprovalStatus, fromUnixTimestamp } from './cybercom.store.common';
import { VoteViewModel } from './cybercom.store.voting';
import { ZeroAddress } from 'ethers/constants';

import {
    MembershipManager__factory
} from './typechain';



export class MembershipProposalsViewModel extends ProposalsViewModel<MembershipManagement.MembershipProposalResponseStructOutput, MembershipProposalViewModel> {
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
    async loadProposals(status: ApprovalStatus): Promise<MembershipProposalViewModel[]> {
        const vms: MembershipProposalViewModel[] = [];
        if (this.contractModel.contract && this.contractModel.contractAddresses.membershipManagerAddress) {
            const contract = MembershipManager__factory.connect(this.contractModel.contractAddresses.membershipManagerAddress, this.contractModel.signer);
            const contracts = await contract.getMembershipRequests(status);
            contracts.forEach((v) => {
                const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                vm.updateObj(v);
                vms.push(vm);
            });
        }
        return vms;
    }
}
export class MembershipProposalViewModel extends ProposalViewModel<MembershipManagement.MembershipProposalResponseStructOutput> {
    member: string | undefined = undefined;
    newNation: NationViewModel = new NationViewModel();
    council: CouncilViewModel | undefined = undefined;
    group: CouncilGroupViewModel | undefined = undefined;
    councils: CouncilsViewModel;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            member: observable,
            newNation: observable,
            council: observable,
            group: observable,
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
    updateObj(obj: MembershipManagement.MembershipProposalResponseStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.member = obj.member;
            this.newNation.updateObjMM(obj.newNation);
            this.council = this.councils.getCouncil(obj.council)
            this.group = this.councils.getCouncilGroup(obj.groupId);
            this.votes.length = 0;
            this.packageAddress = obj.packageAddress === ZeroAddress ? undefined : obj.packageAddress;
            obj.votes.forEach(v => {
                const vm = new VoteViewModel(this.councils);
                vm.updateObj(v);
                this.votes.push(vm);
            });
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


