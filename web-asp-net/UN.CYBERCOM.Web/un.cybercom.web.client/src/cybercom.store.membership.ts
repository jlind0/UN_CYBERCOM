import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipManager';
import { MembershipManagement as PMM } from './typechain/contracts/Proposal.sol/MembershipProposal'
import { NationViewModel, CouncilsViewModel, CouncilGroupViewModel, CouncilViewModel } from './cyebrcom.store.council';
import { verifyMessage } from 'ethers';
import {
    MembershipManager__factory,
    Proposal__factory
} from './typechain';
export enum ApprovalStatus {
    Entered = 0,
    Pending = 1,
    Ready = 2,
    Approved = 3,
    Rejected = 4
}
export async function computeHash(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Invalid data");
    }
    const data = await response.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint8Array(hashBuffer);
    // Convert bytes to hex string (uppercase)
    return toHex(hashArray, true);
}
export function hexToByteArray(value: string): Uint8Array {
  // If the string is null or empty, return an empty Uint8Array.
  if (!value) {
    return new Uint8Array(0);
  }

  const length = value.length;
  // If the hex string starts with "0x", skip those two characters.
  let index = value.startsWith("0x") ? 2 : 0;
  let effectiveLength = length - index;
  let oddLength = false;

  // If the effective length is odd, mark it and increment the count to make it even.
  if (effectiveLength % 2 !== 0) {
    oddLength = true;
    effectiveLength++;
  }

  const byteArray = new Uint8Array(effectiveLength / 2);
  let pos = 0;

  // If the hex digits count was odd, process the first character separately.
  if (oddLength) {
    byteArray[pos++] = fromCharacterToByte(value.charAt(index), index);
    index++;
  }

  // Process pairs of characters.
  for (let i = index; i < value.length; i += 2) {
    // The first character in the pair is shifted left by 4 bits.
    const highNibble = fromCharacterToByte(value.charAt(i), i, 4);
    // The second character is used as is.
    const lowNibble = fromCharacterToByte(value.charAt(i + 1), i + 1);
    byteArray[pos++] = highNibble | lowNibble;
  }

  return byteArray;
}

/**
 * Converts a single hex character to its numerical value.
 * @param c The hex character.
 * @param index The index of the character (used for error messages).
 * @param shift If provided as 4, the result is shifted left by 4 bits.
 * @returns The nibble value (optionally shifted) for the given hex character.
 */
function fromCharacterToByte(c: string, index: number, shift: number = 0): number {
  const nibble = parseInt(c, 16);
  if (isNaN(nibble)) {
    throw new Error(`Invalid hex character at index ${index}: ${c}`);
  }
  return shift === 4 ? nibble << 4 : nibble;
}

export function toHex(value: Uint8Array, prefix: boolean = false): string {
    const hex = Array.from(value, byte => byte.toString(16).padStart(2, '0')).join('');
    return (prefix ? '0x' : '') + hex;
}

export class AddDocumentViewModel {
    url: string | undefined = undefined;
    isOpen: boolean = false;
    contractModel: ContractModel;
    signature: string | undefined = undefined;
    proposalAddress: string;
    documentHash: string | undefined = undefined;
    title: string | undefined = undefined;
    isDeploying: boolean = false;
    constructor(contractModel: ContractModel, proposalAddress: string) {
        this.contractModel = contractModel;
        this.proposalAddress = proposalAddress;
        makeAutoObservable(this);
    }
    
    async signHash() {
        if (!this.url || !window.ethereum)
            return;
        const documentHash = await computeHash(this.url);
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [documentHash, this.contractModel.signer?.address]
        });
        runInAction(() => {
            this.signature = signature;
            this.documentHash = documentHash;
        });
    }
    async add() {
        try {
            runInAction(() => {
                this.isDeploying = true;
            });
            if (!this.signature || !this.proposalAddress) {
                throw new Error("Invalid data");
            }
            if (this.contractModel.contract && this.contractModel.signer && this.title && this.url && this.documentHash && this.signature) {
                const contract = Proposal__factory.connect(this.proposalAddress, this.contractModel.signer);
                const resp = await contract.addDocument(this.contractModel.signer.address, this.title, this.url,
                    this.documentHash,
                    this.signature, { gasLimit: 5000000 });
                await resp.wait();
            }
        }
        catch (ex) {
            console.error(ex);
        }
        finally {
            runInAction(() => {
                this.isDeploying = false;
                this.isOpen = false;
            });
        }
    }
}
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
        makeAutoObservable(this);
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
        makeAutoObservable(this);
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
export class MembershipProposalsViewModel extends ProposalsViewModel<MembershipManagement.MembershipProposalResponseStructOutput, MembershipProposalViewModel> {
    councils: CouncilsViewModel;
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        super(contractModel);
        this.councils = councils;
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
    }
    updateObj(obj: MembershipManagement.MembershipProposalResponseStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.member = obj.member;
            this.newNation.updateObjMM(obj.newNation);
            this.council = this.councils.getCouncil(obj.council)
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
            this.addDocument = new AddDocumentViewModel(this.contractModel, obj.proposalAddress);
        });
    }
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
export class DocumentViewModel {
    title: string | undefined = undefined;
    url: string | undefined = undefined;
    hash: string | undefined = undefined;
    signature: string | undefined = undefined;
    docAddress: string | undefined = undefined;
    signer: string | undefined = undefined;
    isVerified: boolean = false;
    contractModel: ContractModel;
    constructor(contractModel: ContractModel) {
        this.contractModel = contractModel;
        makeAutoObservable(this);
    }
    updateObj(obj: PMM.DocStructOutput) {
        runInAction(() => {
            this.title = obj.title;
            this.url = obj.url;
            this.hash = obj.dochash
            this.docAddress = obj.docAddress;
            this.signature = obj.signature;
            this.signer = obj.signer;
        });
    }
    async verify() : Promise<boolean> {
        if (this.url) {
            const hash = await computeHash(this.url);
            if (this.hash == hash && this.signature) {
                const address = verifyMessage(hexToByteArray(hash), this.signature);
                this.isVerified = this.signer == address;
            }
            else
                this.isVerified = false;

        }
        return this.isVerified;
    }
}
export function fromUnixTimestamp(timestamp: bigint | number): Date {
    const seconds = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
    let dt = new Date(1970, 1, 1);
    dt = new Date(dt.getTime() + seconds*1000);
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
