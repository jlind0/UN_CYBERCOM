import { CybercomStore } from './cybercom.store';
import { AddMemberStore } from './cybercom.store.membership.add';
import { MembershipProposalViewModel } from './cybercom.store.membership';
import { MembershipRemovalViewModel } from './cybercom.store.membership.remove';
import { RemoveMemberStore } from './cybercom.store.membership.remove';
import { AddDocumentViewModel } from './cybercom.store.documents';
export interface CybercomStoreParameter {
    store: CybercomStore;
}
export interface AddMembershipProposalParameter {
    addStore: AddMemberStore;
}

export interface MembershipProposalTableParameters {
    proposals: MembershipProposalViewModel[];
}
export interface RemoveMembershipProposalParameter {
    removeStore: RemoveMemberStore;
}
export interface RemoveMembershipTableParameters {
    proposals: MembershipRemovalViewModel[];
}
export interface AddDocumentParameter {
    addDocument: AddDocumentViewModel | undefined;
}