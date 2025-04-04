import { CybercomStore } from './cybercom.store';
import { AddMemberStore } from './cybercom.store.membership.add';
import { MembershipProposalViewModel } from './cybercom.store.membership'; 
export interface CybercomStoreParameter {
    store: CybercomStore;
}
export interface AddMembershipProposalParameter {
    addStore: AddMemberStore;
}

export interface MembershipProposalTableParameters {
    proposals: MembershipProposalViewModel[];
}