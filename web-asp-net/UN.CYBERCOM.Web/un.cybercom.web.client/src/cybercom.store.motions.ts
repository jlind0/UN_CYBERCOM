import { fromUnixTimestamp } from './cybercom.store.common';
import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/Membership.sol/MembershipManager';
import { CouncilsViewModel, NationViewModel } from './cybercom.store.council';
export class MotionViewModel {
    member: NationViewModel | undefined = undefined;
    timestamp: Date | undefined = undefined;
    proposalId: bigint | undefined = undefined;
    councils: CouncilsViewModel;
    constructor(councils: CouncilsViewModel) {
        makeAutoObservable(this);
        this.councils = councils;
    }

    updateObj(obj: MembershipManagement.MotionStructOutput) {
        runInAction(() => {
            this.member = this.councils.getNation(obj.member);
            this.timestamp = fromUnixTimestamp(obj.timestamp);
            this.proposalId = obj.proposalId;

        });

    }
}