import { CybercomStore } from './cybercom.store';
import { AddMemberStore } from './cybercom.store.membership.add';
import { MembershipProposalViewModel } from './cybercom.store.membership';
import { MembershipRemovalViewModel } from './cybercom.store.membership.remove';
import { RemoveMemberStore } from './cybercom.store.membership.remove';
import { AddDocumentViewModel } from './cybercom.store.documents';
import { ProposalViewModel } from './cybercom.store.proposals';
import { VotingParametersProposalViewModel, VotingParametersViewModels } from "./cybercom.store.voting_parameters";
import { ChangeVotingParametersStore } from "./cybercom.store.voting_parameters.add";
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
export interface ChangeVotingParametersTableParameters {
    proposals: VotingParametersProposalViewModel[];
}
export interface ChangeVotingParametersProposalParameter {
    changeVoting: ChangeVotingParametersStore;
}
export interface RemoveMembershipTableParameters {
    proposals: MembershipRemovalViewModel[];
}
export interface VotingParametersParameters {
    votingParameters: VotingParametersViewModels;
}
export interface AddDocumentParameter {
    addDocument: AddDocumentViewModel | undefined;
}

export interface ProposalItemParameter {
    item: ProposalViewModel<unknown>;
}