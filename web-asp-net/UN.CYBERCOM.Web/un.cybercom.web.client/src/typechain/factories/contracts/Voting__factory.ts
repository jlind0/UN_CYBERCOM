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
import type { NonPayableOverrides } from "../../common";
import type { Voting, VotingInterface } from "../../contracts/Voting";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_daoAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_councilManagerAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DuplicateContract",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContractState",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposal",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "coordinator",
        type: "address",
      },
    ],
    name: "OnlyOwnerOrCoordinator",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingNotClosed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "vrfCoordinator",
        type: "address",
      },
    ],
    name: "CoordinatorSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "addProposal",
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
    name: "getVoteTally",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes32",
                name: "councilId",
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
                name: "votingParameters",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "groupId",
                    type: "uint256",
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
                    internalType: "int256",
                    name: "score",
                    type: "int256",
                  },
                ],
                internalType: "struct MembershipManagement.CouncilGroupVotes[]",
                name: "votes",
                type: "tuple[]",
              },
              {
                internalType: "int256",
                name: "score",
                type: "int256",
              },
            ],
            internalType: "struct MembershipManagement.CouncilVotes[]",
            name: "acceptedVotes",
            type: "tuple[]",
          },
          {
            internalType: "int256",
            name: "score",
            type: "int256",
          },
          {
            internalType: "enum MembershipManagement.ApprovalStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "proposalId",
            type: "uint256",
          },
        ],
        internalType: "struct MembershipManagement.TallyResult",
        name: "",
        type: "tuple",
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
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "prepareTally",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_vrfCoordinator",
    outputs: [
      {
        internalType: "contract IVRFCoordinatorV2Plus",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vrfCoordinator",
        type: "address",
      },
    ],
    name: "setCoordinator",
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
    name: "tallyVotes",
    outputs: [
      {
        internalType: "enum MembershipManagement.ApprovalStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60803461011157601f612b6338819003918201601f19168301916001600160401b038311848410176101155780849260609460405283398101031261011157805190610059604061005260208401610129565b9201610129565b9133156100cc575f80546001600160a01b03199081163317909155600280548216739ddfaca8183c41ad55329bdeed9f6a8d53168b1b1790556003919091556007805482166001600160a01b039384161790556008805490911692909116919091179055604051612a25908161013e8239f35b60405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f00000000000000006044820152606490fd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b51906001600160a01b03821682036101115756fe6102006040526004361015610012575f80fd5b5f5f3560e01c80631fe543e314610d255780634d318b0e14610c1457806369b8c628146107a357806379ba5097146106f857806379cc9351146104e657806383920871146102a85780638da5cb5b146102815780638ea98117146101ad5780639eccacf6146101845763f2fde38b14610089575f80fd5b34610181576020366003190112610181576004356001600160a01b0381169081900361017f5781546001600160a01b0316338190036101415733821461010257600180546001600160a01b031916831790557fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12788380a380f35b60405162461bcd60e51b815260206004820152601760248201527621b0b73737ba103a3930b739b332b9103a379039b2b63360491b6044820152606490fd5b60405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b6044820152606490fd5b505b80fd5b50346101815780600319360112610181576002546040516001600160a01b039091168152602090f35b5034610181576020366003190112610181576004356001600160a01b0381169081900361017f5781546001600160a01b0316338114158061026c575b6102445750801561023557600280546001600160a01b031916821790556040519081527fd1a6a14209a385a964d036e404cb5cfb71f4000cdb03c9366292430787261be690602090a180f35b63d92e233d60e01b8252600482fd5b60025463061db9c160e01b8452336004526024919091526001600160a01b0316604452606482fd5b506002546001600160a01b03163314156101e9565b5034610181578060031936011261018157546040516001600160a01b039091168152602090f35b5034610181576020366003190112610181576004356001600160a01b0381169081900361017f57600754604051634a9c3a6960e11b8152906001600160a01b031661010082600481845afa9182156104db5784926104aa575b503314159081610492575b8161047a575b81610462575b8161044a575b5061043c5760405163af640d0f60e01b8152602081600481855afa9081156104315783916103fb575b50808352600560205260408320546001600160a01b03166103ec57600454600160401b8110156103d85760018101806004558110156103c4577f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b01819055825260056020526040822080546001600160a01b031916909117905580f35b634e487b7160e01b84526032600452602484fd5b634e487b7160e01b84526041600452602484fd5b63724cc0bb60e01b8352600483fd5b90506020813d602011610429575b816104166020938361100b565b8101031261042557515f610347565b5f80fd5b3d9150610409565b6040513d85823e3d90fd5b6282b42960e81b8252600482fd5b60c001516001600160a01b031633141590505f61031e565b60808101516001600160a01b03163314159150610318565b60e08101516001600160a01b03163314159150610312565b60a08101516001600160a01b0316331415915061030c565b6104cd9192506101003d81116104d4575b6104c5818361100b565b810190611040565b905f610301565b503d6104bb565b6040513d86823e3d90fd5b50346101815760203660031901126101815761050360043561230e565b60405160c052602060c0515260a060c05101918151926080602060c0510152835180915260c080510191602060c08360051b815101019501608052805b82821061057d57856060866020810151604060c051015261056a60408201518360c0510190610f65565b0151608060c051015260c051900360c051f35b9091929460bf1960c0518203018652608051519061018081019180518252610100602082015180511515602085015260208101511515604085015263ffffffff604082015116606085015263ffffffff6060820151166080850152608081015160a085015260a081015160c085015260c081015160e085015260e0810151828501520151151561012083015260408101519261018061014084015283518091526101a0830160206101a08360051b860101950191865b8181106106645750505050916020916101606060600195015191015296816080510160805201920190929192610540565b9091929561019f19868203018452865180518252602081015161010052606060208301526060820160e05261010051518060608401526080830160e0526020610100510160a052895b8181106106d457505060409081015191015260e05195602090810193019190600101610633565b6001906106e660e05160a05151610f72565b60e052602060a0510160a052016106ad565b50346101815780600319360112610181576001546001600160a01b03811633036107655781546001600160a01b031980821633908117855592166001556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b60405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b6044820152606490fd5b503461018157602036600319011261018157600754604051634a9c3a6960e11b815260048035926001600160a01b03169061010090839081845afa9182156104db578492610bf3575b503314159081610bdb575b81610bc3575b81610bab575b81610b93575b5061043c57808252600560205260018060a01b0360408320541690604051630248489560e01b8152602081600481865afa9081156104db578491610b59575b501580610adf575b80610a80575b15610a7157600254600354604051916001600160a01b031690602083016001600160401b03811184821017610a5d57604052600183526040519263125fa26760e31b60208501525115156024840152602483526108b460448461100b565b60405160c081018181106001600160401b03821117610a495791876101046020959361ffff97956040527f787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae81528681019384528660408201966003885263ffffffff60608401620493e081528160808601916001835260a087019485526040519d8e9c8d9b8c99634d8e1c2f60e11b8b528960048c01525160248b01525160448a01525116606488015251166084860152511660a48401525160c060c484015280519182918260e4860152018484015e8181018301849052601f01601f191681010301925af19081156104db578491610a17575b50838193803b1561017f578190602460405180948193630f79223560e01b8352600160048401525af18015610a0c576109f3575b508360409160209552600685522055604051908152f35b6109fe85809261100b565b610a08575f6109dc565b8380fd5b6040513d87823e3d90fd5b90506020813d602011610a41575b81610a326020938361100b565b8101031261042557515f6109a8565b3d9150610a25565b634e487b7160e01b88526041600452602488fd5b634e487b7160e01b87526041600452602487fd5b637ae1d57760e01b8352600483fd5b506040516303ed69ad60e21b8152602081600481865afa9081156104db578491610aad575b504211610856565b90506020813d602011610ad7575b81610ac86020938361100b565b8101031261042557515f610aa5565b3d9150610abb565b50604051631006976960e11b8152602081600481865afa9081156104db578491610b2a575b506005811015610b1657600114610850565b634e487b7160e01b84526021600452602484fd5b610b4c915060203d602011610b52575b610b44818361100b565b8101906122f6565b5f610b04565b503d610b3a565b90506020813d602011610b8b575b81610b746020938361100b565b81010312610a0857610b8590611107565b5f610848565b3d9150610b67565b60c001516001600160a01b031633141590505f610809565b60808101516001600160a01b03163314159150610803565b60e08101516001600160a01b031633141591506107fd565b60a08101516001600160a01b031633141591506107f7565b610c0d9192506101003d81116104d4576104c5818361100b565b905f6107ec565b503461018157602036600319011261018157600754604051634a9c3a6960e11b8152906001600160a01b031661010082600481845afa918215610431578392610d04575b503314159081610cec575b81610cd4575b81610cbc575b81610ca4575b50610c96576020610c8760043561129f565b610c946040518092610f65565bf35b6282b42960e81b8152600490fd5b60c001516001600160a01b031633141590505f610c75565b60808101516001600160a01b03163314159150610c6f565b60e08101516001600160a01b03163314159150610c69565b60a08101516001600160a01b03163314159150610c63565b610d1e9192506101003d81116104d4576104c5818361100b565b905f610c58565b503461042557604036600319011261042557600435906024356001600160401b0381116104255736602382011215610425578060040135926001600160401b038411610425573660248560051b84010111610425576002546001600160a01b031633819003610f4f5750805f52600660205260405f205415610f40575f52600660205260405f20545f52600560205260018060a01b0360405f20541692604051631006976960e11b8152602081600481885afa908115610edf575f91610f21575b506005811015610f0d57600103610efe5715610eea57823b1561042557602460405191631ad7fd4560e31b8352013560048201525f8160248183875af18015610edf57610ecc575b508181923b15610eb457604051630f79223560e01b815260048101839052828160248183865af1908115610431578391610eb7575b5050803b15610eb457818091602460405180948193630b3af7f960e01b8352600260048401525af18015610ea957610e985750f35b81610ea29161100b565b6101815780f35b6040513d84823e3d90fd5b50fd5b81610ec19161100b565b610eb457815f610e63565b610ed891505f9061100b565b5f5f610e2e565b6040513d5f823e3d90fd5b634e487b7160e01b5f52603260045260245ffd5b630b36a47360e41b5f5260045ffd5b634e487b7160e01b5f52602160045260245ffd5b610f3a915060203d602011610b5257610b44818361100b565b5f610de6565b631dc0650160e31b5f5260045ffd5b63073e64fd60e21b5f523360045260245260445ffd5b906005821015610f0d5752565b80516001600160a01b03168252602080820151151590830152604080820151908301526060908101519082015260800190565b608081019081106001600160401b03821117610fc057604052565b634e487b7160e01b5f52604160045260245ffd5b606081019081106001600160401b03821117610fc057604052565b61012081019081106001600160401b03821117610fc057604052565b90601f801991011681019081106001600160401b03821117610fc057604052565b51906001600160a01b038216820361042557565b9081610100910312610425576040519061010082018281106001600160401b03821117610fc0576110e89160e09160405261107a8161102c565b84526110886020820161102c565b60208501526110996040820161102c565b60408501526110aa6060820161102c565b60608501526110bb6080820161102c565b60808501526110cc60a0820161102c565b60a08501526110dd60c0820161102c565b60c08501520161102c565b60e082015290565b6001600160401b038111610fc05760051b60200190565b5190811515820361042557565b81601f820112156104255780519061112b826110f0565b92611139604051948561100b565b82845260208085019360071b8301019181831161042557602001925b828410611163575050505090565b60808483031261042557602060809160405161117e81610fa5565b6111878761102c565b8152611194838801611107565b838201526040870151604082015260608701516060820152815201930192611155565b519063ffffffff8216820361042557565b805115610eea5760200190565b8051821015610eea5760209160051b010190565b5f1981146111f75760010190565b634e487b7160e01b5f52601160045260245ffd5b90611215826110f0565b611222604051918261100b565b8281528092611233601f19916110f0565b01905f5b82811061124357505050565b60209060405161125281610fd4565b5f81526060838201525f604082015282828501015201611237565b8054821015610eea575f52600960205f20910201905f90565b8054821015610eea575f52600360205f20910201905f90565b60018060a01b0360085416815f52600960205281600360405f200154146122e057815f52600560205260018060a01b0360405f20541692604051631cea46b760e31b8152602081600481885afa908115610edf575f916122a3575b50835f52600960205260405f2093600385015560405192630dc9601560e01b84525f84600481895afa938415610edf575f94612264575b5083511561224c5760405180946339eb4bb560e21b8252602482016020600484015281518091526020604484019201905f5b81811061222c575050509181805f9403915afa928315610edf575f93611fdf575b50929193905f915f945b86518410156114b0576113a484889694966111d5565b51965f9560405f9901965b875180518210156113f2576113c6826020926111d5565b510151516113dd575b6113d8906111e9565b6113af565b986113ea6113d8916111e9565b9990506113cf565b50509761140690979492939196959761120b565b955f985f995b8751805182101561147157611423826020926111d5565b5101515161143a575b611435906111e9565b61140c565b996114696114359161144d8d8b516111d5565b51611458828d6111d5565b52611463818c6111d5565b506111e9565b9a905061142c565b5050959096919792939498611497575b5261148b906111e9565b9490939594929161138e565b97906114a661148b93926111e9565b9890919250611481565b9593925090936114d26114c2826110f0565b604051610180526101805161100b565b8061018051526114e4601f19916110f0565b015f5b818110611f685750505f945f955b845181101561155757604061150a82876111d5565b51015151611521575b61151c906111e9565b6114f5565b9561154f61151c9161153389886111d5565b5161154182610180516111d5565b5261146381610180516111d5565b969050611513565b509394505f938493505b61018051518510156118495761157a85610180516111d5565b5190602082019384518051611762575b506040830197915f5b8951805182101561173f57816115a8916111d5565b51875160208101516115d7575b5090611463816115d2938d51906115cc83836111d5565b526111d5565b611593565b6020820163ffffffff6060825151930151168092116115f7575b506115b5565b9892979196959961160c829d9c9695926110f0565b9c806040519e8f9061161e908261100b565b52601f199061162c906110f0565b018d5f5b82811061170e57505060405163ccbac9f560e01b8152919050602082600481875afa8015610edf575f906116db575b611679925063ffffffff606087510151168c515191612643565b9a909a945f5b8c518110156116bb57808f818f918f611463936116a46116b6976116ab9351926111d5565b51906111d5565b516115cc83836111d5565b61167f565b50959b9c61146392959b50978993999197986115d2959b529293506115f1565b506020823d8211611706575b816116f46020938361100b565b8101031261042557611679915161165f565b3d91506116e7565b60209182826040519261172084610fa5565b5f84525f838501525f60408501525f6060850152010152018e90611630565b5050975092959093506117599161154182610180516111d5565b93909194611561565b604084019063ffffffff604083515192015116809111611783575b5061158a565b611796909997999895989692919661120b565b60405163ccbac9f560e01b815290996020826004818d5afa8015610edf575f90611816575b6117d5925063ffffffff6040865101511689515191612643565b979097935f5b89518110156118035780611463818e6116ab8e6116a48f976117fe9851926111d5565b6117db565b5093975098909195979497525f8061177d565b506020823d8211611841575b8161182f6020938361100b565b81010312610425576117d591516117bb565b3d9150611822565b9350509290505f905f905b6101805151821015611b2b57915f9491949061187386610180516111d5565b51915f915f6101c05261188a6040850151516125e9565b926118996040860151516125e9565b975b60408601518051851015611aa557846118b6919998996111d5565b51925f915f985f916118cc6020880151516125e9565b9a6118db6020890151516125e9565b6101e0525b602088015180518710156119a45761193d918d61193761192f8f60206119078d80986111d5565b510151156119975761192a60206001925b0151608060a08201519101519061289e565b612946565b9384926111d5565b5261261b565b925f841261197d5761197061197691855b61195b896101e0516111d5565b52611969886101e0516111d5565b5190612636565b956111e9565b94926118e0565b600160ff1b84146111f75761197061197691855f0361194e565b61192a60205f1992611918565b50611a7f955088949c979e9b968f8f90611a3c9061192a8f95611a29611a6e989f999d604090896114639d602095610100875f940151015115155f14611a8b5750506119f2611a0e92612968565b611a0084890191825161261b565b90526119696101e0516111c8565b945b015161192a838a015160c060e08201519101519061289e565b96015160c060e08201519101519061289e565b6101a052611a506101a0516101c051612636565b6101c052611a62856101a051926111d5565b5281611937858d6111d5565b9c60408a0151906115cc83836111d5565b9298909691959861189b565b91509150611a9d83880191825161261b565b905294611a10565b5096989390611af99598935061010060208a0151015115155f14611b035750611aea92611ad461196992612968565b611ae360608b0191825161261b565b90526111c8565b945b61154182610180516111d5565b9093929192611854565b9050611b259250611b196060890191825161261b565b90526101c05190612636565b94611aec565b90509290925f925f935b6101805151851015611b6c57611b60611b66916060611b5788610180516111d5565b5101519061261b565b946111e9565b93611b35565b93509091935f84139182611f34575b505015611f2a5760039290915b5f925b6101805151841015611f04578254600160401b811015610fc057806001611bb992979394970185558461126d565b5050611bc884610180516111d5565b5151611bd4858561126d565b5055611ca16020611be886610180516111d5565b5101516006610100611bfa888861126d565b509260018401611c1982511515829060ff801983541691151516179055565b60208201511515815465ffffffff0000604085015160101b169061ff0069ffffffff000000000000606087015160301b169360081b169069ffffffffffffffffff00191617171790556080810151600285015560a0810151600385015560c0810151600485015560e081015160058501550151151591019060ff801983541691151516179055565b6060611cb085610180516111d5565b5101516008611cbf868661126d565b5001555f945b6040611cd486610180516111d5565b51015151861015611eed576007611ceb868661126d565b50018054600160401b811015610fc057611d0a91600182018155611286565b5050611d27866040611d1f88610180516111d5565b5101516111d5565b5151611d40876007611d39898961126d565b5001611286565b50556040611d568782611d1f89610180516111d5565b5101516002611d6b886007611d398a8a61126d565b5001555f5b6020611d85886040611d1f8a610180516111d5565b51015151811015611ed857611da0876007611d39898961126d565b50906001820154600160401b811015610fc0576002611ecb836001611d398d6007611d398f8f998087611ed39e81611ddd94018282015501611286565b505089611e168888611d398888611d3988858060a01b03611e0d886020611d1f886040611d1f88610180516111d5565b5151169861126d565b5090878060a01b0316878060a01b031982541617905589611e608888611d398888611d39886020611e558882611d1f886040611d1f88610180516111d5565b51015115159861126d565b509081549060ff60a01b9060a01b169060ff60a01b19161790558986611ead8982611d398989611d39896040611ea4886020611d1f8885611d1f88610180516111d5565b5101519961126d565b5001556060611ea4886020611d1f886040611d1f88610180516111d5565b5001556111e9565b611d70565b50919094611ee5906111e9565b949091611cc5565b93611efb91929395506111e9565b92909391611b8b565b939250906002916001820155016005821015610f0d5760ff1981541660ff831617905590565b6004929091611b88565b9091506064840290848204606414851517156111f75761ffff16918281029281840414901517156111f75710155f80611b7b565b602090604097969751611f7a81610fa5565b5f8152604051611f8981610fef565b5f81525f848201525f60408201525f60608201525f60808201525f60a08201525f60c08201525f60e08201525f61010082015283820152606060408201525f6060820152828261018051010152019594956114e7565b9092503d805f833e611ff1818361100b565b810190602081830312610425578051906001600160401b038211610425570181601f8201121561042557805190612027826110f0565b92612035604051948561100b565b82845260208085019360051b830101918183116104255760208101935b838510612065575050505050915f611384565b84516001600160401b038111610425578201808403601f1901906101808212610425576101206040519261209884610fa5565b60208301518452601f190112610425576040516120b481610fef565b6120c060408301611107565b81526120ce60608301611107565b60208201526120df608083016111b7565b60408201526120f060a083016111b7565b606082015260c0820151608082015260e082015160a082015261010082015160c082015261012082015160e082015261212c6101408301611107565b61010082015260208301526101608101516001600160401b0381116104255760209082010185601f82011215610425578051612167816110f0565b91612175604051938461100b565b81835260208084019260051b820101908882116104255760208101925b8284106121ba5750505050604083015261018001516060820152815260209485019401612052565b83516001600160401b0381116104255782016060818c03601f19011261042557604051916121e783610fd4565b602082015183526040820151926001600160401b038411610425576060836122168f6020809881980101611114565b8584015201516040820152815201930192612192565b91935091602061223f6001928651610f72565b9401910191879392611363565b5050925050600201600460ff19825416179055600490565b9093503d805f833e612276818361100b565b81016020828203126104255781516001600160401b0381116104255761229c9201611114565b925f611331565b90506020813d6020116122d8575b816122be6020938361100b565b81010312610425575161ffff81168103610425575f6112fa565b3d91506122b1565b505f52600960205260ff600260405f2001541690565b90816020910312610425575160058110156104255790565b60405161231a81610fa5565b606081525f60208201525f60408201525f606082015250805f52600960205280600360405f2001541461234b575f80fd5b5f52600960205260405f20610180526040516101a05261236d6101a051610fa5565b610180515461238e61237e826110f0565b604051610160526101605161100b565b806101605152610160515060206101605101610180515f5260205f205f915b8383106124045750505050610160516101a05152600161018051015460206101a051015260ff6002610180510154166005811015610f0d5760406101a0510152600361018051015460606101a05101526101a05190565b60405161241081610fa5565b8254815260405161242081610fef565b63ffffffff600185015460ff81161515835260ff8160081c1615156020840152818160101c16604084015260301c16606082015260028401546080820152600384015460a0820152600484015460c0820152600584015460e082015260ff600685015416151561010082015260208201526007830180546124a0816110f0565b916124ae604051938461100b565b81835260208301905f5260205f20905f905b8382106124f157505050506001928260209260406009950152600886015460608201528152019201920191906123ad565b6040516124fd81610fd4565b83548152600184015461250f816110f0565b6101e0526040516101c05261252a6101e0516101c05161100b565b806101c051526101c0516101205260206101c0510161012052600185015f5260205f20610140525f5b81811061258457505060206001926003926101c05183820152600287015460408201528152019301910190916124c0565b60019060405161259381610fa5565b60ff6101405154848060a01b038116835260a01c16151560208201528261014051015460408201526002610140510154606082015261012051526020610120510161012052600361014051016101405201612553565b906125f3826110f0565b612600604051918261100b565b8281528092612611601f19916110f0565b0190602036910137565b9190915f83820193841291129080158216911516176111f757565b919082018092116111f757565b9093929382159283612854578082116127f55761265f826125e9565b935f925b8084106126735750505050509190565b95965f959491929395505f60015b156127db575b505f97612693826111e9565b60018493845f955b6127c557506003810290808204600314901517156111f75784039384116111f7576003841061278057600219840193841199925f915b8b6111f757858310156126fc57600a810290808204600a14901517156111f7576001909201916126d1565b90959a506103e8929b93945061271391508a612894565b068461276c5785900661272688886111d5565b526001905f5b88811061273f575b509891979298612681565b61274981896111d5565b516127548a8a6111d5565b51146127625760010161272c565b505f915081612734565b634e487b7160e01b5f52601260045260245ffd5b60405162461bcd60e51b815260206004820152601f60248201527f52657175657374656420626c6f636b206973206f7574206f662072616e6765006044820152606490fd5b94600a6127d596049586916111e9565b9561269b565b6127e5575f612687565b9695929190939460010192612663565b60405162461bcd60e51b815260206004820152603160248201527f4e756d626572206f6620696e6469636573206d757374206265206c657373207460448201527068616e206f7220657175616c20746f204d60781b6064820152608490fd5b60405162461bcd60e51b815260206004820152601860248201527704d206d7573742062652067726561746572207468616e20360441b6044820152606490fd5b811561276c570490565b9081620186a002905f1983620186a00992828085109403938085039414612937578382111561291f578190620186a009815f0382168092046002816003021880820260020302808202600203028082026002030280820260020302808202600203028091026002030293600183805f03040190848311900302920304170290565b50634e487b715f52156003026011186020526024601cfd5b50906129439250612894565b90565b81810292915f8212600160ff1b8214166111f75781840514901517156111f757565b8051156129b9575f90815b815183101561299b5761299360019161298c85856111d5565b519061261b565b920191612973565b91505190811561276c57600160ff1b81145f198314166111f7570590565b60405162461bcd60e51b815260206004820152600e60248201526d417272617920697320656d70747960901b6044820152606490fdfea264697066735822122077b9800957d41a7a052d51d3528a9aed391ab6bd70b27512a3215cc35821609f64736f6c634300081c0033";

type VotingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Voting__factory extends ContractFactory {
  constructor(...args: VotingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    subscriptionId: BigNumberish,
    _daoAddress: AddressLike,
    _councilManagerAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      subscriptionId,
      _daoAddress,
      _councilManagerAddress,
      overrides || {}
    );
  }
  override deploy(
    subscriptionId: BigNumberish,
    _daoAddress: AddressLike,
    _councilManagerAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      subscriptionId,
      _daoAddress,
      _councilManagerAddress,
      overrides || {}
    ) as Promise<
      Voting & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Voting__factory {
    return super.connect(runner) as Voting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotingInterface {
    return new Interface(_abi) as VotingInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Voting {
    return new Contract(address, _abi, runner) as unknown as Voting;
  }
}
