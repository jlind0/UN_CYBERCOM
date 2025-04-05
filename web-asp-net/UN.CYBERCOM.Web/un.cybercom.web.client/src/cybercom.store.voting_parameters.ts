import { makeAutoObservable, makeObservable, runInAction, observable } from 'mobx';
import { MembershipManagement } from './typechain/contracts/CybercomDAO';
import { ProposalsViewModel, ProposalViewModel } from './cybercom.store.proposals';
import { MembershipManagement as CMM } from './typechain/contracts/Proposal.sol/ChangeVotingParametersProposal';
import { CouncilsViewModel } from './cybercom.store.council';
import { ApprovalStatus, fromUnixTimestamp } from './cybercom.store.common';
import { VotingParametersManager__factory } from './typechain';
import { AddDocumentViewModel } from './cybercom.store.documents';
import { VoteViewModel } from './cybercom.store.voting';
export class VotingParametersViewModels {
    votingParameters: VotingParametersViewModel[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(votingParameters: VotingParametersViewModel[]) {
        runInAction(() => {
            this.votingParameters.length = 0;
            votingParameters.forEach((v) => {
                this.votingParameters.push(v);
            });
        });
    }
}
export class VotingParametersViewModel {
    randomizeByGroup: boolean | undefined = undefined;
    randomizeByMember: boolean | undefined = undefined;
    outputCountForGroup: bigint | undefined = undefined;
    outputCountForMember: bigint | undefined = undefined;
    voteDenominator: bigint | undefined = undefined;
    voteNumerator: bigint | undefined = undefined;
    sumDenominator: bigint | undefined = undefined;
    sumNumerator: bigint | undefined = undefined;
    avgVotes: boolean | undefined = undefined;
    councilName: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(name: string, obj: MembershipManagement.VotingParametersStructOutput) {
        runInAction(() => {
            this.randomizeByGroup = obj.randomizeByGroup;
            this.randomizeByMember = obj.randomizeByMember;
            this.outputCountForGroup = obj.outputCountForGroup;
            this.outputCountForMember = obj.outputCountForMember;
            this.voteDenominator = obj.voteDenominator;
            this.voteNumerator = obj.voteNumerator;
            this.sumDenominator = obj.sumDenominator;
            this.sumNumerator = obj.sumNumerator;
            this.avgVotes = obj.avgVotes;
            this.councilName = name;
        });
    }
    updateObjForProposal(name: string | undefined, obj: CMM.VotingParametersStructOutput) {
        runInAction(() => {
            this.randomizeByGroup = obj.randomizeByGroup;
            this.randomizeByMember = obj.randomizeByMember;
            this.outputCountForGroup = obj.outputCountForGroup;
            this.outputCountForMember = obj.outputCountForMember;
            this.voteDenominator = obj.voteDenominator;
            this.voteNumerator = obj.voteNumerator;
            this.sumDenominator = obj.sumDenominator;
            this.sumNumerator = obj.sumNumerator;
            this.avgVotes = obj.avgVotes;
            this.councilName = name;
        });
    }
}
export class VotingParametersProposalViewModel extends ProposalViewModel<CMM.ChangeVotingParametersResponseStructOutput> {
    
    councils: CouncilsViewModel;
    votingParameters: VotingParametersViewModels = new VotingParametersViewModels();
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            councils: observable,
            votingParameters: observable,
            isProcessing: observable,
            status: observable,
            duration: observable,
            votingStarted: observable,
            owner: observable,
            proposalAddress: observable,
            documents: observable,
            addDocument: observable,
            id: observable,
            votes: observable,
            vote: observable
        });
    }
    updateObj(obj: CMM.ChangeVotingParametersResponseStructOutput): void {
        runInAction(() => {
            const votingParms: VotingParametersViewModel[] = [];
            obj.parameters.forEach((v) => {
                const vm = new VotingParametersViewModel();
                vm.updateObjForProposal(this.councils.getCouncil(v.council)?.name, v.parameters);
                votingParms.push(vm);
            });
            this.votes.length = 0;
            obj.votes.forEach(v => {
                const vm = new VoteViewModel(this.councils);
                vm.updateObj(v);
                this.votes.push(vm);
            });
            this.votingParameters.updateObj(votingParms);
            this.id = obj.id;
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
export class VotingParametersProposalsViewModel extends ProposalsViewModel<CMM.ChangeVotingParametersResponseStructOutput, VotingParametersProposalViewModel> {
    
    councils: CouncilsViewModel;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
        makeObservable(this, {
            enteredProposals: observable,
            pendingProposals: observable,
            readyProposals: observable,
            acceptedProposals: observable,
            rejectedProposals: observable,
            isLoading: observable
        });
    }
    async loadProposals(status: ApprovalStatus): Promise<VotingParametersProposalViewModel[]> {
        const vms: VotingParametersProposalViewModel[] = [];
        if (this.contractModel.contract && this.contractModel.contractAddresses.votingParametersManagerAddress) {
            const contract = VotingParametersManager__factory.connect(this.contractModel.contractAddresses.votingParametersManagerAddress, this.contractModel.signer);
            const contracts = await contract.getRequests(status);
            contracts.forEach((v) => {
                const vm = new VotingParametersProposalViewModel(this.contractModel, this.councils);
                vm.updateObj(v);
                vms.push(vm);
            });
        }
        return vms;
    }
}