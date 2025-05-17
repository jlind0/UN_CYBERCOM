import { runInAction } from 'mobx';
import { AddDocumentViewModel, DocumentViewModel } from './cybercom.store.documents';
import { Proposal__factory } from './typechain'; 
import { ApprovalStatus } from './cybercom.store.common';
import { VoteViewModel } from './cybercom.store.voting';
import { MotionViewModel } from './cybercom.store.motions';
export abstract class ProposalViewModel<TProposalDTO> {
    id: bigint | undefined = undefined;
    votes: VoteViewModel[] = [];
    motions: MotionViewModel[] = [];
    duration: Date | undefined = undefined;
    status: ApprovalStatus | undefined = undefined;
    isProcessing: boolean | undefined = undefined;
    votingStarted: boolean | undefined = undefined;
    owner: string | undefined = undefined;
    proposalAddress: string | undefined = undefined;
    contractModel: ContractModel;
    documents: DocumentViewModel[] = [];
    addDocument: AddDocumentViewModel | undefined = undefined;
    vote: boolean = false;
    packageAddress: string | undefined = undefined;
    motionClosesTimestamp: Date | undefined = undefined;
    constructor(contractModel: ContractModel) {
        this.contractModel = contractModel;
    }
    abstract updateObj(obj: TProposalDTO): void;
    async load() {
        if (this.proposalAddress && this.contractModel.signer) {
            const prop = Proposal__factory.connect(this.proposalAddress, this.contractModel.signer);
            const docs = await prop.getDocuments();
            runInAction(() => {
                this.documents.length = 0;
                docs.forEach(d => {
                    const vm = new DocumentViewModel(this.contractModel);
                    vm.updateObj(d);
                    this.documents.push(vm);
                });
            });
        }
    }
    async motion() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.motionProposal(this.id);
            await resp.wait();
            alert("Motioning started");
        }
    }
    async checkMotionCarry() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.checkMotionCarry(this.id);
            await resp.wait();
            alert("Motion carry checked");
        }
    }
    async startVoting() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.startVoting(this.id);
            await resp.wait();
            alert("Voting started");
        }
    }
    async performVote() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.performVote(this.id, this.vote);
            await resp.wait();
            alert("Vote submitted");
        }
    }
    async startTally() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.prepareTally(this.id);
            await resp.wait();
            alert("Tally started");
        }
    }
    async completeTally() {
        if (this.id && this.contractModel.contract && this.contractModel.signer) {
            const resp = await this.contractModel.contract.completeVoting(this.id);
            await resp.wait();
            alert("Tally finished");
        }
    }
}
export abstract class ProposalsViewModel<TProposalDTO, TViewModel extends ProposalViewModel<TProposalDTO>> {
    isLoading: boolean = false;
    contractModel: ContractModel;
    enteredProposals: TViewModel[] = [];
    pendingProposals: TViewModel[] = [];
    readyProposals: TViewModel[] = [];
    acceptedProposals: TViewModel[] = [];
    rejectedProposals: TViewModel[] = [];
    motioningProposals: TViewModel[] = [];
    motionFailedProposals: TViewModel[] = [];
    constructor(contractModel: ContractModel) {
        this.contractModel = contractModel;
    }
    abstract loadProposals(status: ApprovalStatus): Promise<TViewModel[]>;
    async load() {
        try {
            runInAction(() => {
                this.isLoading = true;
            });
            if (this.contractModel.contract && this.contractModel.contractAddresses.membershipManagerAddress) {
                const entered = await this.loadProposals(ApprovalStatus.Entered);
                const pending = await this.loadProposals(ApprovalStatus.Pending);
                const ready = await this.loadProposals(ApprovalStatus.Ready);
                const accepted = await this.loadProposals(ApprovalStatus.Approved);
                const rejected = await this.loadProposals(ApprovalStatus.Rejected);
                const motioning = await this.loadProposals(ApprovalStatus.Motioning);
                const motionFailed = await this.loadProposals(ApprovalStatus.MotionFailure);
                runInAction(() => {
                    this.enteredProposals.length = 0;
                    this.pendingProposals.length = 0;
                    this.readyProposals.length = 0;
                    this.acceptedProposals.length = 0;
                    this.rejectedProposals.length = 0;
                    this.motionFailedProposals.length = 0;
                    this.motioningProposals.length = 0;
                    entered.forEach((v) => {
                        this.enteredProposals.push(v);
                    });
                    motioning.forEach((v) => {
                        this.motioningProposals.push(v);
                    });
                    motionFailed.forEach((v) => {
                        this.motionFailedProposals.push(v);
                    }); 
                    pending.forEach((v) => {
                        this.pendingProposals.push(v);
                    });
                    ready.forEach((v) => {
                        this.readyProposals.push(v);
                    });
                    accepted.forEach((v) => {
                        this.acceptedProposals.push(v);
                    });
                    rejected.forEach((v) => {
                        this.rejectedProposals.push(v);
                    });
                    this.enteredProposals.forEach(async (v) => {
                        await v.load();
                    });
                    this.pendingProposals.forEach(async (v) => {
                        await v.load();
                    });
                    this.readyProposals.forEach(async (v) => {
                        await v.load();
                    });
                    this.acceptedProposals.forEach(async (v) => {
                        await v.load();
                    });
                    this.rejectedProposals.forEach(async (v) => {
                        await v.load();
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