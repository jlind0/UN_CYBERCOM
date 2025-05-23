// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./MembershipManagement.sol";
import "./Proposal.sol";

contract CouncilManager{
    bytes32 public immutable BROKER_ROLE = keccak256("BROKER");
    bytes32 public immutable POWER_ROLE = keccak256("POWER");
    bytes32 public immutable CENTRAL_ROLE = keccak256("CENTRAL");
    bytes32 public immutable EMERGING_ROLE = keccak256("EMERGING");
    bytes32 public immutable GENERAL_ROLE = keccak256("GENERAL");
    bytes32 public immutable LESSER_ROLE = keccak256("LESSER");
    bytes32 public immutable INDUSTRY_ROLE = keccak256("INDUSTRY");

    function getAllRoles() public view returns(bytes32[] memory){
        return councilRoles;
    }

    uint public totalNations;
    uint totalCouncilGroups;
    address[] nationAddresses;
    mapping(address => MembershipManagement.Nation) nations;
    mapping(address => bytes32) nationsCouncil;
    mapping(uint => bytes32) councilGroups;
    bytes32[] councilRoles;
    mapping(bytes32 => MembershipManagement.Council) councils;
    address daoAddress;
    constructor(address _daoAddress){
        daoAddress = _daoAddress;
        councils[BROKER_ROLE].name = "Broker";
        councils[BROKER_ROLE].role = BROKER_ROLE;
        councils[BROKER_ROLE].votingParameters = MembershipManagement.VotingParameters(false, false, 0, 0, 1, 0, 1, 0, false);
        councils[BROKER_ROLE].groups.push();
        councils[BROKER_ROLE].groups[0].id = ++totalCouncilGroups;
        councils[BROKER_ROLE].groups[0].name = "Primary";
        councils[BROKER_ROLE].motionRules.numberOfSeconds = 0;
        councilGroups[totalCouncilGroups] = BROKER_ROLE;
        
        councilRoles.push(BROKER_ROLE);
        councils[POWER_ROLE].name = "Power";
        councils[POWER_ROLE].role = POWER_ROLE;
        councils[POWER_ROLE].votingParameters = MembershipManagement.VotingParameters(false, true, 0, 1, 1, 6, 1, 1, false);
        councils[POWER_ROLE].groups.push();
        councils[POWER_ROLE].groups[0].id = ++totalCouncilGroups;
        councils[POWER_ROLE].groups[0].name = "Primary";
        councils[POWER_ROLE].motionRules.numberOfSeconds = 0;
        councilGroups[totalCouncilGroups] = POWER_ROLE;
        
        councilRoles.push(POWER_ROLE);
        councils[CENTRAL_ROLE].name = "Central";
        councils[CENTRAL_ROLE].role = CENTRAL_ROLE;
        councils[CENTRAL_ROLE].votingParameters = MembershipManagement.VotingParameters(false, false, 0, 1, 3, 1, 1, 2, false);
        councils[CENTRAL_ROLE].groups.push();
        councils[CENTRAL_ROLE].groups[0].name = "Primary";
        councils[CENTRAL_ROLE].groups[0].id = ++totalCouncilGroups;
        councils[CENTRAL_ROLE].motionRules.numberOfSeconds = 1;
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(BROKER_ROLE);
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(POWER_ROLE);
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(CENTRAL_ROLE);
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(EMERGING_ROLE);
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(LESSER_ROLE);
        councils[CENTRAL_ROLE].motionRules.councilsThatCanMotion.push(INDUSTRY_ROLE);
        councilGroups[totalCouncilGroups] = CENTRAL_ROLE;
        
        councilRoles.push(CENTRAL_ROLE);
        councils[EMERGING_ROLE].name = "Emerging";
        councils[EMERGING_ROLE].role = EMERGING_ROLE;
        councils[EMERGING_ROLE].votingParameters = MembershipManagement.VotingParameters(true, false, 1, 0, 5, 3, 1, 4, false);
        councils[EMERGING_ROLE].motionRules.numberOfSeconds = 1;
        councils[EMERGING_ROLE].motionRules.onlyWithinOwnGroup = true;
        councils[EMERGING_ROLE].groups.push();
        councils[EMERGING_ROLE].groups[0].id = ++totalCouncilGroups;
        councils[EMERGING_ROLE].groups[0].name = "Group A";
        councilGroups[totalCouncilGroups] = EMERGING_ROLE;
        councils[EMERGING_ROLE].groups.push();
        councils[EMERGING_ROLE].groups[1].id = ++totalCouncilGroups;
        councils[EMERGING_ROLE].groups[1].name = "Group B";
        councilGroups[totalCouncilGroups] = EMERGING_ROLE;
        
        councilRoles.push(EMERGING_ROLE);
        councils[GENERAL_ROLE].name = "General";
        councils[GENERAL_ROLE].role = GENERAL_ROLE;
        councils[GENERAL_ROLE].votingParameters = MembershipManagement.VotingParameters(false, false, 0, 0, 1, 1, 1, 2, true);
        councils[GENERAL_ROLE].motionRules.requiresMajority = true;
        councils[GENERAL_ROLE].motionRules.onlyWithinOwnGroup = true;
        councils[GENERAL_ROLE].groups.push();
        councils[GENERAL_ROLE].groups[0].name = "Primary";
        councils[GENERAL_ROLE].groups[0].id = ++totalCouncilGroups;
        councilGroups[totalCouncilGroups] = GENERAL_ROLE;
        councilRoles.push(GENERAL_ROLE);

        councils[LESSER_ROLE].name = "Lesser";
        councils[LESSER_ROLE].role = LESSER_ROLE;
        councils[LESSER_ROLE].votingParameters = MembershipManagement.VotingParameters(false, false, 0, 1, 3, 1, 1, 5, false);
        councils[LESSER_ROLE].motionRules.disabled = true;
        councils[LESSER_ROLE].groups.push();
        councils[LESSER_ROLE].groups[0].name = "Primary";
        councils[LESSER_ROLE].groups[0].id = ++totalCouncilGroups;
        councilGroups[totalCouncilGroups] = LESSER_ROLE;
        councilRoles.push(LESSER_ROLE);

        councils[INDUSTRY_ROLE].name = "Industry";
        councils[INDUSTRY_ROLE].role = INDUSTRY_ROLE;
        councils[INDUSTRY_ROLE].votingParameters = MembershipManagement.VotingParameters(false, false, 0, 1, 7, 1, 1, 1, false);
        councils[INDUSTRY_ROLE].motionRules.numberOfSeconds = 2;
        councils[INDUSTRY_ROLE].motionRules.onlyWithinOwnGroup = true;
        councils[INDUSTRY_ROLE].groups.push();
        councils[INDUSTRY_ROLE].groups[0].name = "Primary";
        councils[INDUSTRY_ROLE].groups[0].id = ++totalCouncilGroups;
        councilGroups[totalCouncilGroups] = INDUSTRY_ROLE;
        councilRoles.push(INDUSTRY_ROLE);
    }
    function getCouncils()
        public view returns(MembershipManagement.Council[] memory)
    {
        uint i = 0;
        MembershipManagement.Council[] memory cs = new MembershipManagement.Council[](councilRoles.length);
        while(i < councilRoles.length){
            cs[i] = councils[councilRoles[i]];
            i++;
        }
        return cs;
    }
    error NationDoesNotExist();
    function removeNation(address nationId) isFromDAO() public returns(bytes32 role){
        if(!doesNationExist(nationId))
            revert NationDoesNotExist();
        MembershipManagement.Council storage c = councils[nationsCouncil[nationId]];
        uint i = 0;
        bool stop = false;
        while(i < c.groups.length){
            MembershipManagement.CouncilGroup storage cg = c.groups[i];
            uint j = 0;
            while(j < cg.members.length){
                if(cg.members[j].id == nationId){
                    if(j != cg.members.length - 1)
                        cg.members[j] = cg.members[cg.members.length - 1];
                    cg.members.pop();
                    uint k = 0;
                    while(k < nationAddresses.length){
                        if(nationAddresses[k] == nationId){
                            if(k != nationAddresses.length -1){
                                nationAddresses[k] = nationAddresses[nationAddresses.length - 1];
                            }
                            nationAddresses.pop();
                        }
                        k++;
                    }
                    delete nations[nationId];
                    delete nationsCouncil[nationId];
                    stop = true;
                    break;
                }
                j++;
            }
            if(stop)
                break;
            i++;
        }
        return c.role;
    }
    function getNationCount() public view returns (uint){
        return nationAddresses.length;
    }
    function getCouncilForGroupId(uint groupId) public view returns(MembershipManagement.Council memory){
        return councils[councilGroups[groupId]];
    }
    error Unauthorized();
    modifier isFromDAO() {
        if(msg.sender != daoAddress) revert Unauthorized();
        _;
    }
    error NationAlreadyExists();
    function acceptNewMember(address proposalAddress)
        public isFromDAO() returns(address memberId, bytes32 role)
    {
        MembershipProposal prop = MembershipProposal(proposalAddress);
        MembershipManagement.Nation memory nat = prop.getNation();
        if(doesNationExist(nat.id))
            revert NationAlreadyExists();
        uint groupId = prop.groupId();
        MembershipManagement.Council storage targetCouncil = councils[councilGroups[groupId]];
        uint i = 0;
        while(i < targetCouncil.groups.length){
            if(targetCouncil.groups[i].id == groupId)
                break;
            i++;
        }
        MembershipManagement.CouncilGroup storage group = targetCouncil.groups[i];
        totalNations++;
        
        nations[nat.id] = nat;
        nationAddresses.push(nat.id);
        nationsCouncil[nat.id] = targetCouncil.role;
        group.members.push(nat);
        return (nat.id, targetCouncil.role);
    }
    error CouncilNotFound();
    function findCouncilGroup(MembershipManagement.Council memory council, address nationId)
        private pure returns(MembershipManagement.CouncilGroup memory)
    {
        uint j = 0;
        while(j < council.groups.length)
        {
            uint k = 0;
            while(k < council.groups[j].members.length){
                if(council.groups[j].members[k].id == nationId){
                    return council.groups[j];
                }
                k++;
            }
            j++;
        }
        revert CouncilNotFound();
    }
    function getIndexForCouncil(bytes32 role)
        private view returns(uint)
    {
        if(role == GENERAL_ROLE)
            return 0;
        if(role == POWER_ROLE)
            return 1;
        if(role == CENTRAL_ROLE)
            return 2;
        if(role == EMERGING_ROLE)
            return 3;
        if(role == BROKER_ROLE)
            return 4;
        if(role == LESSER_ROLE)
            return 5;
        if(role == INDUSTRY_ROLE)
            return 6;
        revert CouncilNotFound();
    }
    error LogicError();
    function getCouncilVotes(MembershipManagement.Vote[] memory vs)
        public view returns(MembershipManagement.CouncilVotes[] memory)
    {
        uint i = 0;
        MembershipManagement.CouncilVotes[] memory cvs = new MembershipManagement.CouncilVotes[](7);
        while(i < vs.length){
            MembershipManagement.Vote memory vt = vs[i];
            MembershipManagement.Council memory council = getCouncilForNation(vt.member);
            MembershipManagement.CouncilGroup memory cg = findCouncilGroup(council, vt.member);
            uint idx = getIndexForCouncil(council.role);
            MembershipManagement.CouncilVotes memory cv = cvs[idx];
            cv.councilId = council.role;
            cv.votingParameters = council.votingParameters;
            if(cv.votes.length == 0)
                cv.votes = new MembershipManagement.CouncilGroupVotes[](council.groups.length);
            uint groupVotes = 0;
            while(groupVotes < cv.votes.length)
            {
                cv.votes[groupVotes] = MembershipManagement.CouncilGroupVotes(council.groups[groupVotes].id, new MembershipManagement.Vote[](vs.length), 0);
                groupVotes++;
            }
            uint targetGroup = 0;
            while(targetGroup < cv.votes.length){
                if(cv.votes[targetGroup].groupId == cg.id)
                    break;
                targetGroup++;
            }
            if(targetGroup > cv.votes.length)
                revert LogicError();
            cv.votes[targetGroup].votes[i] = vt;
            cvs[idx] = cv;
            i++;
        }
        return cvs;
    }
    function updateVotingParameters(address proposalAddress) isFromDAO() public{
        ChangeVotingParametersProposal prop = ChangeVotingParametersProposal(proposalAddress);
        MembershipManagement.ChangeVotingParametersResponse memory changeSet = prop.getChangeResponse();
        uint i = 0;
        while(i < changeSet.parameters.length){
            MembershipManagement.ChangeVotingParametersRole memory role = changeSet.parameters[i];
            MembershipManagement.Council storage council = councils[role.council];
            if(council.groups.length == 0)
                revert LogicError();
            council.votingParameters.avgVotes = role.parameters.avgVotes;
            council.votingParameters.outputCountForGroup = role.parameters.outputCountForGroup;
            council.votingParameters.outputCountForMember = role.parameters.outputCountForMember;
            council.votingParameters.randomizeByGroup = role.parameters.randomizeByGroup;
            council.votingParameters.randomizeByMember = role.parameters.randomizeByMember;
            council.votingParameters.sumDenominator = role.parameters.sumDenominator;
            council.votingParameters.sumNumerator = role.parameters.sumNumerator;
            council.votingParameters.voteDenominator = role.parameters.voteDenominator;
            council.votingParameters.voteNumerator = role.parameters.voteNumerator;
            i++;
        }
    }
    function getCouncil(bytes32 role) 
        public view returns (MembershipManagement.Council memory)
    {
        return councils[role];
    }
    function doesCouncilExist(bytes32 role) public view returns(bool){
        return councils[role].groups.length > 0;
    }
    function getCouncilRoleForGroup(uint groupId) public view returns(bytes32){
        return councilGroups[groupId];
    }
    function doesCouncilGroupExist (uint groupId) public view returns(bool){
        return councils[councilGroups[groupId]].groups.length > 0;
    }
    function doesNationExist(address memberId) public view returns(bool){
        return nations[memberId].id == memberId;
    }
    function getNation(address id) view public returns(MembershipManagement.Nation memory){
        return nations[id];
    }
    function getCouncilForNation(address nationId) public view returns(MembershipManagement.Council memory){
        MembershipManagement.Council memory c = councils[nationsCouncil[nationId]];
        return c;
    }
    function getCouncilGroupForNation(address nationId) public view returns(MembershipManagement.CouncilGroup memory){
        uint i = 0;
        while(i < councilRoles.length){
            MembershipManagement.Council memory council = councils[nationsCouncil[nationId]];
            uint k = 0;
            while(k < council.groups.length){
                MembershipManagement.CouncilGroup memory group = council.groups[k];
                uint j = 0;
                while(j < group.members.length){
                    if(group.members[j].id == nationId)
                        return group;
                    j++;
                }
                k++;
            }
            i++;
        }
        revert();
    }
}