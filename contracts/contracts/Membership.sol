// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Utils.sol";
import "./MembershipManagement.sol";
import "./Proposal.sol";
import "./Voting.sol";
import "./CouncilManager.sol";
import "./CybercomDAO.sol";
contract VotingParametersManager{
    address votingAddress;
    address councilManagementAddress;
    address proposalStorageAddress;
    address daoAddress;
    modifier isFromDAO(){
        if(msg.sender != votingAddress && msg.sender != councilManagementAddress && msg.sender != daoAddress)
            revert Utils.AuthorizationError();
        _;
    }
    constructor(address _votingAddress, address _councilManagementAddress, address _proposalStorageAddress, address _daoAddress){
        votingAddress = _votingAddress;
        councilManagementAddress = _councilManagementAddress;
        proposalStorageAddress = _proposalStorageAddress;
        daoAddress = _daoAddress;
    }
     function getRequests(MembershipManagement.ApprovalStatus status) 
        external view returns(MembershipManagement.ChangeVotingParametersResponse[] memory)
    {
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        address[] memory propAddresses = memberManager.getChangeParametersProposalAddresses();
        ChangeVotingParametersProposal[] memory props = new ChangeVotingParametersProposal[](propAddresses.length);
            uint i = 0;
            uint j = 0;
            while(i < propAddresses.length){
                ChangeVotingParametersProposal mp = ChangeVotingParametersProposal(propAddresses[i]);
                if(mp.status() == status)
                {
                    props[j] = mp;
                    j++;
                }
                i++;
            }
            MembershipManagement.ChangeVotingParametersResponse[] memory rtn = new MembershipManagement.ChangeVotingParametersResponse[](j);
            i = 0;
            while(i < j){
                rtn[i] = getResponse(props[i]);
                i++;
            }
            return rtn;
    }
    function getResponse(ChangeVotingParametersProposal prop)
        private view returns(MembershipManagement.ChangeVotingParametersResponse memory)
    {
        return prop.getChangeResponse();
    }
    function submitProposal(MembershipManagement.ChangeVotingParametersRequest memory request) public isFromDAO() returns(address){
        return constructChangeParameterProposal(request);
    }
    error CouncilDoesNotExist();
    function constructChangeParameterProposal(MembershipManagement.ChangeVotingParametersRequest memory request)
        private returns(address)
    {
        CouncilManager manager = CouncilManager(councilManagementAddress);
        uint i = 0;
        while(i < request.parameters.length){
            if(!manager.doesCouncilExist(request.parameters[i].council))
                revert CouncilDoesNotExist();
            i++;
        }
        
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        CybercomDAO dao = CybercomDAO(daoAddress);
        ChangeVotingParametersProposal prop = new ChangeVotingParametersProposal(request.owner,
           dao.getContractAddresses(), 
            memberManager.getNextProposalId(),
            request.duration,
            request.parameters,
            request.maxOpenDuration
        );
        Voting v = Voting(votingAddress);
        address propAddress = address(prop);
        v.addProposal(propAddress);
        
        memberManager.setProposal(prop.id(), propAddress);
        memberManager.addChangeParametersProposal(propAddress);
        emit Utils.ProposalCreated(prop.id(), propAddress);
        return propAddress;
    }
         
}
contract PackageProposalManager{
    address votingAddress;
    address proposalStorageAddress;
    address daoAddress;
     modifier isFromDAO(){
        if(msg.sender != votingAddress && msg.sender != daoAddress)
            revert Utils.AuthorizationError();
        _;
    }
    constructor(address _votingAddress, address _proposalStorageAddress, address _daoAddress){
        votingAddress = _votingAddress;
        proposalStorageAddress = _proposalStorageAddress;
        daoAddress = _daoAddress;
    }
    function getRequests(MembershipManagement.ApprovalStatus status) 
        external view returns(MembershipManagement.ProposalPackageResponse[] memory)
    {
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        address[] memory propAddresses = memberManager.getPackageProposalAddresses();
        ProposalPackage[] memory props = new ProposalPackage[](propAddresses.length);
            uint i = 0;
            uint j = 0;
            while(i < propAddresses.length){
                ProposalPackage mp = ProposalPackage(propAddresses[i]);
                if(mp.status() == status)
                {
                    props[j] = mp;
                    j++;
                }
                i++;
            }
            MembershipManagement.ProposalPackageResponse[] memory rtn = new MembershipManagement.ProposalPackageResponse[](j);
            i = 0;
            while(i < j){
                rtn[i] = getResponse(props[i]);
                i++;
            }
            return rtn;
    }
    function getResponse(ProposalPackage prop)
        private view returns(MembershipManagement.ProposalPackageResponse memory)
    {
        return prop.getPackage();
    }
    function submitProposal(MembershipManagement.ProposalPackageRequest memory request) public isFromDAO() returns(address){
        return constructPackageProposal(request);
    }
    function constructPackageProposal(MembershipManagement.ProposalPackageRequest memory request) private returns(address){
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        CybercomDAO dao = CybercomDAO(daoAddress);
        ProposalPackage prop = new ProposalPackage(
            request.owner, 
            dao.getContractAddresses(), 
            memberManager.getNextProposalId(), request.duration, request.maxOpenDuration);
        Voting v = Voting(votingAddress);
        address propAddress = address(prop);
        v.addProposal(propAddress);
        
        memberManager.setProposal(prop.id(), propAddress);
        memberManager.addPackageProposal(propAddress);
        emit Utils.ProposalCreated(prop.id(), propAddress);
        return propAddress;
    }    
}
contract MembershipRemovalManager{
    address votingAddress;
    address councilManagementAddress;
    address proposalStorageAddress;
    address daoAddress;
    modifier isFromDAO(){
        if(msg.sender != votingAddress && msg.sender != councilManagementAddress && msg.sender != daoAddress)
            revert Utils.AuthorizationError();
        _;
    }
    constructor(address _votingAddress, address _councilManagementAddress, address _proposalStorageAddress, address _daoAddress){
        votingAddress = _votingAddress;
        councilManagementAddress = _councilManagementAddress;
        proposalStorageAddress = _proposalStorageAddress;
        daoAddress = _daoAddress;
    }
     function getMembershipRemovalRequests(MembershipManagement.ApprovalStatus status) 
        external view returns(MembershipManagement.MembershipRemovalResponse[] memory)
    {
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        address[] memory propAddresses = memberManager.getMembershipRemovalProposalAddresses();
        MembershipRemovalProposal[] memory props = new MembershipRemovalProposal[](propAddresses.length);
            uint i = 0;
            uint j = 0;
            while(i < propAddresses.length){
                MembershipRemovalProposal mp = MembershipRemovalProposal(propAddresses[i]);
                if(mp.status() == status)
                {
                    props[j] = mp;
                    j++;
                }
                i++;
            }
            MembershipManagement.MembershipRemovalResponse[] memory rtn = new MembershipManagement.MembershipRemovalResponse[](j);
            i = 0;
            while(i < j){
                rtn[i] = getMembershipRemovalResponse(props[i]);
                i++;
            }
            return rtn;
    }
    function getMembershipRemovalResponse(MembershipRemovalProposal prop)
        private view returns(MembershipManagement.MembershipRemovalResponse memory)
    {
        return prop.getMembershipResponse();
    }
    function submitProposal(MembershipManagement.MembershipRemovalRequest memory request) public isFromDAO() returns(address){
        CouncilManager manager = CouncilManager(councilManagementAddress);
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        if(!manager.doesNationExist(request.nationToRemove))
            revert Utils.NationDoesNotExist();
        else if(memberManager.getMembershipRemovalProposal(request.nationToRemove) != address(0)){
            MembershipRemovalProposal prop = MembershipRemovalProposal(memberManager.getMembershipRemovalProposal(request.nationToRemove));
            MembershipManagement.ApprovalStatus aprStatus = prop.status();
            if(aprStatus == MembershipManagement.ApprovalStatus.Entered || aprStatus == MembershipManagement.ApprovalStatus.Pending || aprStatus == MembershipManagement.ApprovalStatus.Ready)
                revert Utils.OutstandingProposal();
            else if(aprStatus == MembershipManagement.ApprovalStatus.Approved)
                return address(prop);
            else if(aprStatus == MembershipManagement.ApprovalStatus.Rejected)
                return constructMembershipRemovalProposal(request);
        }
        else
            return constructMembershipRemovalProposal(request);
        revert Utils.LogicError();
    }
    function constructMembershipRemovalProposal(MembershipManagement.MembershipRemovalRequest memory request)
        private returns(address)
    {
        CouncilManager manager = CouncilManager(councilManagementAddress);
        if(!manager.doesNationExist(request.nationToRemove))
            revert Utils.NationDoesNotExist();
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        CybercomDAO dao = CybercomDAO(daoAddress);
        MembershipRemovalProposal prop = new MembershipRemovalProposal(request.owner,
           dao.getContractAddresses(), 
            memberManager.getNextProposalId(),
            request.duration,
            manager.getNation(request.nationToRemove), request.maxOpenDuration
        );
        Voting v = Voting(votingAddress);
        address propAddress = address(prop);
        v.addProposal(propAddress);
        
        memberManager.setMembershipRemovalProposal(request.nationToRemove, propAddress);
        memberManager.setProposal(prop.id(), propAddress);
        memberManager.addMembershipRemovalProposal(propAddress);
        emit Utils.ProposalCreated(prop.id(), propAddress);
        return propAddress;
    }          
}
contract MembershipManager{
    address votingAddress;
    address councilManagementAddress;
    address proposalStorageAddress;
    address daoAddress;
    modifier isFromDAO(){
        if(msg.sender != votingAddress && msg.sender != councilManagementAddress && msg.sender != daoAddress)
            revert Utils.AuthorizationError();
        _;
    }
    constructor(address _votingAddress, address _councilManagementAddress, address _proposalStorageAddress, address _daoAddress){
        votingAddress = _votingAddress;
        councilManagementAddress = _councilManagementAddress;
        proposalStorageAddress = _proposalStorageAddress;
        daoAddress = _daoAddress;
    }
    function submitMembershipProposal(MembershipManagement.MembershipProposalRequest memory request) isFromDAO()
        external returns(address)
    {
        CouncilManager manager = CouncilManager(councilManagementAddress);
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        if(!manager.doesCouncilGroupExist(request.groupId))
            revert Utils.GroupNotFound();
        if(manager.getNationCount() == 0){
            address proposalAddress = constructMembershipProposal(request);
            MembershipProposal prop = MembershipProposal(proposalAddress);
            prop.updateStatus(MembershipManagement.ApprovalStatus.Approved);
            CybercomDAO dao = CybercomDAO(daoAddress);
            dao.acceptMemberExt(proposalAddress);
            return proposalAddress;
        }
        else if(manager.doesNationExist(request.member))
            revert Utils.NationAlreadyMember();
        else if(memberManager.getMembershipProposal(request.member) != address(0)){
            MembershipProposal prop = MembershipProposal(memberManager.getMembershipProposal(request.member) );
            MembershipManagement.ApprovalStatus aprStatus = prop.status();
            if(aprStatus == MembershipManagement.ApprovalStatus.Entered || aprStatus == MembershipManagement.ApprovalStatus.Pending || aprStatus == MembershipManagement.ApprovalStatus.Ready)
                revert Utils.OutstandingProposal();
            else if(aprStatus == MembershipManagement.ApprovalStatus.Approved)
                return address(prop);
            else if(aprStatus == MembershipManagement.ApprovalStatus.Rejected)
                return constructMembershipProposal(request);
        }
        else
            return constructMembershipProposal(request);
        revert Utils.LogicError();
    }
    function constructMembershipProposal(MembershipManagement.MembershipProposalRequest memory request)
        private returns(address)
    {
       
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        CybercomDAO dao = CybercomDAO(daoAddress);
        MembershipProposal prop = new MembershipProposal(request.owner,
            dao.getContractAddresses(),
            memberManager.getNextProposalId(),
            request.duration,
            request.newNation,
            request.groupId,
            request.maxOpenDuration
        );
        Voting v = Voting(votingAddress);
        address propAddress = address(prop);
        v.addProposal(propAddress);
        
        memberManager.setMembershipProposal(request.newNation.id,propAddress);
        memberManager.setProposal(prop.id(), propAddress);
        memberManager.addMembershipProposal(propAddress);
        emit Utils.ProposalCreated(prop.id(), propAddress);
        return propAddress;
    }
     function getMembershipResponse(MembershipProposal prop)
        private view returns(MembershipManagement.MembershipProposalResponse memory)
    {
        return prop.getMembershipResponse();
    }
    
     function getMembershipRequests(MembershipManagement.ApprovalStatus status) 
        external view returns(MembershipManagement.MembershipProposalResponse[] memory)
    {
        ProposalStorageManager memberManager = ProposalStorageManager(proposalStorageAddress);
        address[] memory propAddresses = memberManager.getMembershipProposalAddresses();
        MembershipProposal[] memory props = new MembershipProposal[](propAddresses.length);
            uint i = 0;
            uint j = 0;
            while(i < propAddresses.length){
                MembershipProposal mp = MembershipProposal(propAddresses[i]);
                if(mp.status() == status)
                {
                    props[j] = mp;
                    j++;
                }
                i++;
            }
            MembershipManagement.MembershipProposalResponse[] memory rtn = new MembershipManagement.MembershipProposalResponse[](j);
            i = 0;
            while(i < j){
                rtn[i] = getMembershipResponse(props[i]);
                i++;
            }
            return rtn;
    }     
}