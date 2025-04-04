import { makeAutoObservable, runInAction } from 'mobx';
import { Proposal__factory } from './typechain';
import { verifyMessage } from 'ethers';
import { MembershipManagement as PMM } from './typechain/contracts/Proposal.sol/MembershipProposal'
import { computeHash, hexToByteArray } from './cybercom.store.common';

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
    async verify(): Promise<boolean> {
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
