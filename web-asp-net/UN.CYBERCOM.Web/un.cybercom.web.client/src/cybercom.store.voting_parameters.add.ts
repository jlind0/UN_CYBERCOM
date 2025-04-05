import { makeAutoObservable, runInAction } from "mobx";
import { VotingParametersViewModels } from "./cybercom.store.voting_parameters";
import { MembershipManagement } from "./typechain/contracts/CybercomDAO";
import { CouncilsViewModel } from "./cybercom.store.council"; 

export class ChangeVotingParametersStore {
    cyberComStore: ContractModel | undefined = undefined;
    deploying: boolean = false;
    isOpen: boolean = false;
    votingParameters: VotingParametersViewModels;
    councils: CouncilsViewModel;
    constructor(store: ContractModel, councils: CouncilsViewModel, votingParameters: VotingParametersViewModels) {
        this.cyberComStore = store;
        this.votingParameters = votingParameters;
        this.councils = councils;
        makeAutoObservable(this);
        
    }
    async changeVotingParameters(): Promise<boolean> {
        try {
            if (this.votingParameters.votingParameters.length != 7 ||
                this.cyberComStore?.contract === undefined || this.cyberComStore.signer === undefined)
                return false;
            runInAction(() => {
                this.deploying = true;
            });
            const vps: MembershipManagement.ChangeVotingParametersRoleStruct[] = [];
            this.councils.councils.forEach((council) => {
                const parms: MembershipManagement.VotingParametersStruct[] = [];
                const counciId = council.role;
                if (counciId === undefined) return;
                this.votingParameters.votingParameters.filter((vp) => vp.councilName == council.name).forEach((vp) => {
                    if (vp.randomizeByGroup === undefined || vp.randomizeByMember === undefined ||
                        vp.outputCountForGroup === undefined || vp.outputCountForMember === undefined ||
                        vp.voteDenominator === undefined || vp.voteNumerator === undefined ||
                        vp.sumDenominator === undefined || vp.sumNumerator === undefined ||
                        vp.avgVotes === undefined) { return; }
                    parms.push({
                        randomizeByGroup: vp.randomizeByGroup,
                        randomizeByMember: vp.randomizeByMember,
                        outputCountForGroup: vp.outputCountForGroup,
                        outputCountForMember: vp.outputCountForMember,
                        voteDenominator: vp.voteDenominator,
                        voteNumerator: vp.voteNumerator,
                        sumDenominator: vp.sumDenominator,
                        sumNumerator: vp.sumNumerator,
                        avgVotes: vp.avgVotes
                    });
                });
                vps.push({
                    council: counciId,
                    parameters: parms[0]
                });
            });
            if (vps.length != 7)
                return false;
            const resp = await this.cyberComStore.contract.submitChangeVotingParameters({
                parameters: vps,
                duration: BigInt(0),
                owner: this.cyberComStore.signer.address
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
                this.isOpen = false;
            });
        }
    }
}