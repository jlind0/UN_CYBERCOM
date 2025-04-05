// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/Math.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "./Utils.sol";
import "./MembershipManagement.sol";
import "./Proposal.sol";
import "./CybercomDAO.sol";
contract Voting is VRFConsumerBaseV2Plus {
    uint256 s_subscriptionId;
    address constant vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
    bytes32 constant s_keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint32 constant callbackGasLimit = 300000;
    uint16 constant requestConfirmations = 3;
    uint[] proposalIds;
    mapping(uint => address) proposals;
    mapping(uint => uint) requestIdToProposal;
    address  daoAddress;
    address  councilManagerAddress;
    mapping(uint => MembershipManagement.TallyResult) proposalTallyResults;
    constructor(uint256 subscriptionId, address _daoAddress, address _councilManagerAddress) VRFConsumerBaseV2Plus (vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        daoAddress = _daoAddress;
        councilManagerAddress = _councilManagerAddress;
    }
    error Unauthorized();
     modifier isFromDAO() {
        CybercomDAO dao = CybercomDAO(daoAddress);
        MembershipManagement.ContractAddresses memory addresses = dao.getContractAddresses();

        if(msg.sender != daoAddress && 
            msg.sender != addresses.membershipManagerAddress && 
            msg.sender != addresses.membershipRemovalAddress && msg.sender != addresses.votingParametersManagerAddress ) revert Unauthorized();
        _;
    }
    error VotingNotClosed();
    function prepareTally(uint proposalId)
        isFromDAO() 
        public returns (uint256 requestId) 
    {
        Proposal p = Proposal(proposals[proposalId]);
        if(!p.isProcessing() && 
            p.status() == MembershipManagement.ApprovalStatus.Pending && 
            p.duration() < block.timestamp)
        {
            // Will revert if subscription is not set and funded.
            requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: true})
                    )
                })
            );
            p.setProcessing(true);
            requestIdToProposal[requestId] = proposalId;
        }
        else
            revert VotingNotClosed();
    }
    error InvalidProposal();
    error InvalidContractState();
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) 
    internal override {
        if(requestIdToProposal[requestId] == 0)
            revert InvalidProposal();
        Proposal prop = Proposal(proposals[requestIdToProposal[requestId]]);
        MembershipManagement.ApprovalStatus status = prop.status();
        if(status != MembershipManagement.ApprovalStatus.Pending)
            revert InvalidContractState();
        prop.setRandomNumber(randomWords[0]);
        prop.setProcessing(false);
        prop.updateStatus(MembershipManagement.ApprovalStatus.Ready);
    }
    error DuplicateContract();
    function addProposal(address proposalAddress) 
        isFromDAO() public{
        Proposal proposal = Proposal(proposalAddress);
        uint proposalId = proposal.id();
        if(proposals[proposalId] != address(0))
            revert DuplicateContract();
        proposalIds.push(proposalId);
        proposals[proposalId] = proposalAddress;
    }
    
    function getVoteTally(uint proposalId) public view returns(MembershipManagement.TallyResult memory){
        if(proposalTallyResults[proposalId].proposalId == proposalId)
            return proposalTallyResults[proposalId];
        revert();
    }
    
    function tallyVotes(uint proposalId) isFromDAO()
        public returns (MembershipManagement.ApprovalStatus)
    {
        CouncilManager manager = CouncilManager(councilManagerAddress);
        if(proposalTallyResults[proposalId].proposalId == proposalId)
            return proposalTallyResults[proposalId].status;
        Proposal prop = Proposal(proposals[proposalId]);
        uint16 threshold = prop.getThreshold();
        MembershipManagement.TallyResult storage tr = proposalTallyResults[proposalId];
        tr.proposalId = proposalId;
        MembershipManagement.Vote[] memory vs = prop.getVotes();
        if(vs.length == 0)
        {
            tr.status = MembershipManagement.ApprovalStatus.Rejected;
            return MembershipManagement.ApprovalStatus.Rejected;
        }
        MembershipManagement.CouncilVotes[] memory cvs = manager.getCouncilVotes(vs);
        uint i = 0;
        uint k = 0;
        while(i < cvs.length){
            MembershipManagement.CouncilVotes memory cv = cvs[i];
            uint j = 0;
            uint m = 0;
            while(j < cv.votes.length){
                if(cv.votes[j].votes.length > 0)
                    m++;
                j++;
            }
            MembershipManagement.CouncilGroupVotes[] memory cgv = new MembershipManagement.CouncilGroupVotes[](m);
            j = 0;
            m = 0;
            while(j < cv.votes.length){
                if(cv.votes[j].votes.length > 0)
                {
                    cgv[m] = cv.votes[j];
                    m++;
                }
                j++;
            }
            if(m > 0)
                k++;
            cv.votes = cgv;
            i++;
        }
        MembershipManagement.CouncilVotes[] memory cvs2 = new MembershipManagement.CouncilVotes[](k);
        i = 0;
        k = 0;
        while(i < cvs.length){
            if(cvs[i].votes.length > 0){
                cvs2[k] = cvs[i];
                k++;
            }
            i++;
        }
        cvs = cvs2;
        cvs = selectVotes(cvs, prop);
        (MembershipManagement.CouncilVotes[] memory cvs3, uint maxScore) = populateGroupScore(cvs);
        cvs = cvs3;
        int finalScore = tallyScore(cvs);
        MembershipManagement.ApprovalStatus status = MembershipManagement.ApprovalStatus.Pending;
        if(finalScore > 0 && uint(finalScore)*100 >= maxScore*threshold)
            status = MembershipManagement.ApprovalStatus.Approved;
        else
            status = MembershipManagement.ApprovalStatus.Rejected;
        uint q = 0;

        while(q < cvs.length)
        {
            tr.acceptedVotes.push();
            tr.acceptedVotes[q].councilId = cvs[q].councilId;
            tr.acceptedVotes[q].votingParameters = cvs[q].votingParameters;
            tr.acceptedVotes[q].score = cvs[q].score;
            uint z = 0;
            while(z < cvs[q].votes.length){
                tr.acceptedVotes[q].votes.push();
                tr.acceptedVotes[q].votes[z].groupId = cvs[q].votes[z].groupId;
                tr.acceptedVotes[q].votes[z].score = cvs[q].votes[z].score;
                uint u = 0;
                while(u < cvs[q].votes[z].votes.length){
                    tr.acceptedVotes[q].votes[z].votes.push();
                    tr.acceptedVotes[q].votes[z].votes[u].member = cvs[q].votes[z].votes[u].member;
                    tr.acceptedVotes[q].votes[z].votes[u].voteCasted = cvs[q].votes[z].votes[u].voteCasted;
                    tr.acceptedVotes[q].votes[z].votes[u].timestamp = cvs[q].votes[z].votes[u].timestamp;
                    tr.acceptedVotes[q].votes[z].votes[u].proposalId = cvs[q].votes[z].votes[u].proposalId;
                    u++;
                }
                z++;
            }
            q++;
        }
        tr.score = finalScore;
        tr.status = status;
        return status;
    }
    function selectVotes(MembershipManagement.CouncilVotes[] memory cvs, Proposal prop) private view returns(MembershipManagement.CouncilVotes[] memory){
        uint i = 0;
        uint randIdx = 0;
        while(i < cvs.length){
            MembershipManagement.CouncilVotes memory cv = cvs[i];
            if(cv.votingParameters.randomizeByGroup){
                if(cv.votes.length > cv.votingParameters.outputCountForGroup){
                    MembershipManagement.CouncilGroupVotes[] memory cgv = new MembershipManagement.CouncilGroupVotes[](cv.votingParameters.outputCountForGroup);
                    (uint[] memory randoms, uint idxStart) = Utils.getRandomIndices(prop.randomNumber(), cv.votingParameters.outputCountForGroup, cv.votes.length, randIdx);
                    randIdx = idxStart;
                    uint x = 0;
                    while(x < randoms.length){
                        cgv[x] = cv.votes[randoms[x]];
                        x++;
                    }
                    cv.votes = cgv; 
                }
            }
            uint d = 0;
            while(d < cv.votes.length){
                MembershipManagement.CouncilGroupVotes memory cgv = cv.votes[d];
                if(cv.votingParameters.randomizeByMember){
                    if(cgv.votes.length > cv.votingParameters.outputCountForMember){
                        MembershipManagement.Vote[] memory vts = new MembershipManagement.Vote[](cv.votingParameters.outputCountForMember);
                        (uint[] memory randoms, uint idxStart) = Utils.getRandomIndices(prop.randomNumber(), cv.votingParameters.outputCountForMember, cgv.votes.length, randIdx);
                        randIdx = idxStart;
                        uint x = 0;
                        while(x < randoms.length){
                            vts[x] = cgv.votes[randoms[x]];
                            x++;
                        }
                        cgv.votes = vts;
                    } 
                }
                cv.votes[d] = cgv;
                d++;
            }
            cvs[i] = cv;
            i++;
        }
        return cvs;
    }
    function tallyScore(MembershipManagement.CouncilVotes[] memory tally) 
        private pure returns(int)
    {
        int score = 0;
        uint i = 0;
        while(i < tally.length){
            MembershipManagement.CouncilVotes memory cv = tally[i];
            score += cv.score;
            i++;
        }
        return score;
    }
    function populateGroupScore(MembershipManagement.CouncilVotes[] memory cvs)
        private pure returns(MembershipManagement.CouncilVotes[] memory rtn, uint maxScore)
    {
        uint y = 0;
        while(y < cvs.length){
            uint g = 0;
            MembershipManagement.CouncilVotes memory cv = cvs[y];
            int result = 0;
            uint maxResult = 0;
            int[] memory results = new int[](cv.votes.length);
            uint[] memory maxScores = new uint[](cv.votes.length);
            while(g < cv.votes.length){
                MembershipManagement.CouncilGroupVotes memory cgv = cv.votes[g];
                uint b = 0;
                int rrs = 0;
                uint mrrs =0;
                int[] memory rds = new int[](cgv.votes.length);
                uint[] memory maxRds = new uint[](cgv.votes.length);
                while(b < cgv.votes.length){
                    MembershipManagement.Vote memory vv = cgv.votes[b];
                    int vvn = 0;
                    if(vv.voteCasted)
                        vvn = 1;
                    else
                        vvn = -1;
                    int rs = Utils.multiply(Math.mulDiv(100000, cv.votingParameters.voteNumerator, cv.votingParameters.voteDenominator), vvn);
                    rds[b] = rs;
                    rrs += rs;
                    maxRds[b] = uint(rrs >= 0 ? rrs : -rrs);
                    mrrs += maxRds[b];
                    b++;
                }
                uint iMaxScore;
                if(cv.votingParameters.avgVotes)
                {
                    cgv.score += Utils.calculateAverage(rds);
                    iMaxScore += maxRds[0];
                }
                else
                {
                    cgv.score += rrs;
                    iMaxScore = mrrs;
                }
                
                int v = cgv.score;
                int rr = Utils.multiply(Math.mulDiv(100000, cv.votingParameters.sumNumerator, cv.votingParameters.sumDenominator), v);
                int mrr = Utils.multiply(Math.mulDiv(100000, cv.votingParameters.sumNumerator, cv.votingParameters.sumDenominator), int(iMaxScore));
                maxResult += uint(mrr);
                maxScores[g] = uint(mrr);
                results[g] = rr;
                result += rr;
                cv.votes[g] = cgv;
                g++;
            }
            if(cv.votingParameters.avgVotes)
            {
                cv.score += Utils.calculateAverage(results);
                maxScore += maxScores[0];
            }
            else
            {
                cv.score += result;
                maxScore += maxResult;
            }
            cvs[y] = cv;
            y++;
        }
        rtn = cvs;
    }
}