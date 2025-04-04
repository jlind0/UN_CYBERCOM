import { runInAction } from 'mobx';
import { AddDocumentViewModel, DocumentViewModel } from './cybercom.store.documents';
import { Proposal__factory } from './typechain'; 
import { ApprovalStatus } from './cybercom.store.common';
import { VoteViewModel } from './cybercom.store.voting';
export abstract class ProposalViewModel<TProposalDTO> {
    id: bigint | undefined = undefined;
    votes: VoteViewModel[] = [];
    duration: Date | undefined = undefined;
    status: ApprovalStatus | undefined = undefined;
    isProcessing: boolean | undefined = undefined;
    votingStarted: boolean | undefined = undefined;
    owner: string | undefined = undefined;
    proposalAddress: string | undefined = undefined;
    contractModel: ContractModel;
    documents: DocumentViewModel[] = [];
    addDocument: AddDocumentViewModel | undefined = undefined;
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
}
export abstract class ProposalsViewModel<TProposalDTO, TViewModel extends ProposalViewModel<TProposalDTO>> {
    isLoading: boolean = false;
    contractModel: ContractModel;
    enteredProposals: TViewModel[] = [];
    pendingProposals: TViewModel[] = [];
    readyProposals: TViewModel[] = [];
    acceptedProposals: TViewModel[] = [];
    rejectedProposals: TViewModel[] = [];
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
                runInAction(() => {
                    this.enteredProposals.length = 0;
                    this.pendingProposals.length = 0;
                    this.readyProposals.length = 0;
                    this.acceptedProposals.length = 0;
                    this.rejectedProposals.length = 0;
                    entered.forEach((v) => {
                        this.enteredProposals.push(v);
                    });
                    pending.forEach((v) => {
                        this.pendingProposals.push(v);
                    });
                    ready.forEach((v) => {
                        this.acceptedProposals.push(v);
                    });
                    accepted.forEach((v) => {
                        this.readyProposals.push(v);
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