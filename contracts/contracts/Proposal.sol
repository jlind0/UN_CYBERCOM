// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./MembershipManagement.sol";
import "./CouncilManager.sol";
import "./Document.sol";
import "./Utils.sol";

/**
 * @title Proposal
 * @dev Abstract contract for managing proposals within a DAO.
 *      Includes functionalities for voting, updating status, and managing documents.
 */
abstract contract Proposal is DocumentsHolder {
    uint public id;
    MembershipManagement.ProposalTypes public proposalType;
    uint public duration;
    MembershipManagement.ApprovalStatus public status;
    uint public timestamp;
    bool public isProcessing = false;
    uint public randomNumber;
    bool public votingStarted = false;
    address public owner;
    address public packageAddress;
    address[] voters;
    address[] motioners;
    uint public motionClosesTimestamp;
    uint public motionDuration;
    mapping(address => MembershipManagement.Vote) votes;
    mapping(address => MembershipManagement.Motion) motions;
    MembershipManagement.ContractAddresses contractAddresses;
    event VotingStarted(uint indexed proposalId);
    event VotingCompleted(uint indexed proposalId);
    event StatusUpdated(uint indexed proposalId, MembershipManagement.ApprovalStatus newStatus);
    event VoteCasted(uint indexed proposalId, address member, bool vote);
    event Motioned(uint indexed proposalId, address member);
    error AuthorizationError();
    modifier isFromDAOorVoting() {
        if(msg.sender != contractAddresses.daoAddress && msg.sender != contractAddresses.votingAddress && msg.sender != contractAddresses.membershipManagerAddress && msg.sender != contractAddresses.membershipRemovalAddress && msg.sender != owner && msg.sender != packageAddress) revert AuthorizationError();
        _;
    }

    modifier isFromDAO() {
        if(msg.sender != contractAddresses.daoAddress && msg.sender != contractAddresses.votingAddress && msg.sender != contractAddresses.membershipManagerAddress && msg.sender != contractAddresses.membershipRemovalAddress && msg.sender != packageAddress)revert AuthorizationError();
        _;
    }

    modifier isFromVoting() {
        if(msg.sender != contractAddresses.votingAddress)revert AuthorizationError();
        _;
    }
    constructor(
        address _owner, 
        MembershipManagement.ContractAddresses memory _contractAddresses,
        uint _id, 
        MembershipManagement.ProposalTypes _proposalType, 
        uint _duration,
        uint _openDuration
    ) {
        owner = _owner;
        contractAddresses = _contractAddresses;
        id = _id;
        proposalType = _proposalType;
        duration = _duration;
        status = MembershipManagement.ApprovalStatus.Entered;
        timestamp = block.timestamp;
        motionDuration = _openDuration;
    }

    function getThreshold() public virtual view returns(uint16);
    /**
     * @dev Updates the status of the proposal.
     * @param _status The new status to be set for the proposal.
     */
    function updateStatus(MembershipManagement.ApprovalStatus _status) public isFromDAOorVoting() {
        status = _status;
        emit StatusUpdated(id, _status);
    }
    error AlreadyInPackage();
    function enlistPackage(address _packageAddress) public{
        if(packageAddress != address(0))
            revert AlreadyInPackage();
        packageAddress = _packageAddress;
        status = MembershipManagement.ApprovalStatus.Ready;
    }
    /**
     * @dev Sets a random number for the proposal, typically used in voting processes.
     * @param random The random number to be set.
     */
    function setRandomNumber(uint random) public isFromVoting() {
        randomNumber = random;
    }
    error InvalidStatus();
    /**
     * @dev Marks the proposal as processing or not.
     * @param processing The new state of processing to be set.
     */
    function setProcessing(bool processing) public isFromVoting() {
        isProcessing = processing;
    }

    /**
     * @dev Returns the list of votes cast for the proposal.
     * @return An array of Vote structs containing the details of each vote.
     */
    function getVotes() public view returns(MembershipManagement.Vote[] memory) {
        if(packageAddress != address(0))
        {
            ProposalPackage pp = ProposalPackage(packageAddress);
            return pp.getVotes();
        }
        MembershipManagement.Vote[] memory vs = new MembershipManagement.Vote[](voters.length);
        for (uint i = 0; i < voters.length; i++) {
            vs[i] = votes[voters[i]];
        }
        return vs;
    }
    function getMotions() public view returns(MembershipManagement.Motion[] memory){
        if(packageAddress != address(0)){
            ProposalPackage pp = ProposalPackage(packageAddress);
            return pp.getMotions();
        }
        MembershipManagement.Motion[] memory ms = new MembershipManagement.Motion[](motioners.length);
        for (uint i = 0; i < motioners.length; i++) {
            ms[i] = motions[motioners[i]];
        }
        return ms;
    }
    function getRawProposal() public view returns(MembershipManagement.ProposalResponse memory){
        return MembershipManagement.ProposalResponse(
            id,
            getVotes(),
            duration,
            status,
            isProcessing,
            votingStarted,
            owner,
            address(this),
            timestamp,
            motionClosesTimestamp,
            getMotions()
        );
    }
    error CannotMotion();
    function startMotioning() public isFromDAO(){
        if(status != MembershipManagement.ApprovalStatus.Entered)
            revert CannotMotion();
        motionClosesTimestamp = block.timestamp + motionDuration;
        status = MembershipManagement.ApprovalStatus.Motioning;
    }
    error MotioningClosed();
    function motion(address member) public isFromDAO(){
        if(packageAddress != address(0))
            revert CanOnlyVotePackage();
        if(motionClosesTimestamp < block.timestamp || status != MembershipManagement.ApprovalStatus.Motioning)
            revert MotioningClosed();
        if(motions[member].proposalId != id)
            motioners.push(member);
        motions[member] = MembershipManagement.Motion(member, block.timestamp, id);
        emit Motioned(id, member);
    }
    error VotingNotStarted();
    error VotingClosed();
    /**
     * @dev Casts a vote for the proposal.
     * @param voteCasted The vote cast by the member (true for approve, false for reject).
     * @param member The address of the member casting the vote.
     */
    function vote(bool voteCasted, address member) public isFromDAO() {
        if(packageAddress != address(0))
            revert CanOnlyVotePackage();
        if(!votingStarted)revert VotingNotStarted();
        if(block.timestamp > duration)revert VotingClosed();
        if (votes[member].proposalId != id) {
            voters.push(member);
        }
        votes[member] = MembershipManagement.Vote(member, voteCasted, block.timestamp, id);
        emit VoteCasted(id, member, voteCasted);
    }
    error OnlyOwner();
    error VotingAlreadytStarted();
    error CanOnlyVotePackage();
    /**
     * @dev Initiates the voting process for the proposal.
     * @param sender The address initiating the voting process.
     */
    function startVoting(address sender) public isFromDAO() {
        if(sender != owner)
            revert OnlyOwner();
        if(votingStarted)
            revert VotingAlreadytStarted();
        if(packageAddress != address(0))
            revert CanOnlyVotePackage();
        votingStarted = true;
        duration += block.timestamp;
        status = MembershipManagement.ApprovalStatus.Pending;
        emit VotingStarted(id);
    }
    error ClosedForDocumentAdd();
    function addDocument(address signer, string memory title, string memory url, bytes32 docHash, bytes memory signature) isFromDAOorVoting() public override{
        if(status != MembershipManagement.ApprovalStatus.Entered)
            revert ClosedForDocumentAdd();
        super.addDocument(signer, title, url, docHash, signature);
    }
    // Other functions such as addDocument() are unchanged
}

/**
 * @title MembershipProposal
 * @dev Contract for managing membership proposals within a DAO.
 *      Inherits from Proposal and adds specific functionality for membership management.
 */
contract MembershipProposal is Proposal {
    MembershipManagement.Nation nation;
    uint public groupId;

    /**
     * @dev Constructor for creating a new MembershipProposal.
     * @param _nation Details of the nation associated with the proposal.
     * @param _groupId Identifier of the group within the council.
     * @param _owner, _daoAddress, _votingAddress, _councilManager, _id, _proposalType, _duration Inherited from Proposal.
     */
    constructor(
        address _owner, 
        MembershipManagement.ContractAddresses memory _contractAddresses,
        uint _id,
        uint _duration, 
        MembershipManagement.Nation memory _nation, 
        uint _groupId,
        uint _openDuration
    ) 
        Proposal(_owner, _contractAddresses, _id, MembershipManagement.ProposalTypes.Membership, _duration, _openDuration)
    {
        nation = _nation;
        groupId = _groupId;
    }

    /**
     * @dev Retrieves the nation associated with the membership proposal.
     * @return The Nation struct representing the nation in the proposal.
     */
    function getNation() public view returns(MembershipManagement.Nation memory) {
        return nation;
    }

    /**
     * @dev Generates a response struct for the membership proposal.
     * @return A MembershipProposalResponse struct with proposal details.
     */
    function getMembershipResponse() public view returns(MembershipManagement.MembershipProposalResponse memory) {
        CouncilManager manager = CouncilManager(contractAddresses.councilManagementAddress);
        return MembershipManagement.MembershipProposalResponse(
            id, 
            nation.id, 
            nation, 
            manager.getCouncilRoleForGroup(groupId), 
            groupId, 
            getVotes(), 
            duration, 
            status, 
            isProcessing, 
            votingStarted, 
            owner, 
            address(this),
            packageAddress,
            timestamp,
            motionClosesTimestamp,
            getMotions()
        );
    }
    function getThreshold() public pure override returns(uint16){
        return 51;
    } 
    // Other functions and code specific to MembershipProposal are unchanged
}

contract MembershipRemovalProposal is Proposal{
    MembershipManagement.Nation nationToRemove;
     constructor(
        address _owner, 
        MembershipManagement.ContractAddresses memory _contractAddresses,
        uint _id,
        uint _duration, 
        MembershipManagement.Nation memory _nation,
        uint _openDuration
    ) 
        Proposal(_owner, _contractAddresses , _id, MembershipManagement.ProposalTypes.MembershipRemoval, _duration, _openDuration)
    {
        nationToRemove = _nation;
    }
    function getNation() public view returns(MembershipManagement.Nation memory) {
        return nationToRemove;
    }
    function getMembershipResponse() public view returns(MembershipManagement.MembershipRemovalResponse memory) {
        return MembershipManagement.MembershipRemovalResponse(
            id, 
            nationToRemove, 
            getVotes(), 
            duration, 
            status, 
            isProcessing, 
            votingStarted, 
            owner, 
            address(this),
            packageAddress,
            timestamp,
            motionClosesTimestamp,
            getMotions()
        );
    }
    function getThreshold() public pure override returns(uint16){
        return 51;
    } 
}
contract ChangeVotingParametersProposal is Proposal{
    MembershipManagement.ChangeVotingParametersRole[] parameters;
    constructor(
        address _owner, 
        MembershipManagement.ContractAddresses memory _contractAddresses,
        uint _id,
        uint _duration, 
        MembershipManagement.ChangeVotingParametersRole[] memory _parameters,
        uint _openDuration
    ) 
        Proposal(_owner, _contractAddresses , _id, MembershipManagement.ProposalTypes.UpdateVotingParameters, _duration, _openDuration)
    {
        uint i = 0;
        while(i < _parameters.length){
            parameters.push();
            parameters[i].council = _parameters[i].council;
            parameters[i].parameters.randomizeByGroup = _parameters[i].parameters.randomizeByGroup;
            parameters[i].parameters.randomizeByMember = _parameters[i].parameters.randomizeByMember;
            parameters[i].parameters.outputCountForGroup = _parameters[i].parameters.outputCountForGroup;
            parameters[i].parameters.outputCountForMember = _parameters[i].parameters.outputCountForMember;
            parameters[i].parameters.voteDenominator = _parameters[i].parameters.voteDenominator;
            parameters[i].parameters.voteNumerator = _parameters[i].parameters.voteNumerator;
            parameters[i].parameters.sumDenominator = _parameters[i].parameters.sumDenominator;
            parameters[i].parameters.sumNumerator = _parameters[i].parameters.sumNumerator;
            parameters[i].parameters.avgVotes = _parameters[i].parameters.avgVotes;
            i++;
        }
    }
    function getChangeResponse() public view returns(MembershipManagement.ChangeVotingParametersResponse memory) {
        return MembershipManagement.ChangeVotingParametersResponse(
            id, 
            parameters, 
            getVotes(), 
            duration, 
            status, 
            isProcessing, 
            votingStarted, 
            owner, 
            address(this),
            packageAddress,
            timestamp,
            motionClosesTimestamp,
            getMotions()
        );
    }
    function getThreshold() public pure override returns(uint16){
        return 67;
    } 
}
contract ProposalPackage is Proposal{
    mapping(uint => address) proposalAddresses;
    uint[] proposals;
    constructor(address _owner, 
        MembershipManagement.ContractAddresses memory _contractAddresses,
        uint _id,
        uint _duration,
        uint _openDuration)
        Proposal(_owner, _contractAddresses , _id, MembershipManagement.ProposalTypes.Package, _duration, _openDuration){

        }
    error ProposalIsClosed();
    function enlistProposal(address proposal) public isFromDAO(){
        if(status != MembershipManagement.ApprovalStatus.Entered)
            revert ProposalIsClosed();
        Proposal p = Proposal(proposal);
        uint propId = p.id();
        proposals.push(propId);
        proposalAddresses[propId] = proposal;
    }
    function getThreshold() public view override returns(uint16){
        uint16 threshold = 51;
        uint x = 0;
        while(x < proposals.length){
            Proposal p = Proposal(proposalAddresses[proposals[x]]);
            uint16 t = p.getThreshold();
            if(threshold < t)
                threshold = t;
            x++;
        }
        return threshold;
    }
    function getPackage() public view returns(MembershipManagement.ProposalPackageResponse memory){
        return MembershipManagement.ProposalPackageResponse(
            id,
            proposals,
            getVotes(),
            duration,
            status,
            isProcessing,
            votingStarted,
            owner,
            address(this),
            timestamp,
            motionClosesTimestamp,
            getMotions()
        );
    }  
}
contract ProposalStorageManager{
    address daoAddress;
    address membershipRemovalAddress;
    address membershipManagerAddress;
    address votingParametersManagerAddress;
    address packageManagerAddress;
    mapping(address => address) membershipProposals;
    mapping(address => address) membershipRemovalProposals;
    mapping(uint => address) public proposals;
    address[] membershipProposalAddresses;
    address[] membershipRemovalProposalAddresses;
    address[] changeParametersProposalAddresses;
    address[] packageProposalAddresses;
    uint public proposalCount = 0;
    bool public isInitalized = false;
    error NotInitalized();
    error AlreadyInitalized();
    function initalize(
        address _daoAddress, address _membershipRemovalAddress, 
        address _membershipManagerAddress, address _votingParametersManagerAddress, address _packageManagerAddress) external{
        if(isInitalized)
            revert AlreadyInitalized();
        daoAddress = _daoAddress;
        membershipRemovalAddress = _membershipRemovalAddress;
        membershipManagerAddress = _membershipManagerAddress;
        votingParametersManagerAddress = _votingParametersManagerAddress;
        packageManagerAddress = _packageManagerAddress;
        isInitalized = true;
    }
    modifier isFromDAO() {
        if(!isInitalized) revert NotInitalized();
        if(daoAddress != msg.sender && membershipRemovalAddress != msg.sender 
            && membershipManagerAddress != msg.sender 
            && votingParametersManagerAddress != msg.sender &&
            packageManagerAddress != msg.sender) revert Utils.AuthorizationError();
        _;
    }
    function getNextProposalId() public isFromDAO() returns(uint){
        return ++proposalCount;
    }
    function getMembershipProposal(address key) public view returns(address){
        return membershipProposals[key];
    }
    function setMembershipProposal(address key, address value) public isFromDAO(){
        membershipProposals[key] = value;
    }
    function getProposal(uint key) public view returns(address){
        return proposals[key];
    }
    function setProposal(uint key, address value) public isFromDAO(){
        proposals[key] = value;
    }
    function getMembershipRemovalProposal(address key) public view returns(address){
        return membershipRemovalProposals[key];
    }
    function setMembershipRemovalProposal(address key, address value) isFromDAO() public{
        membershipRemovalProposals[key] = value;
    }
    function addMembershipProposal(address key) isFromDAO() public{
        membershipProposalAddresses.push(key);
    }
    function addMembershipRemovalProposal(address key) isFromDAO() public{
        membershipRemovalProposalAddresses.push(key);
    }
    function addChangeParametersProposal(address key) isFromDAO() public{
        changeParametersProposalAddresses.push(key);
    }
    function getChangeParametersProposalAddresses() public view returns(address[] memory){
        return changeParametersProposalAddresses;
    }
    function addPackageProposal(address key) isFromDAO() public{
        packageProposalAddresses.push(key);
    }
    function getPackageProposalAddresses() public view returns(address[] memory){
        return packageProposalAddresses;
    }
    function getMembershipProposalAddresses() public view returns(address[] memory){
        return membershipProposalAddresses;
    }
    function getMembershipRemovalProposalAddresses() public view returns(address[] memory){
        return membershipRemovalProposalAddresses;
    }
}