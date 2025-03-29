import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/CybercomDAO';
export class ContractAddresses {
    daoAddress: string | undefined = undefined;
    votingAddress: string | undefined = undefined;
    councilManagementAddress: string | undefined = undefined;
    proposalStorageAddress: string | undefined = undefined;
    membershipRemovalAddress: string | undefined = undefined;
    membershipManagerAddress: string | undefined = undefined;
    votingParametersManagerAddress: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.ContractAddressesStructOutput) {
        runInAction(() => {
            this.daoAddress = obj.daoAddress;
            this.votingAddress = obj.votingAddress;
            this.councilManagementAddress = obj.councilManagementAddress;
            this.proposalStorageAddress = obj.proposalStorageAddress;
            this.membershipManagerAddress = obj.membershipManagerAddress;
            this.membershipRemovalAddress = obj.membershipRemovalAddress;
            this.votingParametersManagerAddress = obj.votingParametersManagerAddress;
        });
    }
}
