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
  ProposalStorageManager,
  ProposalStorageManagerInterface,
} from "../../../contracts/Proposal.sol/ProposalStorageManager";

const _abi = [
  {
    inputs: [
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
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
    ],
    name: "addChangeParametersProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
    ],
    name: "addMembershipProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
    ],
    name: "addMembershipRemovalProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChangeParametersProposalAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
    ],
    name: "getMembershipProposal",
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
    name: "getMembershipProposalAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
    ],
    name: "getMembershipRemovalProposal",
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
    name: "getMembershipRemovalProposalAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextProposalId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "key",
        type: "uint256",
      },
    ],
    name: "getProposal",
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
    name: "proposalCount",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
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
        internalType: "address",
        name: "key",
        type: "address",
      },
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "setMembershipProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "key",
        type: "address",
      },
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "setMembershipRemovalProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "key",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "setProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526000600755348015601457600080fd5b506040516108303803806108308339810160408190526031916055565b600080546001600160a01b0319166001600160a01b03929092169190911790556083565b600060208284031215606657600080fd5b81516001600160a01b0381168114607c57600080fd5b9392505050565b61079e806100926000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638e812366116100875780638e812366146101af5780639b28221f146101c2578063c3a47fd8146101d7578063c7f758a8146101df578063d6a2b21414610208578063da35c66414610234578063f73c2c621461023d578063fbe53c2f1461024557600080fd5b8062b9f954146100d9578063013cf08b146100ee5780631b6f984b146101345780634445a491146101475780634c6d25f01461015a578063787e0fe0146101865780637c53abbe1461019c575b600080fd5b6100ec6100e7366004610664565b610258565b005b6101176100fc366004610690565b6003602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100ec6101423660046106a9565b6102b2565b6100ec6101553660046106d3565b61030c565b6101176101683660046106d3565b6001600160a01b039081166000908152600160205260409020541690565b61018e61038a565b60405190815260200161012b565b6100ec6101aa3660046106d3565b6103d0565b6100ec6101bd3660046106d3565b61044e565b6101ca6104cc565b60405161012b91906106f5565b6101ca61052e565b6101176101ed366004610690565b6000908152600360205260409020546001600160a01b031690565b6101176102163660046106d3565b6001600160a01b039081166000908152600260205260409020541690565b61018e60075481565b6101ca61058e565b6100ec6102533660046106a9565b6105ee565b600054336001600160a01b039091160361028457604051621607ef60ea1b815260040160405180910390fd5b60009182526003602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b600054336001600160a01b03909116036102de57604051621607ef60ea1b815260040160405180910390fd5b6001600160a01b03918216600090815260016020526040902080546001600160a01b03191691909216179055565b600054336001600160a01b039091160361033857604051621607ef60ea1b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b60008054336001600160a01b03909116036103b757604051621607ef60ea1b815260040160405180910390fd5b6007600081546103c690610741565b9182905550905090565b600054336001600160a01b03909116036103fc57604051621607ef60ea1b815260040160405180910390fd5b600680546001810182556000919091527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0180546001600160a01b0319166001600160a01b0392909216919091179055565b600054336001600160a01b039091160361047a57604051621607ef60ea1b815260040160405180910390fd5b600480546001810182556000919091527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0180546001600160a01b0319166001600160a01b0392909216919091179055565b6060600580548060200260200160405190810160405280929190818152602001828054801561052457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610506575b5050505050905090565b60606006805480602002602001604051908101604052809291908181526020018280548015610524576020028201919060005260206000209081546001600160a01b03168152600190910190602001808311610506575050505050905090565b60606004805480602002602001604051908101604052809291908181526020018280548015610524576020028201919060005260206000209081546001600160a01b03168152600190910190602001808311610506575050505050905090565b600054336001600160a01b039091160361061a57604051621607ef60ea1b815260040160405180910390fd5b6001600160a01b03918216600090815260026020526040902080546001600160a01b03191691909216179055565b80356001600160a01b038116811461065f57600080fd5b919050565b6000806040838503121561067757600080fd5b8235915061068760208401610648565b90509250929050565b6000602082840312156106a257600080fd5b5035919050565b600080604083850312156106bc57600080fd5b6106c583610648565b915061068760208401610648565b6000602082840312156106e557600080fd5b6106ee82610648565b9392505050565b602080825282518282018190526000918401906040840190835b818110156107365783516001600160a01b031683526020938401939092019160010161070f565b509095945050505050565b60006001820161076157634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212205d64f2a2f13fd4861480093f5197d312d5490877bae82f179f110e79ee598dd264736f6c634300081c0033";

type ProposalStorageManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProposalStorageManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProposalStorageManager__factory extends ContractFactory {
  constructor(...args: ProposalStorageManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _daoAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_daoAddress, overrides || {});
  }
  override deploy(
    _daoAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_daoAddress, overrides || {}) as Promise<
      ProposalStorageManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ProposalStorageManager__factory {
    return super.connect(runner) as ProposalStorageManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProposalStorageManagerInterface {
    return new Interface(_abi) as ProposalStorageManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ProposalStorageManager {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ProposalStorageManager;
  }
}
