import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipManager';
import { MembershipManagement as PMM } from './typechain/contracts/Proposal.sol/MembershipProposal'
import { NationViewModel, CouncilsViewModel, CouncilGroupViewModel, CouncilViewModel } from './cyebrcom.store.council';
import { verifyMessage } from 'ethers';
import {
    MembershipProposal__factory, MembershipManager__factory,
    Proposal__factory
} from './typechain';
import { sign } from 'node:crypto';
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
                const contract = MembershipProposal__factory.connect(this.proposalAddress, this.contractModel.signer);
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
                        const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                        vm.updateObj(v);
                        this.enteredProposals.push(vm);
                    });
                    pending.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                        vm.updateObj(v);
                        this.pendingProposals.push(vm);
                    });
                    ready.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                        vm.updateObj(v);
                        this.acceptedProposals.push(vm);
                    });
                    accepted.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                        vm.updateObj(v);
                        this.readyProposals.push(vm);
                    });
                    rejected.forEach((v) => {
                        const vm = new MembershipProposalViewModel(this.contractModel, this.councils);
                        vm.updateObj(v);
                        this.rejectedProposals.push(vm);
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
    addDocument: AddDocumentViewModel | undefined = undefined;
    contractModel: ContractModel;
    documents: DocumentViewModel[] = [];
    constructor(contractModel: ContractModel, councils: CouncilsViewModel) {
        this.councils = councils;
        this.contractModel = contractModel;
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
    async verify() {
        if (this.url) {
            const hash = await computeHash(this.url);
            if (this.hash == hash && this.signer) {
                this.isVerified = this.signature == verifyMessage(hash, this.signer);
            }
            else
                this.isVerified = false;

        }
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
