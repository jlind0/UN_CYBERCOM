import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/CouncilManager'
export class CouncilViewModel {
    name: string | undefined = undefined;
    role: string | undefined = undefined;
    groups: CouncilGroupViewModel[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.CouncilStructOutput) {
        runInAction(() => {
            this.role = obj.role;
            this.name = obj.name;
            this.groups.length = 0;
            obj.groups.forEach((g) => {
                var gvm = new CouncilGroupViewModel();
                gvm.updateObj(g);
                this.groups.push(gvm);
            });
        });
    }
}
export class CouncilGroupViewModel {
    id: bigint | undefined = undefined;
    name: string | undefined = undefined;
    nations: NationViewModel[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.CouncilGroupStructOutput) {
        runInAction(() => {
            this.nations.length = 0;
            this.id = obj.id;
            this.name = obj.name;
            obj.members.forEach((m) => {
                const nat = new NationViewModel();
                nat.updateObj(m);
                this.nations.push(nat);
            });
        });
    }
}
export class NationViewModel {
    id: string | undefined = undefined;
    name: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.NationStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.name = obj.name;
        });
    }
}