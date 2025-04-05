/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  CybercomDAO,
  CybercomDAOInterface,
} from "../../contracts/CybercomDAO";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_subscriptionId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "AuthorizationError",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposalNotReadyForTally",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "memberId",
        type: "address",
      },
    ],
    name: "MemberAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "memberId",
        type: "address",
      },
    ],
    name: "MemberKept",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "memberId",
        type: "address",
      },
    ],
    name: "MemberRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "memberId",
        type: "address",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "TallyPrepared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "vote",
        type: "bool",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "startedBy",
        type: "address",
      },
    ],
    name: "VoteStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum MembershipManagement.ApprovalStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "VotingCompleted",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "acceptMemberExt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "closeInitialization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "completeVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contracts",
    outputs: [
      {
        internalType: "address",
        name: "daoAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "votingAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "councilManagementAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "proposalStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "membershipRemovalAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "membershipManagerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "votingParametersManagerAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractAddresses",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "daoAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "votingAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "councilManagementAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "proposalStorageAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "membershipRemovalAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "membershipManagerAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "votingParametersManagerAddress",
            type: "address",
          },
        ],
        internalType: "struct MembershipManagement.ContractAddresses",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "daoAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "votingAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "councilManagementAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "proposalStorageAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "membershipRemovalAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "membershipManagerAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "votingParametersManagerAddress",
            type: "address",
          },
        ],
        internalType: "struct MembershipManagement.ContractAddresses",
        name: "_contracts",
        type: "tuple",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voteCast",
        type: "bool",
      },
    ],
    name: "performVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "prepareTally",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "startVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes32",
                name: "council",
                type: "bytes32",
              },
              {
                components: [
                  {
                    internalType: "bool",
                    name: "randomizeByGroup",
                    type: "bool",
                  },
                  {
                    internalType: "bool",
                    name: "randomizeByMember",
                    type: "bool",
                  },
                  {
                    internalType: "uint32",
                    name: "outputCountForGroup",
                    type: "uint32",
                  },
                  {
                    internalType: "uint32",
                    name: "outputCountForMember",
                    type: "uint32",
                  },
                  {
                    internalType: "uint256",
                    name: "voteDenominator",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "voteNumerator",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "sumDenominator",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "sumNumerator",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "avgVotes",
                    type: "bool",
                  },
                ],
                internalType: "struct MembershipManagement.VotingParameters",
                name: "parameters",
                type: "tuple",
              },
            ],
            internalType:
              "struct MembershipManagement.ChangeVotingParametersRole[]",
            name: "parameters",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType:
          "struct MembershipManagement.ChangeVotingParametersRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "submitChangeVotingParameters",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "member",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
            ],
            internalType: "struct MembershipManagement.Nation",
            name: "newNation",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "groupId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct MembershipManagement.MembershipProposalRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "submitMembershipProposal",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nationToRemove",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct MembershipManagement.MembershipRemovalRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "submitMembershipRemovalProposal",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608034606157601f611f0d38819003918201601f19168301916001600160401b038311848410176065578084926020946040528339810103126061575160015f55603c60025560ff19600b5416600b55600a55604051611e93908161007a8239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f905f3560e01c90816301ffc9a71461193057508063248a9ca3146118fd5780632dba4e0f146111825780632f2ff15d1461114357806336568abe146110fe5780633d2f5bda14610f6057806360fc5a9a14610f3f57806367d5f33714610de557806369b8c62814610cb05780636c0f79b614610c4457806379ad2c3414610af457806391d1485414610aaa578063953874d2146109bd57806396969679146107a2578063a217fddf14610786578063b31f111c146105a0578063cdcb86861461017f578063d547741f146101375763e93b1111146100ef575f80fd5b3461013457602036600319011261013457610108611999565b6008546001600160a01b031633036101265761012390611c55565b80f35b621607ef60ea1b8252600482fd5b80fd5b50346101345760403660031901126101345761017b600435610157611983565b90610176610171825f526001602052600160405f20015490565b611d13565b611dd9565b5080f35b5034610134576020366003190112610134576004356001600160401b03811161059c576060600319823603011261059c57604051916101bd83611a08565b81600401356001600160401b03811161059c578201923660238501121561059c576004840135936101ed85611a87565b906101fb6040519283611a3e565b858252602060046101408285019802830101019036821161059857602401955b8187106104a7575050600493945081526102426044602083019560248101358752016119c5565b90604081019182528260018060a01b03600554166040519586809263f2bcac3d60e01b82525afa93841561049c578394610478575b50829383945b815181101561046e576102b9336102948385611b28565b515f52600160205260405f209060018060a01b03165f5260205260ff60405f20541690565b6102cb576102c690611b50565b61027d565b50509091925060015b15610460578351600254809110610458575b50909233845260018060a01b0360095416836040519586936330e4801960e21b85526020600486015260848501955195606060248701528651809152602060a48701970190845b8181106103c45750509051604486015250516001600160a01b03166064840152602093839003918391905af19081156103b857809161037b575b6040516001600160a01b0383168152602090f35b90506020823d6020116103b0575b8161039660209383611a3e565b8101031261013457506103aa602091611b72565b5f610367565b3d9150610389565b604051903d90823e3d90fd5b92945092949681965061014060209161010083600195518051845201518051151585840152848101511515604084015263ffffffff604082015116606084015263ffffffff6060820151166080840152608081015160a084015260a081015160c084015260c081015160e084015260e08101518284015201511515610120820152019601910190889596949288949261032d565b84525f6102e6565b621607ef60ea1b8352600483fd5b50509091926102d4565b6104959194503d8085833e61048d8183611a3e565b810190611aaf565b925f610277565b6040513d85823e3d90fd5b863603610140811261059457610120604051916104c383611a23565b89358352601f1901126105945760405161012081018181106001600160401b0382111761058057916101409391602093604052610501848c01611a7a565b815261050f60408c01611a7a565b8482015261051f60608c01611a9e565b604082015261053060808c01611a9e565b606082015260a08b0135608082015260c08b013560a082015260e08b013560c08201526101008b013560e082015261056b6101208c01611a7a565b6101008201528382015281520196019561021b565b634e487b7160e01b88526041600452602488fd5b8580fd5b8480fd5b5080fd5b5034610134576040366003190112610134576004356024358015158091036106fa5760055460405163f2bcac3d60e01b815292908490849060049082906001600160a01b03165afa92831561075657849361076a575b508392835b815181101561076157610612336102948385611b28565b6106245761061f90611b50565b6105fb565b505090915060015b15610460576006546040516318feeb1560e31b81526004810183905290602090829060249082906001600160a01b03165afa908115610756578491610718575b506001600160a01b03168015610709578084913b1561059c57818091604460405180948193630633dfc760e41b83528960048401523360248401525af180156106fe576106e5575b50506040519182527fe71fcdac32df1877c1700e7bda2a03157e20993363a28fc35ac495cefc76e4d460203393a380f35b816106ef91611a3e565b6106fa57825f6106b4565b8280fd5b6040513d84823e3d90fd5b631dc0650160e31b8452600484fd5b90506020813d60201161074e575b8161073360209383611a3e565b8101031261074a5761074490611b72565b5f61066c565b8380fd5b3d9150610726565b6040513d86823e3d90fd5b5050909161062c565b61077f9193503d8086833e61048d8183611a3e565b915f6105f6565b5034610134578060031936011261013457602090604051908152f35b503461013457602036600319011261013457600435906001600160401b0382116101345760a06003198336030112610134576040519160a083018381106001600160401b038211176109a9576040526107fd816004016119c5565b835260248101356001600160401b0381116106fa578101604060031982360301126106fa576040519061082f82611a23565b61083b600482016119c5565b82526024810135906001600160401b0382116105985790600491010136601f8201121561074a57803561086d81611a5f565b9161087b6040519384611a3e565b818352366020838301011161059457918560208381979594828098960183860137830101528382015282860190815284610124604088019760448501358952856064860135956108d460846060850192898452016119c5565b50608083019060018060a01b0360085416973383526002548091106109a1575b506040519b8c998a988996639696967960e01b885282600489015260018060a01b0390511660248801525160a0604488015260018060a01b0381511660c48801520151604060e4870152805194859182610104890152018787015e8484018601879052516064850152516084840152516001600160a01b031660a4830152601f01601f191681010301925af19081156103b857809161037b576040516001600160a01b0383168152602090f35b81525f6108f4565b634e487b7160e01b83526041600452602483fd5b503461013457806003193601126101345760c06040516109dc816119d9565b8281528260208201528260408201528260608201528260808201528260a0820152015260e0604051610a0d816119d9565b6003546001600160a01b0390811680835260045482166020808501918252600554841660408087019182526006548616606080890191825260075488166080808b019182526008548a1660a08c81019182526009548c1660c09d8e0190815287519b8c5299518c16988b019890985295518a1694890194909452915188169087015251861690850152518416908301525190911691810191909152f35b5034610134576040366003190112610134576040610ac6611983565b9160043581526001602052209060018060a01b03165f52602052602060ff60405f2054166040519015158152f35b503461013457606036600319011261013457600460405191610b1583611a08565b610b1d611999565b8352602083016024358152610b306119af565b93604081019485528260018060a01b03600554166040519586809263f2bcac3d60e01b82525afa93841561049c578394610c28575b50829383945b8151811015610c1e57610b82336102948385611b28565b610b9457610b8f90611b50565b610b6b565b50509091925060015b15610460579060646020928251600254809110610c16575b5033865260075460405163e715c60760e01b815291516001600160a01b0390811660048401529351602483015295518316604482015294859283918691165af19081156103b857809161037b576040516001600160a01b0383168152602090f35b83525f610bb5565b5050909192610b9d565b610c3d9194503d8085833e61048d8183611a3e565b925f610b65565b5034610134578060031936011261013457600354600454600554600654600754600854600954604080516001600160a01b039889168152968816602088015294871694860194909452918516606085015284166080840152831660a083015290911660c082015260e090f35b50346101345760203660031901126101345760055460405163f2bcac3d60e01b81529060048035918491849182906001600160a01b03165afa91821561049c578392610dc9575b508291825b8151811015610dc157610d13336102948385611b28565b610d2557610d2090611b50565b610cfc565b5050905060015b156101265760048054604051630d3718c560e31b81529182018390526020908290602490829087906001600160a01b03165af1801561049c57610d92575b507f167f0215050eb1c53e39e2bca4aef866c9f101a744be78e3d0ceda72185352268280a280f35b6020813d602011610db9575b81610dab60209383611a3e565b810103126106fa5751610d6a565b3d9150610d9e565b505090610d2c565b610dde9192503d8085833e61048d8183611a3e565b905f610cf7565b50346101345760e036600319011261013457604051610e03816119d9565b610e0b611999565b8152610e15611983565b60208201908152610e246119af565b604083019081526064356001600160a01b03811681036105985760608401908152608435916001600160a01b0383168303610594576080850192835260a435936001600160a01b0385168503610f3b5760a0860194855260c435956001600160a01b0387168703610f375760c0810196875260ff600b5416610f295751600380546001600160a01b03199081166001600160a01b039384161790915591516004805484169183169190911790559151600580548316918416919091179055915160068054841691831691909117905591516007805483169184169190911790559151600880548416918316919091179055915160098054909216921691909117905580f35b62dc149f60e41b8852600488fd5b8780fd5b8680fd5b5034610134578060031936011261013457600160ff19600b541617600b5580f35b5034610134576020366003190112610134576006546040516318feeb1560e31b81526004803590820181905291602090829060249082906001600160a01b03165afa90811561049c5783916110c4575b506001600160a01b031680156110b557604051638da5cb5b60e01b8152602081600481855afa90811561075657849161107b575b50336001600160a01b039091160361106c578083913b1561059c57818091602460405180948193632cddea1560e21b83523360048401525af180156106fe57611057575b50507f8610d91e9f8a63773d7a3c13aa8bb8407203532a61bb703c06fce895f9622d0d6020604051338152a280f35b8161106191611a3e565b61059c57815f611028565b6330cd747160e01b8352600483fd5b90506020813d6020116110ad575b8161109660209383611a3e565b8101031261074a576110a790611b72565b5f610fe4565b3d9150611089565b631dc0650160e31b8352600483fd5b90506020813d6020116110f6575b816110df60209383611a3e565b810103126106fa576110f090611b72565b5f610fb0565b3d91506110d2565b503461013457604036600319011261013457611118611983565b336001600160a01b038216036111345761017b90600435611dd9565b63334bd91960e11b8252600482fd5b50346101345760403660031901126101345761017b600435611163611983565b9061117d610171825f526001602052600160405f20015490565b611d4d565b503461180b57602036600319011261180b5760055460405163f2bcac3d60e01b81529060048035915f91849182906001600160a01b03165afa918215611800575f926118e1575b505f91825b81518110156118d9576111e5336102948385611b28565b6111f7576111f290611b50565b6111ce565b5050905060015b156118cb576006546040516318feeb1560e31b81526004810183905290602090829060249082906001600160a01b03165afa908115611800575f91611891575b506001600160a01b038116801561188257604051631006976960e11b8152602081600481855afa908115611800575f91611863575b50600581101561180f57600203611854575f90602060018060a01b0360045416602460405180958193632698c58760e11b83528960048401525af1918215611800575f92611823575b506005821092831561180f576003830361160557813b1561059457604051630b3af7f960e01b8152600360048201528690818160248183885af180156106fe576115f0575b5050604051631a8ecfcb60e11b8152602081600481865afa9081156115e55787916115c6575b5060048110156115b2576113875761133f9150611c55565b604051911561137357816020917f2dfd36efa3612b4a9efa853af9534e461bbbfc1267193060695ac833416200e79352a280f35b634e487b7160e01b84526021600452602484fd5b50604051631a8ecfcb60e11b8152602081600481855afa908115611490578691611593575b506004811015611550576003036114bd578460048160018060a01b0360055416936040519283809263b46a357f60e01b82525afa80156106fe57602091839161149b575b5060018060a01b039051169260246040518094819363c4bdfb1f60e01b83528760048401525af18015611490578290879061145a575b6114309250611dd9565b507f6e76fb4c77256006d9c38ec7d82b45a8c8f3c27b1d6766fffc42dfb8de6844928580a261133f565b50506020813d602011611488575b8161147560209383611a3e565b8101031261059457816114309151611426565b3d9150611468565b6040513d88823e3d90fd5b6114b791503d8085833e6114af8183611a3e565b810190611bb6565b5f6113f0565b604051631a8ecfcb60e11b8152602081600481855afa908115611490578691611564575b506004811015611550579060028692146114fd575b505061133f565b6005546001600160a01b031690813b156106fa578291602483926040519485938492633773cfe160e01b845260048401525af180156106fe57156114f6578161154591611a3e565b61074a57835f6114f6565b634e487b7160e01b86526021600452602486fd5b611586915060203d60201161158c575b61157e8183611a3e565b810190611b9e565b5f6114e1565b503d611574565b6115ac915060203d60201161158c5761157e8183611a3e565b5f6113ac565b634e487b7160e01b87526021600452602487fd5b6115df915060203d60201161158c5761157e8183611a3e565b5f611327565b6040513d89823e3d90fd5b816115fa91611a3e565b61059457855f611301565b5060048214611615575b5061133f565b803b1561180b57604051630b3af7f960e01b81526004808201525f8160248183865af18015611800576117eb575b50604051631a8ecfcb60e11b8152602081600481855afa9081156114905786916117cc575b5060048110156115505785906116f85760405163b46a357f60e01b815291829060049082905afa9081156116ed5785916116d3575b50516001600160a01b03167fa846d52f1d59acce7c23d1e0fc638d46fc821ca5ef7d94f6ee01175db485a6878580a25b5f61160f565b6116e791503d8087833e6114af8183611a3e565b5f61169d565b6040513d87823e3d90fd5b50604051631a8ecfcb60e11b8152602081600481855afa9081156114905786916117ad575b506004811015611550576003869114611738575b50506116cd565b60405163b46a357f60e01b815291829060049082905afa9081156116ed578591611793575b50516001600160a01b03167fdc6b0ed1742a774ae82e5667826b5a48c80092a61d8e6a6a1c430dc79e5388738580a25f84611731565b6117a791503d8087833e6114af8183611a3e565b5f61175d565b6117c6915060203d60201161158c5761157e8183611a3e565b5f61171d565b6117e5915060203d60201161158c5761157e8183611a3e565b5f611668565b6117f89195505f90611a3e565b5f935f611643565b6040513d5f823e3d90fd5b5f80fd5b634e487b7160e01b5f52602160045260245ffd5b61184691925060203d60201161184d575b61183e8183611a3e565b810190611b86565b905f6112bc565b503d611834565b633d63c4cd60e01b5f5260045ffd5b61187c915060203d60201161184d5761183e8183611a3e565b5f611273565b631dc0650160e31b5f5260045ffd5b90506020813d6020116118c3575b816118ac60209383611a3e565b8101031261180b576118bd90611b72565b5f61123e565b3d915061189f565b621607ef60ea1b5f5260045ffd5b5050906111fe565b6118f69192503d805f833e61048d8183611a3e565b905f6111c9565b3461180b57602036600319011261180b5760206119286004355f526001602052600160405f20015490565b604051908152f35b3461180b57602036600319011261180b576004359063ffffffff60e01b821680920361180b57602091637965db0b60e01b8114908115611972575b5015158152f35b6301ffc9a760e01b1490508361196b565b602435906001600160a01b038216820361180b57565b600435906001600160a01b038216820361180b57565b604435906001600160a01b038216820361180b57565b35906001600160a01b038216820361180b57565b60e081019081106001600160401b038211176119f457604052565b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b038211176119f457604052565b604081019081106001600160401b038211176119f457604052565b90601f801991011681019081106001600160401b038211176119f457604052565b6001600160401b0381116119f457601f01601f191660200190565b3590811515820361180b57565b6001600160401b0381116119f45760051b60200190565b359063ffffffff8216820361180b57565b60208183031261180b578051906001600160401b03821161180b57019080601f8301121561180b578151611ae281611a87565b92611af06040519485611a3e565b81845260208085019260051b82010192831161180b57602001905b828210611b185750505090565b8151815260209182019101611b0b565b8051821015611b3c5760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b5f198114611b5e5760010190565b634e487b7160e01b5f52601160045260245ffd5b51906001600160a01b038216820361180b57565b9081602091031261180b5751600581101561180b5790565b9081602091031261180b5751600481101561180b5790565b60208183031261180b578051906001600160401b03821161180b57019060408282031261180b5760405191611bea83611a23565b611bf381611b72565b83526020810151906001600160401b03821161180b570181601f8201121561180b57805190611c2182611a5f565b92611c2f6040519485611a3e565b8284526020838301011161180b57815f9260208093018386015e83010152602082015290565b6005546040805162ed40bd60e41b81526001600160a01b039384166004820152929091839160249183915f91165af18015611800575f915f91611cce575b5081611c9e91611d4d565b506001600160a01b03167f8dedfed9426ac9fd03a4a7df2f9eb6439a2b8c9376b9bbb0ff8167c1e601b9aa5f80a2565b9150506040813d604011611d0b575b81611cea60409383611a3e565b8101031261180b57611c9e6020611d0083611b72565b920151905081611c93565b3d9150611cdd565b5f81815260016020908152604080832033845290915290205460ff1615611d375750565b63e2517d3f60e01b5f523360045260245260445ffd5b5f8181526001602090815260408083206001600160a01b038616845290915290205460ff16611dd3575f8181526001602081815260408084206001600160a01b0396909616808552959091528220805460ff19169091179055339291907f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d9080a4600190565b50505f90565b5f8181526001602090815260408083206001600160a01b038616845290915290205460ff1615611dd3575f8181526001602090815260408083206001600160a01b0395909516808452949091528120805460ff19169055339291907ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9080a460019056fea2646970667358221220337a900d1fe59715777834e8651ae4e4a7de34cf8655a10786957931439273da64736f6c634300081c0033";

type CybercomDAOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CybercomDAOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CybercomDAO__factory extends ContractFactory {
  constructor(...args: CybercomDAOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _subscriptionId: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_subscriptionId, overrides || {});
  }
  override deploy(
    _subscriptionId: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_subscriptionId, overrides || {}) as Promise<
      CybercomDAO & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CybercomDAO__factory {
    return super.connect(runner) as CybercomDAO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CybercomDAOInterface {
    return new Interface(_abi) as CybercomDAOInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CybercomDAO {
    return new Contract(address, _abi, runner) as unknown as CybercomDAO;
  }
}
