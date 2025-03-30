import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipManager';
import { NationViewModel, CouncilsViewModel, CouncilGroupViewModel, CouncilViewModel } from './cyebrcom.store.council';
import { MembershipManager__factory } from './typechain';
enum ApprovalStatus {
    Entered = 0,
    Pending = 1,
    Ready = 2,
    Approved = 3,
    Rejected = 4
}

export class MembershipProposalsViewModel {
    isLoading: boolean = false;
    councils: CouncilsViewModel;
    contractModel: ContractModel;
    enteredProposals: MembershipProposalViewModel[] = [];
    pendingProposals: MembershipProposalViewModel[] = [];
    readyProposals: MembershipProposalViewModel[] = [];
    acceptedProposals: MembershipProposalViewModel[] = [];
    rejectedProposals: MembershipProposalViewModel[] = [];
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        this.contractModel = contractModel;
        this.councils = councils;
        makeAutoObservable(this);
    }
    async load() {
        try {
            runInAction(() => {
                this.isLoading = true;
            });
            if (this.contractModel.contract && this.contractModel.contractAddresses.membershipManagerAddress) {
                const contract = MembershipManager__factory.connect(this.contractModel.contractAddresses.membershipManagerAddress, this.contractModel.signer);
                const entered = await contract.getMembershipRequests(ApprovalStatus.Entered);
                const pending = await contract.getMembershipRequests(ApprovalStatus.Pending);
                const ready = await contract.getMembershipRequests(ApprovalStatus.Ready);
                const accepted = await contract.getMembershipRequests(ApprovalStatus.Approved);
                const rejected = await contract.getMembershipRequests(ApprovalStatus.Rejected);
                runInAction(() => {
                    this.enteredProposals.length = 0;
                    this.pendingProposals.length = 0;
                    this.readyProposals.length = 0;
                    this.acceptedProposals.length = 0;
                    this.rejectedProposals.length = 0;
                    entered.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.councils);
                        vm.updateObj(v);
                        this.enteredProposals.push(vm);
                    });
                    pending.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.councils);
                        vm.updateObj(v);
                        this.pendingProposals.push(vm);
                    });
                    ready.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.councils);
                        vm.updateObj(v);
                        this.acceptedProposals.push(vm);
                    });
                    accepted.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.councils);
                        vm.updateObj(v);
                        this.readyProposals.push(vm);
                    });
                    rejected.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.councils);
                        vm.updateObj(v);
                        this.rejectedProposals.push(vm);
                    });
                });
                
            }
        }
        finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}
export class MembershipProposalViewModel {
    id: bigint | undefined = undefined;
    member: string | undefined = undefined;
    newNation: NationViewModel = new NationViewModel();
    council: CouncilViewModel | undefined = undefined;
    group: CouncilGroupViewModel | undefined = undefined;
    votes: VoteViewModel[] = [];
    duration: Date | undefined = undefined;
    status: ApprovalStatus | undefined = undefined;
    isProcessing: boolean | undefined = undefined;
    votingStarted: boolean | undefined = undefined;
    owner: string | undefined = undefined;
    proposalAddress: string | undefined = undefined;
    councils: CouncilsViewModel;
    constructor(councils: CouncilsViewModel) {
        this.councils = councils;
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.MembershipProposalResponseStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.member = obj.member;
            this.newNation.updateObjMM(obj.newNation);
            this.council = this.councils.getCouncil(obj.council);
            this.group = this.councils.getCouncilGroup(obj.groupId);
            this.votes.length = 0;
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
        });
    }
}
export function fromUnixTimestamp(timestamp: bigint | number): Date {
    const seconds = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
    let dt = new Date(1970, 1, 1);
    dt = new Date(dt.getTime() + seconds);
    return dt;
}

export class VoteViewModel {
    member: NationViewModel | undefined = undefined;
    voteCasted: boolean | undefined = undefined;
    timestamp: Date | undefined = undefined;
    proposalId: bigint | undefined = undefined;
    councils: CouncilsViewModel;
    constructor(councils: CouncilsViewModel) {
        this.councils = councils;
        makeAutoObservable(this);
    }

    updateObj(obj: MembershipManagement.VoteStructOutput) {
        runInAction(() => {
            this.member = this.councils.getNation(obj.member);
            this.voteCasted = obj.voteCasted;
            this.timestamp = fromUnixTimestamp(obj.timestamp);
            this.proposalId = obj.proposalId;

        });

    }
}
