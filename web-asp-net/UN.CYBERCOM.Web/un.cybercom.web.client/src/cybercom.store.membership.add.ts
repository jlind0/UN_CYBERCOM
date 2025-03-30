import { makeAutoObservable, runInAction } from 'mobx';
export class AddMemberStore {
    cyberComStore: ContractModel | undefined = undefined;
    newNationName: string | undefined = undefined;
    newNationAddress: string | undefined = undefined;
    deploying: boolean = false;
    selectedGroupId: string | undefined = undefined;
    isOpen: boolean = false;
    constructor(store: ContractModel) {
        makeAutoObservable(this);
        this.cyberComStore = store;
    }
    async proposeMember(): Promise<boolean> {
        try {
            if (this.newNationName === undefined || this.newNationAddress === undefined || this.selectedGroupId === undefined ||
                this.cyberComStore?.contract === undefined || this.cyberComStore.signer === undefined)
                return false;
            runInAction(() => {
                this.deploying = true;
            });
            const resp = await this.cyberComStore.contract.submitMembershipProposal({
                owner: this.cyberComStore.signer.address,
                newNation: {
                    name: this.newNationName,
                    id: this.newNationAddress
                },
                member: this.newNationAddress,
                duration: BigInt(0),
                groupId: BigInt(this.selectedGroupId)
            });
            await resp.wait();
            return true;
        }
        catch {
            return false;
        }
        finally {
            runInAction(() => {
                this.deploying = false;
                this.newNationAddress = undefined;
                this.newNationName = undefined;
                this.isOpen = false;
            });
        }
    }
}