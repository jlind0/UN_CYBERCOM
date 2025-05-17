// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";

library MembershipManagement {
    struct ContractAddresses{
        address daoAddress;
        address votingAddress;
        address councilManagementAddress;
        address proposalStorageAddress;
        address membershipRemovalAddress;
        address membershipManagerAddress;
        address votingParametersManagerAddress;
        address packageManagerAddress;
    }
    struct MembershipProposalRequest {
        address member;
        Nation newNation;
        uint groupId;
        uint duration;
        address owner;
        uint maxOpenDuration;
    }
    struct MembershipRemovalRequest {
        address nationToRemove;
        uint duration;
        address owner;
        uint maxOpenDuration;
    }
    struct Nation {
        address id;
        string name;
    }
    struct Vote{
        address member;
        bool voteCasted;
        uint timestamp;
        uint proposalId;
    }
    struct Motion{
        address member;
        uint timestamp;
        uint proposalId;
    }
    struct Council{
        string name;
        bytes32 role;
        VotingParameters votingParameters;
        MotionRules motionRules;
        CouncilGroup[] groups;
    }
    struct CouncilGroup{
        uint id;
        string name;
        Nation[] members;
    }
    struct VotingParameters{
        bool randomizeByGroup;
        bool randomizeByMember;
        uint32 outputCountForGroup;
        uint32 outputCountForMember;
        uint voteDenominator;
        uint voteNumerator;
        uint sumDenominator;
        uint sumNumerator;
        bool avgVotes;
    }
    struct MotionRules{
        uint numberOfSeconds;
        bool requiresMajority;
        bool onlyWithinOwnGroup;
        bool disabled;
        bytes32[] councilsThatCanMotion;
    }
    struct ChangeVotingParametersRole{
        bytes32 council;
        VotingParameters parameters;
    }
    struct ChangeVotingParametersRequest{
        ChangeVotingParametersRole[] parameters;
        uint duration;
        address owner;
        uint maxOpenDuration;
    }
    struct ChangeVotingParametersResponse{
        uint id;
        ChangeVotingParametersRole[] parameters;
        Vote[] votes;
        uint duration;
        ApprovalStatus status;
        bool isProcessing;
        bool votingStarted;
        address owner;
        address proposalAddress;
        address packageAddress;
        uint timestamp;
        uint motionCloseTimestamp;
        Motion[] motions;
    }
    struct MembershipProposalResponse{
        uint id;
        address member;
        Nation newNation;
        bytes32 council;
        uint groupId;
        Vote[] votes;
        uint duration;
        ApprovalStatus status;
        bool isProcessing;
        bool votingStarted;
        address owner;
        address proposalAddress;
        address packageAddress;
        uint timestamp;
        uint motionCloseTimestamp;
        Motion[] motions;
    }
    struct MembershipRemovalResponse{
        uint id;
        Nation nationToRemove;
        Vote[] votes;
        uint duration;
        ApprovalStatus status;
        bool isProcessing;
        bool votingStarted;
        address owner;
        address proposalAddress;
        address packageAddress;
        uint timestamp;
        uint motionCloseTimestamp;
        Motion[] motions;
    }
    struct ProposalPackageRequest{
        uint duration;
        address owner;
        uint maxOpenDuration;
    }
    struct ProposalPackageResponse{
        uint id;
        uint[] proposals;
        Vote[] votes;
        uint duration;
        ApprovalStatus status;
        bool isProcessing;
        bool votingStarted;
        address owner;
        address proposalAddress;
        uint timestamp;
        uint motionCloseTimestamp;
        Motion[] motions;
    }
    struct ProposalResponse{
        uint id;
        Vote[] votes;
        uint duration;
        ApprovalStatus status;
        bool isProcessing;
        bool votingStarted;
        address owner;
        address proposalAddress;
        uint timestamp;
        uint motionCloseTimestamp;
        Motion[] motions;
    }
    struct Doc{
        string  title;
        string  url;
        bytes32  dochash;
        bytes  signature;
        address  signer;
        address docAddress;
    }
    struct CouncilVotes{
        bytes32 councilId;
        MembershipManagement.VotingParameters votingParameters;
        CouncilGroupVotes[] votes;
        int score;
    }
    struct CouncilGroupVotes{
        uint groupId;
        Vote[] votes;
        int score;
    }
    enum ProposalTypes {
        Membership,
        MinVoteDuration,
        UpdateVotingParameters,
        MembershipRemoval,
        Package
    }
    enum ApprovalStatus {
        Entered,
        Motioning,
        MotionFailure,
        Pending,
        Ready,
        Approved,
        Rejected
    }
    struct TallyResult{
        CouncilVotes[] acceptedVotes;
        int score;
        ApprovalStatus status;
        uint proposalId;
    }
}