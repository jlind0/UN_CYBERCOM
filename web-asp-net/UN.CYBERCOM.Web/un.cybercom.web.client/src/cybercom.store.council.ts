import { makeAutoObservable, runInAction } from 'mobx';
import { MembershipManagement } from './typechain/contracts/CouncilManager';
import { MembershipManagement as MM } from './typechain/contracts/Membership.sol/MembershipManager';
export class CouncilsViewModel {
    councils: CouncilViewModel[] = [];
    nations: NationViewModel[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    load(vms: CouncilViewModel[]) {
        runInAction(() => {
            this.councils.length = 0;
            this.nations.length = 0;
            vms.forEach(c => {
                this.councils.push(c);
                c.groups.forEach((g) => {
                    g.nations.forEach((n) => {
                        this.nations.push(n);
                    });
                });
            });
        });
    }
    getCouncil(role: string): CouncilViewModel | undefined {
        let cncl: CouncilViewModel | undefined = undefined;
        this.councils.forEach(c => {
            if (c.role === role)
                cncl = c;
        });
        return cncl;
    }
    getCouncilGroup(groupId: bigint): CouncilGroupViewModel | undefined {
        let group: CouncilGroupViewModel | undefined = undefined;
        this.councils.forEach(c => {
            c.groups.forEach(g => {
                if (g.id === groupId)
                    group = g;
            });
        });
        return group;
    }
    getNation(address: string): NationViewModel | undefined {
        let nation: NationViewModel | undefined = undefined;
        this.councils.forEach(c => {
            c.groups.forEach(g => {
                g.nations.forEach(n => {
                    if (n.id == address)
                        nation = n;
                });
            });
        });
        return nation;
    }
}
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
                const gvm = new CouncilGroupViewModel();
                gvm.councilName = this.name;
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
    councilName: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.CouncilGroupStructOutput) {
        runInAction(() => {
            this.nations.length = 0;
            this.id = obj.id;
            this.name = obj.name;
            this.councilName = this.councilName + ' - ' + obj.name;
            obj.members.forEach((m) => {
                const nat = new NationViewModel();
                nat.councilName = this.councilName;
                nat.updateObj(m);
                this.nations.push(nat);
            });
        });
    }
}
export class NationViewModel {
    id: string | undefined = undefined;
    name: string | undefined = undefined;
    councilName: string | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    updateObj(obj: MembershipManagement.NationStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.name = obj.name;
        });
    }
    updateObjMM(obj: MM.NationStructOutput) {
        runInAction(() => {
            this.id = obj.id;
            this.name = obj.name;
        });
    }
}