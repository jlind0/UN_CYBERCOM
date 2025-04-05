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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ChangeVotingParametersProposal,
  ChangeVotingParametersProposalInterface,
  MembershipManagement,
} from "../../../contracts/Proposal.sol/ChangeVotingParametersProposal";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
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
        name: "_contractAddresses",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
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
        name: "_parameters",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AuthorizationError",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingClosed",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingNotStarted",
    type: "error",
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
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "StatusUpdated",
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
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "vote",
        type: "bool",
      },
    ],
    name: "VoteCasted",
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
    name: "VotingCompleted",
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
    name: "VotingStarted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "docHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "addDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "duration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChangeResponse",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
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
            components: [
              {
                internalType: "address",
                name: "member",
                type: "address",
              },
              {
                internalType: "bool",
                name: "voteCasted",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
              },
            ],
            internalType: "struct MembershipManagement.Vote[]",
            name: "votes",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "enum MembershipManagement.ApprovalStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isProcessing",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "votingStarted",
            type: "bool",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "proposalAddress",
            type: "address",
          },
        ],
        internalType:
          "struct MembershipManagement.ChangeVotingParametersResponse",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDocuments",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "dochash",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "docAddress",
            type: "address",
          },
        ],
        internalType: "struct MembershipManagement.Doc[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotes",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "member",
            type: "address",
          },
          {
            internalType: "bool",
            name: "voteCasted",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        internalType: "struct MembershipManagement.Vote[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isProcessing",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalType",
    outputs: [
      {
        internalType: "enum MembershipManagement.ProposalTypes",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "processing",
        type: "bool",
      },
    ],
    name: "setProcessing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "random",
        type: "uint256",
      },
    ],
    name: "setRandomNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "startVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "status",
    outputs: [
      {
        internalType: "enum MembershipManagement.ApprovalStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum MembershipManagement.ApprovalStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "updateStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "voteCasted",
        type: "bool",
      },
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingStarted",
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
  "0x60806040526007805460ff19908116909155600980549091169055348015610025575f5ffd5b506040516127c53803806127c5833981016040819052610044916106e6565b600980546001600160a01b0387811661010002610100600160a81b0319909216919091179091558451600c80549183166001600160a01b03199283161790556020860151600d80549184169183169190911790556040860151600e80549184169183169190911790556060860151600f805491841691831691909117905560808601516010805491841691831691909117905560a08601516011805491841691831691909117905560c08601516012805491909316911617905560028381556003805460ff19168217905585908590859085603c81106101245780610127565b603c5b60045550506005805460ff19169055505042600655505f5b81518110156104a8576013805460010181555f528151829082908110610167576101676107db565b60200260200101515f015160138281548110610185576101856107db565b905f5260205f2090600702015f01819055508181815181106101a9576101a96107db565b6020026020010151602001515f0151601382815481106101cb576101cb6107db565b5f9182526020909120600790910201600101805460ff19169115159190911790558151829082908110610200576102006107db565b6020026020010151602001516020015160138281548110610223576102236107db565b905f5260205f2090600702016001015f0160016101000a81548160ff02191690831515021790555081818151811061025d5761025d6107db565b6020026020010151602001516040015160138281548110610280576102806107db565b905f5260205f2090600702016001015f0160026101000a81548163ffffffff021916908363ffffffff1602179055508181815181106102c1576102c16107db565b60200260200101516020015160600151601382815481106102e4576102e46107db565b905f5260205f2090600702016001015f0160066101000a81548163ffffffff021916908363ffffffff160217905550818181518110610325576103256107db565b6020026020010151602001516080015160138281548110610348576103486107db565b905f5260205f20906007020160010160010181905550818181518110610370576103706107db565b60200260200101516020015160a0015160138281548110610393576103936107db565b905f5260205f209060070201600101600201819055508181815181106103bb576103bb6107db565b60200260200101516020015160c00151601382815481106103de576103de6107db565b905f5260205f20906007020160010160030181905550818181518110610406576104066107db565b60200260200101516020015160e0015160138281548110610429576104296107db565b905f5260205f20906007020160010160040181905550818181518110610451576104516107db565b602002602001015160200151610100015160138281548110610475576104756107db565b5f9182526020909120600790910201600601805460ff1916911515919091179055806104a0816107ef565b91505061013f565b505050505050610813565b80516001600160a01b03811681146104c9575f5ffd5b919050565b634e487b7160e01b5f52604160045260245ffd5b604080519081016001600160401b0381118282101715610504576105046104ce565b60405290565b60405161012081016001600160401b0381118282101715610504576105046104ce565b60405160e081016001600160401b0381118282101715610504576105046104ce565b604051601f8201601f191681016001600160401b0381118282101715610577576105776104ce565b604052919050565b805180151581146104c9575f5ffd5b805163ffffffff811681146104c9575f5ffd5b5f82601f8301126105b0575f5ffd5b81516001600160401b038111156105c9576105c96104ce565b6105d860208260051b0161054f565b80828252602082019150602061014084028601019250858311156105fa575f5ffd5b602085015b838110156106dc57808703610140811215610618575f5ffd5b6106206104e2565b82518152610120601f1983011215610636575f5ffd5b61063e61050a565b915061064c6020840161057f565b825261065a6040840161057f565b602083015261066b6060840161058e565b604083015261067c6080840161058e565b606083015260a083810151608084015260c0808501519184019190915260e08085015191840191909152610100840151908301526106bd610120840161057f565b61010083015260208181019290925284529290920191610140016105ff565b5095945050505050565b5f5f5f5f5f8587036101608112156106fc575f5ffd5b610705876104b3565b955060e0601f1982011215610718575f5ffd5b5061072161052d565b61072d602088016104b3565b815261073b604088016104b3565b602082015261074c606088016104b3565b604082015261075d608088016104b3565b606082015261076e60a088016104b3565b608082015261077f60c088016104b3565b60a082015261079060e088016104b3565b60c082015261010087015161012088015161014089015192965090945092506001600160401b038111156107c2575f5ffd5b6107ce888289016105a1565b9150509295509295909350565b634e487b7160e01b5f52603260045260245ffd5b5f6001820161080c57634e487b7160e01b5f52601160045260245ffd5b5060010190565b611fa5806108205f395ff3fe608060405234801561000f575f5ffd5b50600436106100f3575f3560e01c806383d948b71161008f57806383d948b7146101c75780638da5cb5b146101d4578063af640d0f14610204578063b377a8541461020d578063b80777ea14610220578063ccbac9f514610229578063d6bfea2814610232578063ef2d870014610245578063fd50aa441461025a575f5ffd5b806302484895146100f75780630b3af7f9146101195780630dc960151461012e5780630f792235146101435780630fb5a6b414610156578063200d2ed21461016d578063348edff714610187578063351d9f961461019a578063633dfc70146101b4575b5f5ffd5b6007546101049060ff1681565b60405190151581526020015b60405180910390f35b61012c610127366004610eef565b61026f565b005b61013661035d565b6040516101109190610f47565b61012c610151366004610fa3565b610480565b61015f60045481565b604051908152602001610110565b60055461017a9060ff1681565b6040516101109190610fe4565b61012c6101953660046110cd565b6104bd565b6003546101a79060ff1681565b6040516101109190611174565b61012c6101c236600461118e565b61055e565b6009546101049060ff1681565b6009546101ec9061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610110565b61015f60025481565b61012c61021b3660046111c3565b610738565b61015f60065481565b61015f60085481565b61012c6102403660046111de565b6108bd565b61024d6108ec565b6040516101109190611223565b610262610c21565b60405161011091906113f2565b600c546001600160a01b031633148015906102955750600d546001600160a01b03163314155b80156102ac57506011546001600160a01b03163314155b80156102c357506010546001600160a01b03163314155b80156102df575060095461010090046001600160a01b03163314155b156102fc57604051621607ef60ea1b815260040160405180910390fd5b6005805482919060ff1916600183600481111561031b5761031b610fbc565b02179055506002547f2da7b23ca63c1eb969eee5fae4acb98186abecf5358b0354a82a5183ebca6b2a826040516103529190610fe4565b60405180910390a250565b600a546060905f906001600160401b0381111561037c5761037c61100f565b6040519080825280602002602001820160405280156103cc57816020015b604080516080810182525f8082526020808301829052928201819052606082015282525f1990920191018161039a5790505b5090505f5b600a5481101561047a57600b5f600a83815481106103f1576103f16114a6565b5f918252602080832091909101546001600160a01b039081168452838201949094526040928301909120825160808101845281549485168152600160a01b90940460ff161515918401919091526001810154918301919091526002015460608201528251839083908110610467576104676114a6565b60209081029190910101526001016103d1565b50919050565b600d546001600160a01b031633146104aa57604051621607ef60ea1b815260040160405180910390fd5b6007805460ff1916911515919091179055565b600c546001600160a01b031633148015906104e35750600d546001600160a01b03163314155b80156104fa57506011546001600160a01b03163314155b801561051157506010546001600160a01b03163314155b801561052d575060095461010090046001600160a01b03163314155b1561054a57604051621607ef60ea1b815260040160405180910390fd5b6105578585858585610d91565b5050505050565b600c546001600160a01b031633148015906105845750600d546001600160a01b03163314155b801561059b57506011546001600160a01b03163314155b80156105b257506010546001600160a01b03163314155b156105cf57604051621607ef60ea1b815260040160405180910390fd5b60095460ff166105f257604051633fd0090160e11b815260040160405180910390fd5b6004544211156106155760405163335b65a560e11b815260040160405180910390fd5b600280546001600160a01b0383165f908152600b60205260409020909101541461068457600a80546001810182555f919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80180546001600160a01b0319166001600160a01b0383161790555b604080516080810182526001600160a01b0383811680835285151560208085018281524286880190815260028054606089019081525f878152600b86528a90209851895494511515600160a01b026001600160a81b0319909516981697909717929092178755516001870155935194840194909455915484519182529281019190915290917f5aaa9aad7433112662b9e5ae23b96ed62b00035f413ab908c55607284e0804e2910160405180910390a25050565b600c546001600160a01b0316331480159061075e5750600d546001600160a01b03163314155b801561077557506011546001600160a01b03163314155b801561078c57506010546001600160a01b03163314155b156107a957604051621607ef60ea1b815260040160405180910390fd5b6009546001600160a01b0382811661010090920416146108105760405162461bcd60e51b815260206004820152601b60248201527f4f6e6c79206f776e65722063616e20737461727420766f74696e67000000000060448201526064015b60405180910390fd5b60095460ff161561085c5760405162461bcd60e51b8152602060048201526016602482015275159bdd1a5b99c8185b1c9958591e481cdd185c9d195960521b6044820152606401610807565b6009805460ff19166001179055600480544291905f9061087d9084906114ce565b90915550506005805460ff191660011790556002546040517fcf33babc496bb6dc2942b39cb7b75766bbbadf7da50d176ff8c513e991140239905f90a250565b600d546001600160a01b031633146108e757604051621607ef60ea1b815260040160405180910390fd5b600855565b6001546060905f906001600160401b0381111561090b5761090b61100f565b60405190808252806020026020018201604052801561098457816020015b6109716040518060c0016040528060608152602001606081526020015f8152602001606081526020015f6001600160a01b031681526020015f6001600160a01b031681525090565b8152602001906001900390816109295790505b5090505f5b815181101561047a575f5f600183815481106109a7576109a76114a6565b905f5260205f20016040516109bc9190611513565b908152604080519182900360200182205460c0830180835263129e754360e21b905290516001600160a01b03909116925081908390634a79d50c9060c4808501915f918187030181865afa158015610a16573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610a3d91908101906115ba565b8152602001826001600160a01b0316635600f04f6040518163ffffffff1660e01b81526004015f60405180830381865afa158015610a7d573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610aa491908101906115ba565b8152602001826001600160a01b03166310c83e536040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ae5573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b099190611606565b8152602001826001600160a01b03166351ff48476040518163ffffffff1660e01b81526004015f60405180830381865afa158015610b49573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610b7091908101906115ba565b8152602001826001600160a01b031663238ac9336040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bb1573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610bd5919061161d565b6001600160a01b03168152602001826001600160a01b0316815250838381518110610c0257610c026114a6565b60200260200101819052508180610c1890611638565b92505050610989565b610c29610e89565b60405180610120016040528060025481526020016013805480602002602001604051908101604052809291908181526020015f905b82821015610d1c575f848152602090819020604080518082018252600786029092018054835281516101208101835260018083015460ff8082161515845261010080830482161515858a015263ffffffff6201000084048116978601979097526601000000000000909204909516606084015260028401546080840152600384015460a0840152600484015460c0840152600584015460e0840152600690930154909316151591810191909152828401529083529092019101610c5e565b505050508152602001610d2d61035d565b815260048054602083015260055460409092019160ff1690811115610d5457610d54610fbc565b815260075460ff908116151560208301526009549081161515604083015261010090046001600160a01b0316606082015230608090910152919050565b60405183905f908190610da5908490611650565b908152604051908190036020019020546001600160a01b031614610dc7575f5ffd5b5f30878486888a604051610dda90610ee2565b610de996959493929190611666565b604051809103905ff080158015610e02573d5f5f3e3d5ffd5b506001805480820182555f919091529091507fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601610e408682611713565b50805f83604051610e519190611650565b90815260405190819003602001902080546001600160a01b03929092166001600160a01b031990921691909117905550505050505050565b6040518061012001604052805f815260200160608152602001606081526020015f81526020015f6004811115610ec157610ec1610fbc565b81525f60208201819052604082018190526060820181905260809091015290565b6107a2806117ce83390190565b5f60208284031215610eff575f5ffd5b813560058110610f0d575f5ffd5b9392505050565b80516001600160a01b03168252602080820151151590830152604080820151908301526060908101519082015260800190565b602080825282518282018190525f918401906040840190835b81811015610f8457610f73838551610f14565b602094909401939250600101610f60565b509095945050505050565b80358015158114610f9e575f5ffd5b919050565b5f60208284031215610fb3575f5ffd5b610f0d82610f8f565b634e487b7160e01b5f52602160045260245ffd5b60058110610fe057610fe0610fbc565b9052565b60208101610ff28284610fd0565b92915050565b6001600160a01b038116811461100c575f5ffd5b50565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b038111828210171561104b5761104b61100f565b604052919050565b5f6001600160401b0382111561106b5761106b61100f565b50601f01601f191660200190565b5f82601f830112611088575f5ffd5b8135602083015f6110a061109b84611053565b611023565b90508281528583830111156110b3575f5ffd5b828260208301375f92810160200192909252509392505050565b5f5f5f5f5f60a086880312156110e1575f5ffd5b85356110ec81610ff8565b945060208601356001600160401b03811115611106575f5ffd5b61111288828901611079565b94505060408601356001600160401b0381111561112d575f5ffd5b61113988828901611079565b9350506060860135915060808601356001600160401b0381111561115b575f5ffd5b61116788828901611079565b9150509295509295909350565b602081016004831061118857611188610fbc565b91905290565b5f5f6040838503121561119f575f5ffd5b6111a883610f8f565b915060208301356111b881610ff8565b809150509250929050565b5f602082840312156111d3575f5ffd5b8135610f0d81610ff8565b5f602082840312156111ee575f5ffd5b5035919050565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b5f602082016020835280845180835260408501915060408160051b8601019250602086015f5b828110156112e857603f198786030184528151805160c0875261126f60c08801826111f5565b90506020820151878203602089015261128882826111f5565b91505060408201516040880152606082015187820360608901526112ac82826111f5565b6080848101516001600160a01b03908116918b019190915260a09485015116939098019290925250506020938401939190910190600101611249565b50929695505050505050565b5f8151808452602084019350602083015f5b828110156113b257815180518752602081015190508051151560208801526020810151151560408801526040810151611347606089018263ffffffff169052565b50606081015163ffffffff8116608089015250608081015160a088015260a081015160c088015260c081015160e088015260e0810151610100880152610100810151905061139a61012088018215159052565b50610140959095019460209190910190600101611306565b5093949350505050565b5f8151808452602084019350602083015f5b828110156113b2576113e1868351610f14565b9550602091909101906001016113ce565b60208152815160208201525f602083015161012060408401526114196101408401826112f4565b90506040840151601f1984830301606085015261143682826113bc565b91505060608401516080840152608084015161145560a0850182610fd0565b5060a084015180151560c08501525060c084015180151560e08501525060e08401516001600160a01b038116610100850152506101008401516001600160a01b038116610120850152509392505050565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b80820180821115610ff257610ff26114ba565b600181811c908216806114f557607f821691505b60208210810361047a57634e487b7160e01b5f52602260045260245ffd5b5f5f8354611520816114e1565b600182168015611537576001811461154c57611579565b60ff1983168652811515820286019350611579565b865f5260205f205f5b8381101561157157815488820152600190910190602001611555565b505081860193505b509195945050505050565b5f61159161109b84611053565b90508281528383830111156115a4575f5ffd5b8282602083015e5f602084830101529392505050565b5f602082840312156115ca575f5ffd5b81516001600160401b038111156115df575f5ffd5b8201601f810184136115ef575f5ffd5b6115fe84825160208401611584565b949350505050565b5f60208284031215611616575f5ffd5b5051919050565b5f6020828403121561162d575f5ffd5b8151610f0d81610ff8565b5f60018201611649576116496114ba565b5060010190565b5f82518060208501845e5f920191825250919050565b6001600160a01b0387811682528616602082015260c0604082018190525f90611691908301876111f5565b85606084015282810360808401526116a981866111f5565b905082810360a08401526116bd81856111f5565b9998505050505050505050565b601f82111561170e57805f5260205f20601f840160051c810160208510156116ef5750805b601f840160051c820191505b81811015610557575f81556001016116fb565b505050565b81516001600160401b0381111561172c5761172c61100f565b6117408161173a84546114e1565b846116ca565b6020601f821160018114611772575f831561175b5750848201515b5f19600385901b1c1916600184901b178455610557565b5f84815260208120601f198516915b828110156117a15787850151825560209485019460019092019101611781565b50848210156117be57868401515f19600387901b60f8161c191681555b50505050600190811b0190555056fe608060405234801561000f575f5ffd5b506040516107a23803806107a283398101604081905261002e91610326565b5f6100398282610476565b5060016100468382610476565b50600283905560036100588582610476565b50600480546001600160a01b038088166001600160a01b0319928316179092556005805492891692909116919091179055426006556002546040515f916100cd916020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b60408051601f19818403018152919052805160209091012090505f80806100f48489610156565b919450925090505f82600381111561010e5761010e610530565b14158061012957506004546001600160a01b03848116911614155b1561014757604051638baa579f60e01b815260040160405180910390fd5b50505050505050505050610544565b5f5f5f835160410361018d576020840151604085015160608601515f1a61017f8882858561019f565b955095509550505050610198565b505081515f91506002905b9250925092565b5f80806fa2a8918ca85bafe22016d0b997e4df60600160ff1b038411156101ce57505f91506003905082610253565b604080515f808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa15801561021f573d5f5f3e3d5ffd5b5050604051601f1901519150506001600160a01b03811661024a57505f925060019150829050610253565b92505f91508190505b9450945094915050565b80516001600160a01b0381168114610273575f5ffd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f806001600160401b038411156102a5576102a5610278565b50604051601f19601f85018116603f011681018181106001600160401b03821117156102d3576102d3610278565b6040528381529050808284018510156102ea575f5ffd5b8383602083015e5f60208583010152509392505050565b5f82601f830112610310575f5ffd5b61031f8383516020850161028c565b9392505050565b5f5f5f5f5f5f60c0878903121561033b575f5ffd5b6103448761025d565b95506103526020880161025d565b60408801519095506001600160401b0381111561036d575f5ffd5b8701601f8101891361037d575f5ffd5b61038c8982516020840161028c565b606089015160808a0151919650945090506001600160401b038111156103b0575f5ffd5b6103bc89828a01610301565b60a089015190935090506001600160401b038111156103d9575f5ffd5b6103e589828a01610301565b9150509295509295509295565b600181811c9082168061040657607f821691505b60208210810361042457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561047157805f5260205f20601f840160051c8101602085101561044f5750805b601f840160051c820191505b8181101561046e575f815560010161045b565b50505b505050565b81516001600160401b0381111561048f5761048f610278565b6104a38161049d84546103f2565b8461042a565b6020601f8211600181146104d5575f83156104be5750848201515b5f19600385901b1c1916600184901b17845561046e565b5f84815260208120601f198516915b8281101561050457878501518255602094850194600190920191016104e4565b508482101561052157868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b634e487b7160e01b5f52602160045260245ffd5b610251806105515f395ff3fe608060405234801561000f575f5ffd5b506004361061006b575f3560e01c806310c83e531461006f578063238ac9331461008b5780634a79d50c146100b657806351ff4847146100cb5780635600f04f146100d3578063b80777ea146100db578063ca973727146100e4575b5f5ffd5b61007860025481565b6040519081526020015b60405180910390f35b60045461009e906001600160a01b031681565b6040516001600160a01b039091168152602001610082565b6100be6100f7565b60405161008291906101ca565b6100be610182565b6100be61018f565b61007860065481565b60055461009e906001600160a01b031681565b5f8054610103906101e3565b80601f016020809104026020016040519081016040528092919081815260200182805461012f906101e3565b801561017a5780601f106101515761010080835404028352916020019161017a565b820191905f5260205f20905b81548152906001019060200180831161015d57829003601f168201915b505050505081565b60038054610103906101e3565b60018054610103906101e3565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b602081525f6101dc602083018461019c565b9392505050565b600181811c908216806101f757607f821691505b60208210810361021557634e487b7160e01b5f52602260045260245ffd5b5091905056fea2646970667358221220a3e9add27624d51009de2e60b86a504f5d5d5f75955e7f0b19b764bcaddf665a64736f6c634300081c0033a26469706673582212203f3fd6582577e4dc1ec7e28737025117825bbe0da90289291ac3f699bd5b3bf264736f6c634300081c0033";

type ChangeVotingParametersProposalConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChangeVotingParametersProposalConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChangeVotingParametersProposal__factory extends ContractFactory {
  constructor(...args: ChangeVotingParametersProposalConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _owner: AddressLike,
    _contractAddresses: MembershipManagement.ContractAddressesStruct,
    _id: BigNumberish,
    _duration: BigNumberish,
    _parameters: MembershipManagement.ChangeVotingParametersRoleStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _owner,
      _contractAddresses,
      _id,
      _duration,
      _parameters,
      overrides || {}
    );
  }
  override deploy(
    _owner: AddressLike,
    _contractAddresses: MembershipManagement.ContractAddressesStruct,
    _id: BigNumberish,
    _duration: BigNumberish,
    _parameters: MembershipManagement.ChangeVotingParametersRoleStruct[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _owner,
      _contractAddresses,
      _id,
      _duration,
      _parameters,
      overrides || {}
    ) as Promise<
      ChangeVotingParametersProposal & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ChangeVotingParametersProposal__factory {
    return super.connect(runner) as ChangeVotingParametersProposal__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChangeVotingParametersProposalInterface {
    return new Interface(_abi) as ChangeVotingParametersProposalInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ChangeVotingParametersProposal {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ChangeVotingParametersProposal;
  }
}
