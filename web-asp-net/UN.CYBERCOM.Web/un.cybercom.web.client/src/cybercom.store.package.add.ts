import { makeAutoObservable, runInAction } from 'mobx';
import { ProposalType, ApprovalStatus } from './cybercom.store.common';
import { ZeroAddress } from 'ethers/constants';
import { MembershipManager__factory, MembershipRemovalManager__factory, VotingParametersManager__factory} from './typechain'; 
export class EnteredProposalViewModel {
    id: bigint | undefined = undefined;
    address: string | undefined = undefined;
    proposalType: ProposalType | undefined = undefined;
    isSelected: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(id: bigint, address: string, proposalType: ProposalType) {
        runInAction(() => {
            this.address = address;
            this.proposalType = proposalType;
            this.id = id;
        });
    }
}
export class UpdatePackageViewModel {
    cyberComStore: ContractModel | undefined = undefined;
    deploying: boolean = false;
    isOpen: boolean = false;
    packageAddress: string;
    packages: EnteredProposalViewModel[] = [];
    constructor(store: ContractModel, packageAddress: string) {
        makeAutoObservable(this);
        this.cyberComStore = store;
        this.packageAddress = packageAddress;
    }
    async load() {
        if (this.cyberComStore?.contract === undefined
            || this.cyberComStore.signer === undefined
            || this.cyberComStore.contractAddresses.membershipManagerAddress === undefined
            || this.cyberComStore.contractAddresses.membershipRemovalAddress === undefined
            || this.cyberComStore.contractAddresses.votingParametersManagerAddress === undefined)
            return;
        const membershipProposals = MembershipManager__factory.connect(this.cyberComStore.contractAddresses.membershipManagerAddress, this.cyberComStore.signer);
        const membershipRemovalProposals = MembershipRemovalManager__factory.connect(this.cyberComStore.contractAddresses.membershipRemovalAddress, this.cyberComStore.signer);
        const votingParametersProposals = VotingParametersManager__factory.connect(this.cyberComStore.contractAddresses.votingParametersManagerAddress, this.cyberComStore.signer);
        const propMembership = await membershipProposals.getMembershipRequests(ApprovalStatus.Entered);
        const propMembershipRemoval = await membershipRemovalProposals.getMembershipRemovalRequests(ApprovalStatus.Entered);
        const propVotingParameters = await votingParametersProposals.getRequests(ApprovalStatus.Entered);
        runInAction(() => {
            this.packages.length = 0;
            propMembership.forEach((v) => {
                if (v.packageAddress !== this.packageAddress && v.packageAddress !== ZeroAddress)
                    return;
                const vm = new EnteredProposalViewModel();
                vm.updateObj(v.id, v.proposalAddress, ProposalType.Membership);
                vm.isSelected = v.packageAddress === this.packageAddress;
                this.packages.push(vm);
            });
            propMembershipRemoval.forEach((v) => {
                if (v.packageAddress !== this.packageAddress && v.packageAddress !== ZeroAddress)
                    return;
                const vm = new EnteredProposalViewModel();
                vm.updateObj(v.id, v.proposalAddress, ProposalType.MembershipRemoval);
                vm.isSelected = v.packageAddress === this.packageAddress;
                this.packages.push(vm);
            });
            propVotingParameters.forEach((v) => {
                if (v.packageAddress !== this.packageAddress && v.packageAddress !== ZeroAddress)
                    return;
                const vm = new EnteredProposalViewModel();
                vm.updateObj(v.id, v.proposalAddress, ProposalType.UpdateVotingParameters);
                vm.isSelected = v.packageAddress === this.packageAddress;
                this.packages.push(vm);
            });
        });
    }
    async updatePackage(): Promise<boolean> {
        try {
            if (this.cyberComStore?.contract === undefined || this.cyberComStore.signer === undefined)
                return false;
            let x = 0;
            while (x < this.packages.length) {
                const p = this.packages[x];
                if (p.isSelected && p.address && this.cyberComStore && this.cyberComStore.contract) {
                    const resp = await this.cyberComStore.contract.enlistPackage(this.packageAddress, p.address);
                    await resp.wait();
                }
                x++;
            }
            alert("Package Updated");
            return true;
        }
        catch {
            return false;
        }
    }
}
export class AddPackageStore {
    cyberComStore: ContractModel;
    deploying: boolean = false;
    isOpen: boolean = false;

    constructor(store: ContractModel) {
        makeAutoObservable(this);
        this.cyberComStore = store;

    }
    
    async submitPackage(): Promise<boolean> {
        try {
            if (
                this.cyberComStore.contract === undefined || this.cyberComStore.signer === undefined)
                return false;
            runInAction(() => {
                this.deploying = true;
            });
            const resp = await this.cyberComStore.contract.submitPackageProposal({
                owner: this.cyberComStore.signer.address,
                duration: BigInt(0),

            });
            await resp.wait();
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
        finally {
            runInAction(() => {
                this.deploying = false;
                this.isOpen = false;
            });
        }
    }
}