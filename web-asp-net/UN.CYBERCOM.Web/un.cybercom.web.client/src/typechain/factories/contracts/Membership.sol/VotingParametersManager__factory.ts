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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  VotingParametersManager,
  VotingParametersManagerInterface,
} from "../../../contracts/Membership.sol/VotingParametersManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_votingAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_councilManagementAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proposalStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_daoAddress",
        type: "address",
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
    name: "CouncilDoesNotExist",
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
        internalType: "address",
        name: "proposalAddress",
        type: "address",
      },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum MembershipManagement.ApprovalStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "getRequests",
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
          "struct MembershipManagement.ChangeVotingParametersResponse[]",
        name: "",
        type: "tuple[]",
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
    name: "submitProposal",
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
] as const;

const _bytecode =
  "0x60803460bc57601f6137ac38819003918201601f19168301916001600160401b0383118484101760c05780849260809460405283398101031260bc5760428160d4565b90604d6020820160d4565b60616060605b6040850160d4565b930160d4565b5f80546001600160a01b03199081166001600160a01b0396871617909155600180548216938616939093179092556002805483169385169390931790925560038054909116919092161790556040516136c490816100e88239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b51906001600160a01b038216820360bc5756fe6080806040526004361015610012575f80fd5b5f905f3560e01c908163c39200641461076d575063f0fbda2d14610034575f80fd5b3461076a57602036600319011261076a57600435600581101580610768576002546040516318748ffb60e31b8152908490829060049082906001600160a01b03165afa9081156106a65784916106d0575b509182519161009383610ef0565b926100a16040519485610ecf565b8084526100b0601f1991610ef0565b013660208501378491825b85518110156101a1576001600160a01b036100d68288610fb3565b5116604051631006976960e11b8152602081600481855afa9081156101965785908a92610156575b50610142576005811015610142578314610122575b5061011d90610fdb565b6100bb565b8461013b9161013561011d949789610fb3565b52610fdb565b9390610113565b634e487b7160e01b89526021600452602489fd5b9150506020813d821161018e575b8161017160209383610ecf565b8101031261018a5751600581101561018a57845f6100fe565b8880fd5b3d9150610164565b6040513d8b823e3d90fd5b5050509083916101b081610ef0565b916101be6040519384610ecf565b818352601f196101cd83610ef0565b01845b8181106106b1575050835b82811061035f5750505060405190602082016020835281518091526040830193602060408360051b860101930194815b8383106102185785850386f35b90919293603f1986820301835286519061012081019180518252602081015192610120602084015283518091526020610140840194019085905b8082106103435750505060408101519282810360408401526020808551928381520194019085905b8082106103045750505060608101516060830152608081015160058110156102f057608083015260a08082015115159083015260c08082015115159083015260e0808201516001600160a01b0390811691840191909152610100918201511691015260209687019690949360010192019061020b565b634e487b7160e01b85526021600452602485fd5b9091946020608060019260608951858060a01b03815116835284810151151585840152604081015160408401520151606082015201960192019061027a565b90919460206103556001928851610f25565b9601920190610252565b92939192600490836001600160a01b036103798386610fb3565b5116610383610ffd565b50604051633f542a9160e21b815293849182905afa80156106a65784906103ce575b6103c592506103b48288610fb3565b526103bf8187610fb3565b50610fdb565b929193926101db565b50903d8085833e6103df8183610ecf565b8101906020818303126106a2578051906001600160401b0382116105535701610120818303126106a2576040519161041683610eb3565b8151835260208201516001600160401b0381116105d457820181601f820112156105d457805161044581610ef0565b916104536040519384610ecf565b81835260206101408185019302820101908482116105d057602001915b8183106105d857505050602084015260408201516001600160401b0381116105d457820181601f820112156105d4578051906104ab82610ef0565b926104b96040519485610ecf565b82845260208085019360071b830101918183116105d057602001925b8284106105575750505050604083015260608101516060830152608081015160058110156105535761010083926105489260806103c59796015261051b60a08201611042565b60a085015261052c60c08201611042565b60c085015261053d60e08201610f9f565b60e085015201610f9f565b6101008201526103a5565b8580fd5b6080848303126105d057604051608081018181106001600160401b038211176105bc5760405260809160209161058c87610f9f565b8152610599838801611042565b8382015260408701516040820152606087015160608201528152019301926104d5565b634e487b7160e01b8c52604160045260248cfd5b8980fd5b8680fd5b828503610140811261069e57610120604051916105f483610e98565b85518352601f19011261069e576101409160209160405161061481610eb3565b61061f848801611042565b815261062d60408801611042565b8482015261063d6060880161104f565b604082015261064e6080880161104f565b606082015260a0870151608082015260c087015160a082015260e087015160c082015261010087015160e08201526106896101208801611042565b61010082015283820152815201920191610470565b8a80fd5b8480fd5b6040513d86823e3d90fd5b6020906106c096949596610ffd565b82828901015201949392946101d0565b90503d8085833e6106e18183610ecf565b8101906020818303126106a2578051906001600160401b03821161055357019080601f830112156106a257815161071781610ef0565b926107256040519485610ecf565b81845260208085019260051b8201019283116105d457602001905b828210610750575050505f610085565b6020809161075d84610f9f565b815201910190610740565b825b80fd5b823461090b57602036600319011261090b57600435916001600160401b03831161090b576060600319843603011261090b57606081018181106001600160401b03821117610c925760405282600401356001600160401b03811161090b5783013660238201121561090b5760048101356107e681610ef0565b916107f46040519384610ecf565b818352602060046101408286019402830101019036821161090b57602401915b818310610dd25750505081526024830135602082019081529260440135916001600160a01b038316830361090b57604082019283525f546001600160a01b031633141580610dbd575b80610da8575b610d9a576001546001600160a01b0316925f5b83518051821015610922578161088b91610fb3565b515160405190630f2d64d160e01b82526004820152602081602481895afa908115610917575f916108da575b50156108cb576108c690610fdb565b610876565b634d39054360e11b5f5260045ffd5b90506020813d821161090f575b816108f460209383610ecf565b8101031261090b5761090590611042565b876108b7565b5f80fd5b3d91506108e7565b6040513d5f823e3d90fd5b50506002546003549151604051634a9c3a6960e11b81526001600160a01b0392831693889387938116929160e09183916004918391165afa908115610917575f91610cda575b506040516303c3f07f60e51b8152936020856004815f8a5af1948515610917575f95610ca6575b50519251926040519461262e91828701918783106001600160401b03841117610c9257906101809291889796956020956110618a39610160840196845260018060a01b038151168685015260018060a01b038682015116604085015260018060a01b03604082015116606085015260018060a01b03606082015116608085015260018060a01b0360808201511660a085015260018060a01b0360a08201511660c085015260c060018060a01b039101511660e08401526101008301526101208201526101606101408201528451809452019201905f5b818110610c725750505003905ff0908115610917575f546001600160a01b039283169216803b1561090b575f8091602460405180948193638392087160e01b83528860048401525af1801561091757610c5d575b5060405163af640d0f60e01b8152839190602081600481875afa908115610c1d578391610c28575b50813b156107685760405190622e7e5560e21b82526004820152836024820152828160448183865af1908115610c1d578391610c08575b5050803b15610bf957818091602460405180948193633e29d5df60e11b83528860048401525af18015610bfd57610be4575b505060405163af640d0f60e01b815291602083600481855afa908115610bd85790610ba5575b602092507fcd423cc1203c0af96b9b3d68d73b3064a69de2d14450bb7181c5e5df2132b35883604051848152a2604051908152f35b506020823d602011610bd0575b81610bbf60209383610ecf565b8101031261090b5760209151610b70565b3d9150610bb2565b604051903d90823e3d90fd5b81610bee91610ecf565b610bf9578183610b4a565b5080fd5b6040513d84823e3d90fd5b81610c1291610ecf565b610bf9578185610b18565b6040513d85823e3d90fd5b9250506020823d602011610c55575b81610c4460209383610ecf565b8101031261090b5783915185610ae1565b3d9150610c37565b610c6a9193505f90610ecf565b5f9183610ab9565b919350916020610c856001928651610f25565b9401910191849392610a65565b634e487b7160e01b5f52604160045260245ffd5b9094506020813d602011610cd2575b81610cc260209383610ecf565b8101031261090b5751938761098f565b3d9150610cb5565b905060e0813d60e011610d92575b81610cf560e09383610ecf565b8101031261090b576040519060e082018281106001600160401b03821117610c9257610d879160c091604052610d2a81610f9f565b8452610d3860208201610f9f565b6020850152610d4960408201610f9f565b6040850152610d5a60608201610f9f565b6060850152610d6b60808201610f9f565b6080850152610d7c60a08201610f9f565b60a085015201610f9f565b60c082015286610968565b3d9150610ce8565b621607ef60ea1b5f5260045ffd5b506003546001600160a01b0316331415610863565b506001546001600160a01b031633141561085d565b823603610140811261090b5761012060405191610dee83610e98565b85358352601f19011261090b5761014091602091604051610e0e81610eb3565b610e19848801610f07565b8152610e2760408801610f07565b84820152610e3760608801610f14565b6040820152610e4860808801610f14565b606082015260a0870135608082015260c087013560a082015260e087013560c082015261010087013560e0820152610e836101208801610f07565b61010082015283820152815201920191610814565b604081019081106001600160401b03821117610c9257604052565b61012081019081106001600160401b03821117610c9257604052565b90601f801991011681019081106001600160401b03821117610c9257604052565b6001600160401b038111610c925760051b60200190565b3590811515820361090b57565b359063ffffffff8216820361090b57565b9061010060206101409380518452015180511515602084015260208101511515604084015263ffffffff604082015116606084015263ffffffff6060820151166080840152608081015160a084015260a081015160c084015260c081015160e084015260e081015182840152015115156101208201520190565b51906001600160a01b038216820361090b57565b8051821015610fc75760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b5f198114610fe95760010190565b634e487b7160e01b5f52601160045260245ffd5b6040519061100a82610eb3565b5f6101008382815260606020820152606060408201528260608201528260808201528260a08201528260c08201528260e08201520152565b5190811515820361090b57565b519063ffffffff8216820361090b5756fe6080604052346105515761262e8038038061001981610555565b92833981019080820361016081126105515760e06100368361057a565b91601f1901126105515760405160e081016001600160401b0381118282101761043e576040526100686020840161057a565b81526100766040840161057a565b602082019081526100896060850161057a565b6040830190815261009c6080860161057a565b606084019081526100af60a0870161057a565b91608085019283526100c360c0880161057a565b9360a086019485526100d760e0890161057a565b9560c08101968752610100890151976101208a0151996101408101519060018060401b03821161055157018b601f82011215610551578051906001600160401b03821161043e578160051b60200161012e90610555565b9c8d838152602001926101400282016020019181831161055157602001925b8284106104665750506007805460ff19908116909155600980546001600160a81b03191660089590951b610100600160a81b03169490941790935550509051600c80546001600160a01b03199081166001600160a01b03938416179091559251600d805485169183169190911790559251600e805484169185169190911790559251600f80548316918416919091179055925160108054851691831691909117905592516011805484169185169190911790559251601280549092169216919091179055600291825560038054909116909117905561012c811015610461575061012c5b60045560ff1960055416600555426006555f5b8151811015610452576013546801000000000000000081101561043e5780600161027192016013556105ac565b505061027d81836105dc565b5151610288826105ac565b50556102bd602061029983856105dc565b51015151151560016102aa846105ac565b50019060ff801983541691151516179055565b6020806102ca83856105dc565b5101510151151560016102dc836105ac565b50019061ff0082549160081b169061ff0019161790556040602061030083856105dc565b51015101516001610310836105ac565b50019065ffffffff000082549160101b169065ffffffff000019161790556060602061033c83856105dc565b5101510151600161034c836105ac565b50019069ffffffff00000000000082549160301b169069ffffffff00000000000019161790556080602061038083856105dc565b51015101516002610390836105ac565b50015560a060206103a183856105dc565b510151015160036103b1836105ac565b50015560c060206103c283856105dc565b510151015160046103d2836105ac565b50015560e060206103e383856105dc565b510151015160056103f3836105ac565b50015561041a610100602061040884866105dc565b5101510151151560066102aa846105ac565b5f19811461042a57600101610244565b634e487b7160e01b5f52601160045260245ffd5b634e487b7160e01b5f52604160045260245ffd5b60405161203d90816105f18239f35b610231565b8382036101408112610551576040805191908201906001600160401b0382118383101761043e576101209160405286518352601f19011261055157604051916101208301916001600160401b0383118484101761043e57610140936020936040526104d284890161058e565b81526104e06040890161058e565b848201526104f06060890161059b565b60408201526105016080890161059b565b606082015260a0880151608082015260c088015160a082015260e088015160c082015261010088015160e082015261053c610120890161058e565b6101008201528382015281520193019261014d565b5f80fd5b6040519190601f01601f191682016001600160401b0381118382101761043e57604052565b51906001600160a01b038216820361055157565b5190811515820361055157565b519063ffffffff8216820361055157565b6013548110156105c85760135f52600760205f20910201905f90565b634e487b7160e01b5f52603260045260245ffd5b80518210156105c85760209160051b01019056fe6080806040526004361015610012575f80fd5b5f3560e01c90816302484895146111fc575080630b3af7f9146111145780630dc96015146110b15780630f792235146110725780630fb5a6b414611055578063200d2ed21461102e578063348edff714610ce0578063351d9f9614610cb7578063633dfc7014610ac957806383d948b714610aa75780638da5cb5b14610a7b578063af640d0f14610a5e578063b377a854146108ec578063b80777ea146108cf578063ccbac9f5146108b2578063d6bfea2814610879578063e75235b81461085e578063ef2d8700146104445763fd50aa44146100ed575f80fd5b34610440575f366003190112610440575f61010060405161010d816112b6565b82815260606020820152606060408201528260608201528260808201528260a08201528260c08201528260e082015201526002546101496113f5565b906004549060ff600554169260ff6007541692600954906040519361016d856112b6565b84526013549461017c86611386565b9561018a60405197886112d2565b80875260135f9081527f66de8ffda797e3de9c05e8fc57b3bf0ec28a930d40b0d285d93c06501cf6a0909190602089015b82821061037b57505050506020850195865260408501938452606085019182526080850196600581101561036757875260a08501901515815260c085019160ff84161515835260e086019360018060a01b039060081c16845261010086019430865260405197602089526101408901975160208a0152519661012060408a0152875180915260206101608a019801905f5b8181106102df575050505195601f19888203016060890152602080885192838152019701905f5b8181106102c3575050508697610294915160808901525160a088019061125d565b51151560c086015251151560e0850152516001600160a01b039081166101008501529051166101208301520390f35b90919760206102d56001928b5161121b565b9901929101610273565b9091986020610140600192610100838e518051845201518051151585840152848101511515604084015263ffffffff604082015116606084015263ffffffff6060820151166080840152608081015160a084015260a081015160c084015260c081015160e084015260e08101518284015201511515610120820152019a01910191909161024c565b634e487b7160e01b5f52602160045260245ffd5b604051604081018181106001600160401b0382111761042c57600192600792602092604052875481526040516103b0816112b6565b63ffffffff868a015460ff81161515835260ff8160081c16151586840152818160101c16604084015260301c16606082015260028901546080820152600389015460a0820152600489015460c0820152600589015460e082015260ff60068a0154161515610100820152838201528152019401910190926101bb565b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b34610440575f3660031901126104405760015461046081611386565b9061046e60405192836112d2565b80825261047d601f1991611386565b015f5b81811061082157825f5b815181101561075c5761049c8161139d565b5060405181545f926104ad826114e0565b91600181169081156107455750600114610711575b50505f8083529181900360200190205460405163129e754360e21b8152916001600160a01b03919091169082600481845afa918215610645575f926106f5575b50604051635600f04f60e01b81525f81600481855afa908115610645575f916106d3575b506040516310c83e5360e01b8152602081600481865afa908115610645575f916106a2575b506040516351ff484760e01b8152905f82600481875afa918215610645575f92610650575b5060405163238ac93360e01b815292602084600481885afa938415610645575f94610602575b50604051956105a48761129b565b86526020860152604085015260608401526001600160a01b0316608083015260a08201526105d282846113e1565b526105dd81836113e1565b505f1981146105ee5760010161048a565b634e487b7160e01b5f52601160045260245ffd5b9093506020813d821161063d575b8161061d602093836112d2565b8101031261044057516001600160a01b0381168103610440579288610596565b3d9150610610565b6040513d5f823e3d90fd5b9091503d805f833e61066281836112d2565b810190602081830312610440578051906001600160401b03821161044057019080601f8301121561044057815161069b92602001611518565b9087610570565b90506020813d82116106cb575b816106bc602093836112d2565b8101031261044057518661054b565b3d91506106af565b6106ef91503d805f833e6106e781836112d2565b81019061154e565b85610526565b61070a9192503d805f833e6106e781836112d2565b9084610502565b909192505f5260205f205f905b82821061073157505081019084806104c2565b80548285015260209091019060010161071e565b60ff191684525050801515028101915084806104c2565b506040518091602082016020835281518091526040830190602060408260051b8601019301915f905b82821061079457505050500390f35b919360019193955060208091603f1989820301855287519060a06107f36107d76107c7855160c0865260c0860190611362565b8686015185820388870152611362565b6040850151604085015260608501518482036060860152611362565b928680831b036080820151166080840152818780821b03910151169101529601920192018594939192610785565b6020906040516108308161129b565b606081526060838201525f60408201526060808201525f60808201525f60a082015282828601015201610480565b34610440575f36600319011261044057602060405160438152f35b3461044057602036600319011261044057600d546001600160a01b031633036108a457600435600855005b621607ef60ea1b5f5260045ffd5b34610440575f366003190112610440576020600854604051908152f35b34610440575f366003190112610440576020600654604051908152f35b346104405760203660031901126104405761090561126a565b600c546001600160a01b031633141580610a49575b80610a34575b80610a1f575b6108a457600954906001600160a01b03600883901c81169116036109da5760ff811661099c5760ff19166001176009556004544281019081106105ee57600455600160ff1960055416176005556002547fcf33babc496bb6dc2942b39cb7b75766bbbadf7da50d176ff8c513e9911402395f80a2005b60405162461bcd60e51b8152602060048201526016602482015275159bdd1a5b99c8185b1c9958591e481cdd185c9d195960521b6044820152606490fd5b60405162461bcd60e51b815260206004820152601b60248201527f4f6e6c79206f776e65722063616e20737461727420766f74696e6700000000006044820152606490fd5b506010546001600160a01b0316331415610926565b506011546001600160a01b0316331415610920565b50600d546001600160a01b031633141561091a565b34610440575f366003190112610440576020600254604051908152f35b34610440575f3660031901126104405760095460405160089190911c6001600160a01b03168152602090f35b34610440575f36600319011261044057602060ff600954166040519015158152f35b3461044057604036600319011261044057610ae261124e565b6024356001600160a01b0381169081900361044057600c546001600160a01b031633141580610ca2575b80610c8d575b80610c78575b6108a45760ff6009541615610c69576004544211610c5a57805f52600b602052600260405f20015460025403610bf2575b60407f5aaa9aad7433112662b9e5ae23b96ed62b00035f413ab908c55607284e0804e2916002546002835191610b7e83611280565b83835295151560208084018281524287860190815260608601998a525f878152600b84528890209551865492516001600160a81b03199093166001600160a01b03919091161791151560a01b60ff60a01b1691909117855551600185015596519190920155600254835192835294820152a2005b600a54600160401b81101561042c577f5aaa9aad7433112662b9e5ae23b96ed62b00035f413ab908c55607284e0804e291610c3582600160409401600a556113c9565b81546001600160a01b0360039290921b91821b19169083901b1790559150610b499050565b63335b65a560e11b5f5260045ffd5b633fd0090160e11b5f5260045ffd5b506010546001600160a01b0316331415610b18565b506011546001600160a01b0316331415610b12565b50600d546001600160a01b0316331415610b0c565b34610440575f3660031901126104405760ff600354166040516004821015610367576020918152f35b346104405760a036600319011261044057610cf961126a565b6024356001600160401b03811161044057610d18903690600401611344565b6044356001600160401b03811161044057610d37903690600401611344565b916084356001600160401b038111610440573660238201121561044057610d6890369060248160040135910161130e565b9160018060a01b03600c541633141580611019575b80611004575b80610fef575b80610fd4575b6108a45760ff60055416600581101561036757610fc5576040519284519360208601948086835e5f9082019081528190036020019020546001600160a01b03166104405760405192610a8392838501918583106001600160401b0384111761042c57610e25610e4994610e3b92889761158589393086526001600160a01b0316602086015260c060408601819052850190611362565b6064356060850152838103608085015288611362565b9160a0818403910152611362565b03905ff091821561064557600154600160401b81101561042c57806001610e73920160015561139d565b610fb25781516001600160401b03811161042c57610e9182546114e0565b601f8111610f6d575b506020601f8211600114610f0957908060209493925f91610efe575b508160011b915f199060031b1c19161790555b604051928391518091835e5f9082019081520301902080546001600160a01b0319166001600160a01b03909216919091179055005b905083015187610eb6565b601f19821690835f52805f20915f5b818110610f555750918391602096959460019410610f3d575b5050811b019055610ec9565b8501515f1960f88460031b161c191690558780610f31565b9192602060018192868a015181550194019201610f18565b825f5260205f20601f830160051c81019160208410610fa8575b601f0160051c01905b818110610f9d5750610e9a565b5f8155600101610f90565b9091508190610f87565b634e487b7160e01b5f525f60045260245ffd5b6392d496a160e01b5f5260045ffd5b506009543360089190911c6001600160a01b03161415610d8f565b506010546001600160a01b0316331415610d89565b506011546001600160a01b0316331415610d83565b50600d546001600160a01b0316331415610d7d565b34610440575f36600319011261044057602060ff60055416611053604051809261125d565bf35b34610440575f366003190112610440576020600454604051908152f35b346104405760203660031901126104405761108b61124e565b600d546001600160a01b031633036108a45760ff80196007541691151516176007555f80f35b34610440575f366003190112610440576110c96113f5565b6040518091602082016020835281518091526020604084019201905f5b8181106110f4575050500390f35b919350916020611107600192865161121b565b94019101918493926110e6565b3461044057602036600319011261044057600435600581101561044057600c546001600160a01b0316331415806111e7575b806111d2575b806111bd575b806111a2575b6108a45760ff196005541660ff8216176005557f2da7b23ca63c1eb969eee5fae4acb98186abecf5358b0354a82a5183ebca6b2a60206002549261119f604051809261125d565ba2005b506009543360089190911c6001600160a01b03161415611158565b506010546001600160a01b0316331415611152565b506011546001600160a01b031633141561114c565b50600d546001600160a01b0316331415611146565b34610440575f3660031901126104405760209060ff6007541615158152f35b80516001600160a01b03168252602080820151151590830152604080820151908301526060908101519082015260800190565b60043590811515820361044057565b9060058210156103675752565b600435906001600160a01b038216820361044057565b608081019081106001600160401b0382111761042c57604052565b60c081019081106001600160401b0382111761042c57604052565b61012081019081106001600160401b0382111761042c57604052565b90601f801991011681019081106001600160401b0382111761042c57604052565b6001600160401b03811161042c57601f01601f191660200190565b92919261131a826112f3565b9161132860405193846112d2565b829481845281830111610440578281602093845f960137010152565b9080601f830112156104405781602061135f9335910161130e565b90565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b6001600160401b03811161042c5760051b60200190565b6001548110156113b55760015f5260205f2001905f90565b634e487b7160e01b5f52603260045260245ffd5b600a548110156113b557600a5f5260205f2001905f90565b80518210156113b55760209160051b010190565b600a5461140181611386565b9061140f60405192836112d2565b808252601f1961141e82611386565b015f5b8181106114b15750505f5b81811061143857505090565b806114446001926113c9565b838060a01b0391549060031b1c165f52600b60205260405f2060026040519161146c83611280565b60ff8154868060a01b038116855260a01c16151560208401528481015460408401520154606082015261149f82866113e1565b526114aa81856113e1565b500161142c565b6020906040516114c081611280565b5f81525f838201525f60408201525f606082015282828701015201611421565b90600182811c9216801561150e575b60208310146114fa57565b634e487b7160e01b5f52602260045260245ffd5b91607f16916114ef565b929192611524826112f3565b9161153260405193846112d2565b829481845281830111610440578281602093845f96015e010152565b602081830312610440578051906001600160401b03821161044057019080601f8301121561044057815161135f9260200161151856fe608080604052346104f557610a83803803809161001c82856104f9565b8339810160c0828203126104f5576100338261051c565b906100406020840161051c565b60408401519093906001600160401b0381116104f557810182601f820112156104f5578281602061007393519101610530565b91606082015191608081015160018060401b0381116104f55782610098918301610575565b60a08201519092906001600160401b0381116104f5576100b89201610575565b8051906001600160401b038211610373576100d35f54610592565b601f81116104a8575b50602090601f83116001146104455761010c92915f9183610387575b50508160011b915f199060031b1c19161790565b5f555b8051906001600160401b0382116103735761012b600154610592565b601f81116103f7575b50602090601f83116001146103925761016392915f91836103875750508160011b915f199060031b1c19161790565b6001555b6002558051926001600160401b03841161037357610186600354610592565b601f811161031a575b50602093601f81116001146102b557806101c29161024795965f916102aa575b508160011b915f199060031b1c19161790565b6003555b600480546001600160a01b039283166001600160a01b0319918216811790925560058054969093169516949094179055426006556002546040517f19457468657265756d205369676e6564204d6573736167653a0a33320000000060208201908152603c8083019390935291815261023f605c826104f9565b5190206105e0565b506004819392931015610296571591821592610282575b5050610273576040516103e5908161069e8239f35b638baa579f60e01b5f5260045ffd5b6001600160a01b0316141590505f8061025e565b634e487b7160e01b5f52602160045260245ffd5b90508401515f6101af565b601f19811660035f52855f20905f5b81811061030257509061024795968360019493106102ea575b5050811b016003556101c6565b8501515f1960f88460031b161c191690555f806102dd565b858801518355602097880197600190930192016102c4565b60035f52610363907fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b601f870160051c81019160208810610369575b601f0160051c01906105ca565b5f61018f565b9091508190610356565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100f8565b90601f1983169160015f52815f20925f5b8181106103df57509084600195949392106103c7575b505050811b01600155610167565b01515f1960f88460031b161c191690555f80806103b9565b929360206001819287860151815501950193016103a3565b60015f5261043f907fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6601f850160051c8101916020861061036957601f0160051c01906105ca565b5f610134565b90601f198316915f8052815f20925f5b8181106104905750908460019594939210610478575b505050811b015f5561010f565b01515f1960f88460031b161c191690555f808061046b565b92936020600181928786015181550195019301610455565b5f80526104ef907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563601f850160051c8101916020861061036957601f0160051c01906105ca565b5f6100dc565b5f80fd5b601f909101601f19168101906001600160401b0382119082101761037357604052565b51906001600160a01b03821682036104f557565b9192916001600160401b0382116103735760405191610559601f8201601f1916602001846104f9565b8294818452818301116104f5578281602093845f96015e010152565b9080601f830112156104f557815161058f92602001610530565b90565b90600182811c921680156105c0575b60208310146105ac57565b634e487b7160e01b5f52602260045260245ffd5b91607f16916105a1565b8181106105d5575050565b5f81556001016105ca565b8151919060418303610610576106099250602082015190606060408401519301515f1a9061061a565b9192909190565b50505f9160029190565b91906fa2a8918ca85bafe22016d0b997e4df60600160ff1b038411610692579160209360809260ff5f9560405194855216868401526040830152606082015282805260015afa15610687575f516001600160a01b0381161561067d57905f905f90565b505f906001905f90565b6040513d5f823e3d90fd5b5050505f916003919056fe6080806040526004361015610012575f80fd5b5f3560e01c90816310c83e531461030357508063238ac933146102db5780634a79d50c1461023957806351ff4847146101945780635600f04f146100b2578063b80777ea146100955763ca97372714610069575f80fd5b34610091575f366003190112610091576005546040516001600160a01b039091168152602090f35b5f80fd5b34610091575f366003190112610091576020600654604051908152f35b34610091575f366003190112610091576040515f6001546100d28161031d565b80845290600181169081156101705750600114610112575b61010e836100fa81850382610355565b60405191829160208352602083019061038b565b0390f35b60015f9081527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6939250905b808210610156575090915081016020016100fa6100ea565b91926001816020925483858801015201910190929161013e565b60ff191660208086019190915291151560051b840190910191506100fa90506100ea565b34610091575f366003190112610091576040515f6003546101b48161031d565b808452906001811690811561017057506001146101db5761010e836100fa81850382610355565b60035f9081527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b939250905b80821061021f575090915081016020016100fa6100ea565b919260018160209254838588010152019101909291610207565b34610091575f366003190112610091576040515f5f546102588161031d565b8084529060018116908115610170575060011461027f5761010e836100fa81850382610355565b5f8080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563939250905b8082106102c1575090915081016020016100fa6100ea565b9192600181602092548385880101520191019092916102a9565b34610091575f366003190112610091576004546040516001600160a01b039091168152602090f35b34610091575f366003190112610091576020906002548152f35b90600182811c9216801561034b575b602083101461033757565b634e487b7160e01b5f52602260045260245ffd5b91607f169161032c565b90601f8019910116810190811067ffffffffffffffff82111761037757604052565b634e487b7160e01b5f52604160045260245ffd5b805180835260209291819084018484015e5f828201840152601f01601f191601019056fea2646970667358221220a3b2c4727b7df3b1eebfb0971f292450aed49d7a45ef2b77cd54fba9654df66964736f6c634300081c0033a264697066735822122006643b63e259028a5ed8215e19a12a0b1a51430ae76f0059a68a35235716a03264736f6c634300081c0033a26469706673582212206234593149147fc8d6a41431cc85e869c0a3b063f855f6268fe2e23d9b70918c64736f6c634300081c0033";

type VotingParametersManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotingParametersManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VotingParametersManager__factory extends ContractFactory {
  constructor(...args: VotingParametersManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _votingAddress: AddressLike,
    _councilManagementAddress: AddressLike,
    _proposalStorageAddress: AddressLike,
    _daoAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _votingAddress,
      _councilManagementAddress,
      _proposalStorageAddress,
      _daoAddress,
      overrides || {}
    );
  }
  override deploy(
    _votingAddress: AddressLike,
    _councilManagementAddress: AddressLike,
    _proposalStorageAddress: AddressLike,
    _daoAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _votingAddress,
      _councilManagementAddress,
      _proposalStorageAddress,
      _daoAddress,
      overrides || {}
    ) as Promise<
      VotingParametersManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): VotingParametersManager__factory {
    return super.connect(runner) as VotingParametersManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotingParametersManagerInterface {
    return new Interface(_abi) as VotingParametersManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): VotingParametersManager {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as VotingParametersManager;
  }
}
