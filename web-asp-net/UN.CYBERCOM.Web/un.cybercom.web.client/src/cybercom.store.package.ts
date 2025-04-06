import { makeObservable, observable, runInAction } from "mobx";
import { ApprovalStatus, fromUnixTimestamp } from "./cybercom.store.common";
import { CouncilsViewModel } from "./cybercom.store.council";
import { AddDocumentViewModel } from "./cybercom.store.documents";
import { ProposalsViewModel, ProposalViewModel } from "./cybercom.store.proposals";
import { VoteViewModel } from "./cybercom.store.voting";
import { PackageProposalManager__factory } from "./typechain";
import { MembershipManagement } from "./typechain/contracts/Proposal.sol/ProposalPackage";
import { UpdatePackageViewModel } from "./cybercom.store.package.add";

export class PackagesViewModel extends ProposalsViewModel<MembershipManagement.ProposalPackageResponseStructOutput, PackageViewModel> {
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
    async loadProposals(status: ApprovalStatus): Promise<PackageViewModel[]> {
        const vms: PackageViewModel[] = [];
        if (this.contractModel.contract && this.contractModel.contractAddresses.packageManagerAddress) {
            const contract = PackageProposalManager__factory.connect(this.contractModel.contractAddresses.packageManagerAddress, this.contractModel.signer);
            const contracts = await contract.getRequests(status);
            contracts.forEach(async (v) => {
                const vm = new PackageViewModel(this.contractModel, this.councils);
                vm.updateObj(v);
                vms.push(vm);
                await vm.updateModel?.load();
            });
        }
        return vms;
    }
}
export class PackageViewModel extends ProposalViewModel<MembershipManagement.ProposalPackageResponseStructOutput> {
    proposals: bigint[] = [];
    councils: CouncilsViewModel;
    updateModel: UpdatePackageViewModel | undefined = undefined;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            votes: observable,
            councils: observable,
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
            packageAddress: observable,
            updateModel: observable,
        });
    }
    updateObj(obj: MembershipManagement.ProposalPackageResponseStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.votes.length = 0;
            obj.votes.forEach(v => {
                const vm = new VoteViewModel(this.councils);
                vm.updateObj(v);
                this.votes.push(vm);
            });
            this.proposals.length = 0;
            obj.proposals.forEach(p => {
                this.proposals.push(p);
            });
            this.duration = fromUnixTimestamp(obj.duration);
            this.status = Number(obj.status);
            this.isProcessing = obj.isProcessing;
            this.votingStarted = obj.votingStarted;
            this.owner = obj.owner;
            this.proposalAddress = obj.proposalAddress;
            this.addDocument = new AddDocumentViewModel(this.contractModel, obj.proposalAddress);
            this.updateModel = new UpdatePackageViewModel(this.contractModel, obj.proposalAddress);
        });
    }

}