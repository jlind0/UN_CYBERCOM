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
  MembershipManager,
  MembershipManagerInterface,
} from "../../../contracts/Membership.sol/MembershipManager";

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
    name: "GroupNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "LogicError",
    type: "error",
  },
  {
    inputs: [],
    name: "NationAlreadyMember",
    type: "error",
  },
  {
    inputs: [],
    name: "OutstandingProposal",
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
    name: "getMembershipRequests",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
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
            internalType: "bytes32",
            name: "council",
            type: "bytes32",
          },
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
          "struct MembershipManagement.MembershipProposalResponse[]",
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
] as const;

const _bytecode =
  "0x6080604052348015600e575f5ffd5b50604051613dd6380380613dd6833981016040819052602b916096565b5f80546001600160a01b039586166001600160a01b031991821617909155600180549486169482169490941790935560028054928516928416929092179091556003805491909316911617905560de565b80516001600160a01b03811681146091575f5ffd5b919050565b5f5f5f5f6080858703121560a8575f5ffd5b60af85607c565b935060bb60208601607c565b925060c760408601607c565b915060d360608601607c565b905092959194509250565b613ceb806100eb5f395ff3fe608060405234801561000f575f5ffd5b5060043610610034575f3560e01c80639696967914610038578063d7a81ed314610061575b5f5ffd5b61004b610046366004610dc9565b610081565b6040516100589190610eed565b60405180910390f35b61007461006f366004610f0d565b610572565b6040516100589190611015565b5f80546001600160a01b031633148015906100a757506001546001600160a01b03163314155b80156100be57506003546001600160a01b03163314155b156100db57604051621607ef60ea1b815260040160405180910390fd5b6001546002546040848101519051630ed1f1b960e41b815260048101919091526001600160a01b039283169290911690829063ed1f1b9090602401602060405180830381865afa158015610131573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610155919061116d565b6101725760405163a5edf99360e01b815260040160405180910390fd5b816001600160a01b031663d5a2a5dd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101ae573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101d29190611186565b5f036102ab575f6101e2856107e7565b604051630b3af7f960e01b815290915081906001600160a01b03821690630b3af7f9906102149060039060040161119d565b5f604051808303815f87803b15801561022b575f5ffd5b505af115801561023d573d5f5f3e3d5ffd5b505060035460405163e93b111160e01b81526001600160a01b03909116925082915063e93b111190610273908690600401610eed565b5f604051808303815f87803b15801561028a575f5ffd5b505af115801561029c573d5f5f3e3d5ffd5b50949998505050505050505050565b8351604051634013a8dd60e11b81526001600160a01b0384169163802751ba916102d89190600401610eed565b602060405180830381865afa1580156102f3573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610317919061116d565b156103355760405163e94b3c2960e01b815260040160405180910390fd5b83516040516304c6d25f60e41b81525f916001600160a01b03841691634c6d25f09161036391600401610eed565b602060405180830381865afa15801561037e573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103a291906111b6565b6001600160a01b0316146105435783516040516304c6d25f60e41b81525f916001600160a01b03841691634c6d25f0916103de91600401610eed565b602060405180830381865afa1580156103f9573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061041d91906111b6565b90505f816001600160a01b031663200d2ed26040518163ffffffff1660e01b8152600401602060405180830381865afa15801561045c573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061048091906111dc565b90505f81600481111561049557610495610fe1565b14806104b2575060018160048111156104b0576104b0610fe1565b145b806104ce575060028160048111156104cc576104cc610fe1565b145b156104ec576040516382254cc760e01b815260040160405180910390fd5b600381600481111561050057610500610fe1565b036105105750925061056d915050565b600481600481111561052457610524610fe1565b0361053c57610532866107e7565b9695505050505050565b5050610554565b61054c846107e7565b949350505050565b604051634b4c8d2960e11b815260040160405180910390fd5b919050565b60025460408051637b9e163160e11b815290516060926001600160a01b0316915f91839163f73c2c6291600480830192869291908290030181865afa1580156105bd573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526105e49190810190611219565b90505f81516001600160401b0381111561060057610600610c8c565b604051908082528060200260200182016040528015610629578160200160208202803683370190505b5090505f805b8351821015610729575f84838151811061064b5761064b6112a8565b6020026020010151905087600481111561066757610667610fe1565b816001600160a01b031663200d2ed26040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106a3573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906106c791906111dc565b60048111156106d8576106d8610fe1565b0361071657808483815181106106f0576106f06112a8565b6001600160a01b039092166020928302919091019091015281610712816112bc565b9250505b82610720816112bc565b9350505061062f565b5f816001600160401b0381111561074257610742610c8c565b60405190808252806020026020018201604052801561077b57816020015b610768610c02565b8152602001906001900390816107605790505b5090505f92505b818310156107dc576107ac84848151811061079f5761079f6112a8565b6020026020010151610b92565b8184815181106107be576107be6112a8565b602002602001018190525082806107d4906112bc565b935050610782565b979650505050505050565b600254600354608083015160408051634a9c3a6960e11b815290515f946001600160a01b0390811694169285929091849163953874d29160048083019260e09291908290030181865afa158015610840573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061086491906112e0565b846001600160a01b031663787e0fe06040518163ffffffff1660e01b81526004016020604051808303815f875af11580156108a1573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108c59190611186565b8760600151886020015189604001516040516108e090610c7f565b6108ef9695949392919061137a565b604051809103905ff080158015610908573d5f5f3e3d5ffd5b505f54604051638392087160e01b81529192506001600160a01b0316908290829063839208719061093d908490600401610eed565b5f604051808303815f87803b158015610954575f5ffd5b505af1158015610966573d5f5f3e3d5ffd5b50505050602087015151604051631b6f984b60e01b81526001600160a01b039182166004820152828216602482015290861690631b6f984b906044015f604051808303815f87803b1580156109b9575f5ffd5b505af11580156109cb573d5f5f3e3d5ffd5b50505050846001600160a01b031662b9f954846001600160a01b031663af640d0f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a19573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610a3d9190611186565b6040516001600160e01b031960e084901b16815260048101919091526001600160a01b03841660248201526044015f604051808303815f87803b158015610a82575f5ffd5b505af1158015610a94573d5f5f3e3d5ffd5b505060405163474091b360e11b81526001600160a01b0388169250638e8123669150610ac4908490600401610eed565b5f604051808303815f87803b158015610adb575f5ffd5b505af1158015610aed573d5f5f3e3d5ffd5b50505050826001600160a01b031663af640d0f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b2d573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610b519190611186565b7fcd423cc1203c0af96b9b3d68d73b3064a69de2d14450bb7181c5e5df2132b35882604051610b809190610eed565b60405180910390a29695505050505050565b610b9a610c02565b816001600160a01b03166331393ca66040518163ffffffff1660e01b81526004015f60405180830381865afa158015610bd5573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610bfc9190810190611578565b92915050565b60408051610180810182525f808252602080830182905283518085018552918252606090820152909182019081526020015f81526020015f8152602001606081526020015f81526020015f6004811115610c5e57610c5e610fe1565b81525f60208201819052604082018190526060820181905260809091015290565b612612806116a483390190565b634e487b7160e01b5f52604160045260245ffd5b60405160a081016001600160401b0381118282101715610cc257610cc2610c8c565b60405290565b604080519081016001600160401b0381118282101715610cc257610cc2610c8c565b60405160e081016001600160401b0381118282101715610cc257610cc2610c8c565b604051608081016001600160401b0381118282101715610cc257610cc2610c8c565b60405161018081016001600160401b0381118282101715610cc257610cc2610c8c565b604051601f8201601f191681016001600160401b0381118282101715610d7957610d79610c8c565b604052919050565b6001600160a01b0381168114610d95575f5ffd5b50565b803561056d81610d81565b5f6001600160401b03821115610dbb57610dbb610c8c565b50601f01601f191660200190565b5f60208284031215610dd9575f5ffd5b81356001600160401b03811115610dee575f5ffd5b820160a08185031215610dff575f5ffd5b610e07610ca0565b8135610e1281610d81565b815260208201356001600160401b03811115610e2c575f5ffd5b820160408187031215610e3d575f5ffd5b610e45610cc8565b8135610e5081610d81565b815260208201356001600160401b03811115610e6a575f5ffd5b80830192505086601f830112610e7e575f5ffd5b8135610e91610e8c82610da3565b610d51565b818152886020838601011115610ea5575f5ffd5b816020850160208301375f602092820183015282820152830152506040828101359082015260608083013590820152610ee060808301610d98565b6080820152949350505050565b6001600160a01b0391909116815260200190565b60058110610d95575f5ffd5b5f60208284031215610f1d575f5ffd5b8135610f2881610f01565b9392505050565b60018060a01b0381511682525f60208201516040602085015280518060408601528060208301606087015e5f606082870101526060601f19601f8301168601019250505092915050565b5f8151808452602084019350602083015f5b82811015610fd757815180516001600160a01b03168752602080820151151581890152604080830151908901526060918201519188019190915260809096019590910190600101610f8b565b5093949350505050565b634e487b7160e01b5f52602160045260245ffd5b6005811061101157634e487b7160e01b5f52602160045260245ffd5b9052565b5f602082016020835280845180835260408501915060408160051b8601019250602086015f5b8281101561115257603f19878603018452815180518652602081015161106c60208801826001600160a01b03169052565b5060408101516101806040880152611088610180880182610f2f565b9050606082015160608801526080820151608088015260a082015187820360a08901526110b58282610f79565b91505060c082015160c088015260e08201516110d460e0890182610ff5565b506101008201516110ea61010089018215159052565b5061012082015161110061012089018215159052565b5061014082015161111d6101408901826001600160a01b03169052565b50610160820151915061113c6101608801836001600160a01b03169052565b955050602093840193919091019060010161103b565b50929695505050505050565b8051801515811461056d575f5ffd5b5f6020828403121561117d575f5ffd5b610f288261115e565b5f60208284031215611196575f5ffd5b5051919050565b60208101610bfc8284610ff5565b805161056d81610d81565b5f602082840312156111c6575f5ffd5b8151610f2881610d81565b805161056d81610f01565b5f602082840312156111ec575f5ffd5b8151610f2881610f01565b5f6001600160401b0382111561120f5761120f610c8c565b5060051b60200190565b5f60208284031215611229575f5ffd5b81516001600160401b0381111561123e575f5ffd5b8201601f8101841361124e575f5ffd5b805161125c610e8c826111f7565b8082825260208201915060208360051b85010192508683111561127d575f5ffd5b6020840193505b8284101561053257835161129781610d81565b825260209384019390910190611284565b634e487b7160e01b5f52603260045260245ffd5b5f600182016112d957634e487b7160e01b5f52601160045260245ffd5b5060010190565b5f60e08284031280156112f1575f5ffd5b506112fa610cea565b825161130581610d81565b8152602083015161131581610d81565b6020820152604083015161132881610d81565b6040820152606083015161133b81610d81565b606082015261134c608084016111ab565b608082015261135d60a084016111ab565b60a082015261136e60c084016111ab565b60c08201529392505050565b6001600160a01b038781168252865181166020808401919091528701518116604080840191909152870151811660608084019190915287015181166080808401919091528701511660a0828101919091528601515f906113e560c08401826001600160a01b03169052565b5060c08701516001600160a01b03811660e0840152508561010083015284610120830152610180610140830152611420610180830185610f2f565b905082610160830152979650505050505050565b5f60408284031215611444575f5ffd5b61144c610cc8565b9050815161145981610d81565b815260208201516001600160401b03811115611473575f5ffd5b8201601f81018413611483575f5ffd5b8051611491610e8c82610da3565b8181528560208385010111156114a5575f5ffd5b8160208401602083015e5f6020838301015280602085015250505092915050565b5f82601f8301126114d5575f5ffd5b81516114e3610e8c826111f7565b8082825260208201915060208360071b860101925085831115611504575f5ffd5b602085015b8381101561156e5760808188031215611520575f5ffd5b611528610d0c565b815161153381610d81565b81526115416020830161115e565b60208281019190915260408381015190830152606080840151908301529084529290920191608001611509565b5095945050505050565b5f60208284031215611588575f5ffd5b81516001600160401b0381111561159d575f5ffd5b820161018081850312156115af575f5ffd5b6115b7610d2e565b815181526115c7602083016111ab565b602082015260408201516001600160401b038111156115e4575f5ffd5b6115f086828501611434565b604083015250606082810151908201526080808301519082015260a08201516001600160401b03811115611622575f5ffd5b61162e868285016114c6565b60a08301525060c0828101519082015261164a60e083016111d1565b60e082015261165c610100830161115e565b61010082015261166f610120830161115e565b61012082015261168261014083016111ab565b61014082015261169561016083016111ab565b61016082015294935050505056fe60806040526007805460ff19908116909155600980549091169055348015610025575f5ffd5b50604051612612380380612612833981016040819052610044916102d7565b600980546001600160a01b0388811661010002610100600160a81b0319909216919091179091558551600c80549183166001600160a01b03199283161790556020870151600d80549184169183169190911790556040870151600e80549184169183169190911790556060870151600f805491841691831691909117905560808701516010805491841691831691909117905560a08701516011805491841691831691909117905560c08701516012805491909316911617905560028490556003805460ff191690558585855f86603c81106101205780610123565b603c5b60045550506005805460ff19169055505042600655508151601380546001600160a01b0319166001600160a01b03909216919091178155602083015183919060149061016f908261045e565b505050601555506105189350505050565b80516001600160a01b0381168114610196575f5ffd5b919050565b634e487b7160e01b5f52604160045260245ffd5b604080519081016001600160401b03811182821017156101d1576101d161019b565b60405290565b60405160e081016001600160401b03811182821017156101d1576101d161019b565b604051601f8201601f191681016001600160401b03811182821017156102215761022161019b565b604052919050565b5f60408284031215610239575f5ffd5b6102416101af565b905061024c82610180565b815260208201516001600160401b03811115610266575f5ffd5b8201601f81018413610276575f5ffd5b80516001600160401b0381111561028f5761028f61019b565b6102a2601f8201601f19166020016101f9565b8181528560208385010111156102b6575f5ffd5b8160208401602083015e5f6020838301015280602085015250505092915050565b5f5f5f5f5f5f8688036101808112156102ee575f5ffd5b6102f788610180565b965060e0601f198201121561030a575f5ffd5b506103136101d7565b61031f60208901610180565b815261032d60408901610180565b602082015261033e60608901610180565b604082015261034f60808901610180565b606082015261036060a08901610180565b608082015261037160c08901610180565b60a082015261038260e08901610180565b60c08201526101008801516101208901516101408a015192975090955093506001600160401b038111156103b4575f5ffd5b6103c089828a01610229565b9250505f6101608801519050809150509295509295509295565b600181811c908216806103ee57607f821691505b60208210810361040c57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561045957805f5260205f20601f840160051c810160208510156104375750805b601f840160051c820191505b81811015610456575f8155600101610443565b50505b505050565b81516001600160401b038111156104775761047761019b565b61048b8161048584546103da565b84610412565b6020601f8211600181146104bd575f83156104a65750848201515b5f19600385901b1c1916600184901b178455610456565b5f84815260208120601f198516915b828110156104ec57878501518255602094850194600190920191016104cc565b508482101561050957868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b6120ed806105255f395ff3fe608060405234801561000f575f5ffd5b5060043610610127575f3560e01c806383d948b7116100a9578063b46a357f1161006e578063b46a357f14610272578063b80777ea14610287578063ccbac9f514610290578063d6bfea2814610299578063ef2d8700146102ac575f5ffd5b806383d948b7146102105780638da5cb5b1461021d578063a0f44c921461024d578063af640d0f14610256578063b377a8541461025f575f5ffd5b8063200d2ed2116100ef578063200d2ed2146101a157806331393ca6146101bb578063348edff7146101d0578063351d9f96146101e3578063633dfc70146101fd575f5ffd5b8063024848951461012b5780630b3af7f91461014d5780630dc96015146101625780630f792235146101775780630fb5a6b41461018a575b5f5ffd5b6007546101389060ff1681565b60405190151581526020015b60405180910390f35b61016061015b366004611088565b6102c1565b005b61016a6103af565b60405161014491906110e0565b61016061018536600461113c565b6104d2565b61019360045481565b604051908152602001610144565b6005546101ae9060ff1681565b604051610144919061117d565b6101c361050f565b604051610144919061122d565b6101606101de3660046113eb565b6106d8565b6003546101f09060ff1681565b6040516101449190611492565b61016061020b3660046114ac565b610779565b6009546101389060ff1681565b6009546102359061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610144565b61019360155481565b61019360025481565b61016061026d3660046114e1565b610953565b61027a610ad8565b60405161014491906114fc565b61019360065481565b61019360085481565b6101606102a736600461150e565b610b9d565b6102b4610bcc565b6040516101449190611525565b600c546001600160a01b031633148015906102e75750600d546001600160a01b03163314155b80156102fe57506011546001600160a01b03163314155b801561031557506010546001600160a01b03163314155b8015610331575060095461010090046001600160a01b03163314155b1561034e57604051621607ef60ea1b815260040160405180910390fd5b6005805482919060ff1916600183600481111561036d5761036d611155565b02179055506002547f2da7b23ca63c1eb969eee5fae4acb98186abecf5358b0354a82a5183ebca6b2a826040516103a4919061117d565b60405180910390a250565b600a546060905f906001600160401b038111156103ce576103ce61132d565b60405190808252806020026020018201604052801561041e57816020015b604080516080810182525f8082526020808301829052928201819052606082015282525f199092019101816103ec5790505b5090505f5b600a548110156104cc57600b5f600a8381548110610443576104436115f6565b5f918252602080832091909101546001600160a01b039081168452838201949094526040928301909120825160808101845281549485168152600160a01b90940460ff1615159184019190915260018101549183019190915260020154606082015282518390839081106104b9576104b96115f6565b6020908102919091010152600101610423565b50919050565b600d546001600160a01b031633146104fc57604051621607ef60ea1b815260040160405180910390fd5b6007805460ff1916911515919091179055565b610517610ff9565b600e5460408051610180810182526002548152601380546001600160a01b039081166020808501829052855180870187529182526014805493909716969495860194919392908401919061056a9061160a565b80601f01602080910402602001604051908101604052809291908181526020018280546105969061160a565b80156105e15780601f106105b8576101008083540402835291602001916105e1565b820191905f5260205f20905b8154815290600101906020018083116105c457829003601f168201915b5050505050815250508152602001826001600160a01b031663d3d1ff306015546040518263ffffffff1660e01b815260040161061f91815260200190565b602060405180830381865afa15801561063a573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061065e919061163c565b815260200160155481526020016106736103af565b815260048054602083015260055460409092019160ff169081111561069a5761069a611155565b815260075460ff908116151560208301526009549081161515604083015261010090046001600160a01b031660608201523060809091015292915050565b600c546001600160a01b031633148015906106fe5750600d546001600160a01b03163314155b801561071557506011546001600160a01b03163314155b801561072c57506010546001600160a01b03163314155b8015610748575060095461010090046001600160a01b03163314155b1561076557604051621607ef60ea1b815260040160405180910390fd5b6107728585858585610f01565b5050505050565b600c546001600160a01b0316331480159061079f5750600d546001600160a01b03163314155b80156107b657506011546001600160a01b03163314155b80156107cd57506010546001600160a01b03163314155b156107ea57604051621607ef60ea1b815260040160405180910390fd5b60095460ff1661080d57604051633fd0090160e11b815260040160405180910390fd5b6004544211156108305760405163335b65a560e11b815260040160405180910390fd5b600280546001600160a01b0383165f908152600b60205260409020909101541461089f57600a80546001810182555f919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80180546001600160a01b0319166001600160a01b0383161790555b604080516080810182526001600160a01b0383811680835285151560208085018281524286880190815260028054606089019081525f878152600b86528a90209851895494511515600160a01b026001600160a81b0319909516981697909717929092178755516001870155935194840194909455915484519182529281019190915290917f5aaa9aad7433112662b9e5ae23b96ed62b00035f413ab908c55607284e0804e2910160405180910390a25050565b600c546001600160a01b031633148015906109795750600d546001600160a01b03163314155b801561099057506011546001600160a01b03163314155b80156109a757506010546001600160a01b03163314155b156109c457604051621607ef60ea1b815260040160405180910390fd5b6009546001600160a01b038281166101009092041614610a2b5760405162461bcd60e51b815260206004820152601b60248201527f4f6e6c79206f776e65722063616e20737461727420766f74696e67000000000060448201526064015b60405180910390fd5b60095460ff1615610a775760405162461bcd60e51b8152602060048201526016602482015275159bdd1a5b99c8185b1c9958591e481cdd185c9d195960521b6044820152606401610a22565b6009805460ff19166001179055600480544291905f90610a98908490611667565b90915550506005805460ff191660011790556002546040517fcf33babc496bb6dc2942b39cb7b75766bbbadf7da50d176ff8c513e991140239905f90a250565b604080518082019091525f81526060602082015260408051808201909152601380546001600160a01b0316825260148054602084019190610b189061160a565b80601f0160208091040260200160405190810160405280929190818152602001828054610b449061160a565b8015610b8f5780601f10610b6657610100808354040283529160200191610b8f565b820191905f5260205f20905b815481529060010190602001808311610b7257829003601f168201915b505050505081525050905090565b600d546001600160a01b03163314610bc757604051621607ef60ea1b815260040160405180910390fd5b600855565b6001546060905f906001600160401b03811115610beb57610beb61132d565b604051908082528060200260200182016040528015610c6457816020015b610c516040518060c0016040528060608152602001606081526020015f8152602001606081526020015f6001600160a01b031681526020015f6001600160a01b031681525090565b815260200190600190039081610c095790505b5090505f5b81518110156104cc575f5f60018381548110610c8757610c876115f6565b905f5260205f2001604051610c9c919061167a565b908152604080519182900360200182205460c0830180835263129e754360e21b905290516001600160a01b03909116925081908390634a79d50c9060c4808501915f918187030181865afa158015610cf6573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610d1d9190810190611721565b8152602001826001600160a01b0316635600f04f6040518163ffffffff1660e01b81526004015f60405180830381865afa158015610d5d573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610d849190810190611721565b8152602001826001600160a01b03166310c83e536040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dc5573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610de9919061163c565b8152602001826001600160a01b03166351ff48476040518163ffffffff1660e01b81526004015f60405180830381865afa158015610e29573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610e509190810190611721565b8152602001826001600160a01b031663238ac9336040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e91573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610eb59190611765565b6001600160a01b03168152602001826001600160a01b0316815250838381518110610ee257610ee26115f6565b60200260200101819052508180610ef890611780565b92505050610c69565b60405183905f908190610f15908490611798565b908152604051908190036020019020546001600160a01b031614610f37575f5ffd5b5f30878486888a604051610f4a9061107b565b610f59969594939291906117ae565b604051809103905ff080158015610f72573d5f5f3e3d5ffd5b506001805480820182555f919091529091507fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601610fb0868261185b565b50805f83604051610fc19190611798565b90815260405190819003602001902080546001600160a01b03929092166001600160a01b031990921691909117905550505050505050565b60408051610180810182525f808252602082015290810161102a604080518082019091525f81526060602082015290565b81526020015f81526020015f8152602001606081526020015f81526020015f600481111561105a5761105a611155565b81525f60208201819052604082018190526060820181905260809091015290565b6107a28061191683390190565b5f60208284031215611098575f5ffd5b8135600581106110a6575f5ffd5b9392505050565b80516001600160a01b03168252602080820151151590830152604080820151908301526060908101519082015260800190565b602080825282518282018190525f918401906040840190835b8181101561111d5761110c8385516110ad565b6020949094019392506001016110f9565b509095945050505050565b80358015158114611137575f5ffd5b919050565b5f6020828403121561114c575f5ffd5b6110a682611128565b634e487b7160e01b5f52602160045260245ffd5b6005811061117957611179611155565b9052565b6020810161118b8284611169565b92915050565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b60018060a01b0381511682525f6020820151604060208501526111e56040850182611191565b949350505050565b5f8151808452602084019350602083015f5b82811015611223576112128683516110ad565b9550602091909101906001016111ff565b5093949350505050565b60208152815160208201525f602083015161125360408401826001600160a01b03169052565b506040830151610180606084015261126f6101a08401826111bf565b905060608401516080840152608084015160a084015260a0840151601f198483030160c08501526112a082826111ed565b91505060c084015160e084015260e08401516112c0610100850182611169565b5061010084015180151561012085015250610120840151801515610140850152506101408401516001600160a01b038116610160850152506101608401516001600160a01b038116610180850152509392505050565b6001600160a01b038116811461132a575f5ffd5b50565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b03811182821017156113695761136961132d565b604052919050565b5f6001600160401b038211156113895761138961132d565b50601f01601f191660200190565b5f82601f8301126113a6575f5ffd5b8135602083015f6113be6113b984611371565b611341565b90508281528583830111156113d1575f5ffd5b828260208301375f92810160200192909252509392505050565b5f5f5f5f5f60a086880312156113ff575f5ffd5b853561140a81611316565b945060208601356001600160401b03811115611424575f5ffd5b61143088828901611397565b94505060408601356001600160401b0381111561144b575f5ffd5b61145788828901611397565b9350506060860135915060808601356001600160401b03811115611479575f5ffd5b61148588828901611397565b9150509295509295909350565b60208101600483106114a6576114a6611155565b91905290565b5f5f604083850312156114bd575f5ffd5b6114c683611128565b915060208301356114d681611316565b809150509250929050565b5f602082840312156114f1575f5ffd5b81356110a681611316565b602081525f6110a660208301846111bf565b5f6020828403121561151e575f5ffd5b5035919050565b5f602082016020835280845180835260408501915060408160051b8601019250602086015f5b828110156115ea57603f198786030184528151805160c0875261157160c0880182611191565b90506020820151878203602089015261158a8282611191565b91505060408201516040880152606082015187820360608901526115ae8282611191565b6080848101516001600160a01b03908116918b019190915260a0948501511693909801929092525050602093840193919091019060010161154b565b50929695505050505050565b634e487b7160e01b5f52603260045260245ffd5b600181811c9082168061161e57607f821691505b6020821081036104cc57634e487b7160e01b5f52602260045260245ffd5b5f6020828403121561164c575f5ffd5b5051919050565b634e487b7160e01b5f52601160045260245ffd5b8082018082111561118b5761118b611653565b5f5f83546116878161160a565b60018216801561169e57600181146116b3576116e0565b60ff19831686528115158202860193506116e0565b865f5260205f205f5b838110156116d8578154888201526001909101906020016116bc565b505081860193505b509195945050505050565b5f6116f86113b984611371565b905082815283838301111561170b575f5ffd5b8282602083015e5f602084830101529392505050565b5f60208284031215611731575f5ffd5b81516001600160401b03811115611746575f5ffd5b8201601f81018413611756575f5ffd5b6111e5848251602084016116eb565b5f60208284031215611775575f5ffd5b81516110a681611316565b5f6001820161179157611791611653565b5060010190565b5f82518060208501845e5f920191825250919050565b6001600160a01b0387811682528616602082015260c0604082018190525f906117d990830187611191565b85606084015282810360808401526117f18186611191565b905082810360a08401526118058185611191565b9998505050505050505050565b601f82111561185657805f5260205f20601f840160051c810160208510156118375750805b601f840160051c820191505b81811015610772575f8155600101611843565b505050565b81516001600160401b038111156118745761187461132d565b61188881611882845461160a565b84611812565b6020601f8211600181146118ba575f83156118a35750848201515b5f19600385901b1c1916600184901b178455610772565b5f84815260208120601f198516915b828110156118e957878501518255602094850194600190920191016118c9565b508482101561190657868401515f19600387901b60f8161c191681555b50505050600190811b0190555056fe608060405234801561000f575f5ffd5b506040516107a23803806107a283398101604081905261002e91610326565b5f6100398282610476565b5060016100468382610476565b50600283905560036100588582610476565b50600480546001600160a01b038088166001600160a01b0319928316179092556005805492891692909116919091179055426006556002546040515f916100cd916020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b60408051601f19818403018152919052805160209091012090505f80806100f48489610156565b919450925090505f82600381111561010e5761010e610530565b14158061012957506004546001600160a01b03848116911614155b1561014757604051638baa579f60e01b815260040160405180910390fd5b50505050505050505050610544565b5f5f5f835160410361018d576020840151604085015160608601515f1a61017f8882858561019f565b955095509550505050610198565b505081515f91506002905b9250925092565b5f80806fa2a8918ca85bafe22016d0b997e4df60600160ff1b038411156101ce57505f91506003905082610253565b604080515f808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa15801561021f573d5f5f3e3d5ffd5b5050604051601f1901519150506001600160a01b03811661024a57505f925060019150829050610253565b92505f91508190505b9450945094915050565b80516001600160a01b0381168114610273575f5ffd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f806001600160401b038411156102a5576102a5610278565b50604051601f19601f85018116603f011681018181106001600160401b03821117156102d3576102d3610278565b6040528381529050808284018510156102ea575f5ffd5b8383602083015e5f60208583010152509392505050565b5f82601f830112610310575f5ffd5b61031f8383516020850161028c565b9392505050565b5f5f5f5f5f5f60c0878903121561033b575f5ffd5b6103448761025d565b95506103526020880161025d565b60408801519095506001600160401b0381111561036d575f5ffd5b8701601f8101891361037d575f5ffd5b61038c8982516020840161028c565b606089015160808a0151919650945090506001600160401b038111156103b0575f5ffd5b6103bc89828a01610301565b60a089015190935090506001600160401b038111156103d9575f5ffd5b6103e589828a01610301565b9150509295509295509295565b600181811c9082168061040657607f821691505b60208210810361042457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561047157805f5260205f20601f840160051c8101602085101561044f5750805b601f840160051c820191505b8181101561046e575f815560010161045b565b50505b505050565b81516001600160401b0381111561048f5761048f610278565b6104a38161049d84546103f2565b8461042a565b6020601f8211600181146104d5575f83156104be5750848201515b5f19600385901b1c1916600184901b17845561046e565b5f84815260208120601f198516915b8281101561050457878501518255602094850194600190920191016104e4565b508482101561052157868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b634e487b7160e01b5f52602160045260245ffd5b610251806105515f395ff3fe608060405234801561000f575f5ffd5b506004361061006b575f3560e01c806310c83e531461006f578063238ac9331461008b5780634a79d50c146100b657806351ff4847146100cb5780635600f04f146100d3578063b80777ea146100db578063ca973727146100e4575b5f5ffd5b61007860025481565b6040519081526020015b60405180910390f35b60045461009e906001600160a01b031681565b6040516001600160a01b039091168152602001610082565b6100be6100f7565b60405161008291906101ca565b6100be610182565b6100be61018f565b61007860065481565b60055461009e906001600160a01b031681565b5f8054610103906101e3565b80601f016020809104026020016040519081016040528092919081815260200182805461012f906101e3565b801561017a5780601f106101515761010080835404028352916020019161017a565b820191905f5260205f20905b81548152906001019060200180831161015d57829003601f168201915b505050505081565b60038054610103906101e3565b60018054610103906101e3565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b602081525f6101dc602083018461019c565b9392505050565b600181811c908216806101f757607f821691505b60208210810361021557634e487b7160e01b5f52602260045260245ffd5b5091905056fea2646970667358221220a3e9add27624d51009de2e60b86a504f5d5d5f75955e7f0b19b764bcaddf665a64736f6c634300081c0033a264697066735822122058acee336ab62212681b6b7d345842e711aa6d543f2cadfa49a2fd67a390eae064736f6c634300081c0033a26469706673582212207918f17a4752d36e5407db49845f77d376464e9f80bf3efd5d8f343b1dbd0ac764736f6c634300081c0033";

type MembershipManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MembershipManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MembershipManager__factory extends ContractFactory {
  constructor(...args: MembershipManagerConstructorParams) {
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
      MembershipManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MembershipManager__factory {
    return super.connect(runner) as MembershipManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MembershipManagerInterface {
    return new Interface(_abi) as MembershipManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MembershipManager {
    return new Contract(address, _abi, runner) as unknown as MembershipManager;
  }
}
