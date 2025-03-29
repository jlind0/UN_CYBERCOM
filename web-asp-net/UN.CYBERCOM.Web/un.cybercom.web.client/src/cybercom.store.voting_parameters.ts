import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/CybercomDAO';
export class VotingParameters {
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
}