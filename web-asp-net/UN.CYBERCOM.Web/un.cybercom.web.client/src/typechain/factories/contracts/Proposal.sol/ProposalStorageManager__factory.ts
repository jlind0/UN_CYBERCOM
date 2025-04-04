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
  "0x608034606e57601f6107e838819003918201601f19168301916001600160401b03831184841017607257808492602094604052833981010312606e57516001600160a01b03811690819003606e575f60075560018060a01b03195f5416175f5560405161076190816100878239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c8062b9f95414610664578063013cf08b146102455780631b6f984b146106025780634445a491146105755780634c6d25f014610535578063787e0fe0146104e35780637c53abbe146104565780638e812366146103b55780639b28221f14610316578063c3a47fd814610277578063c7f758a814610245578063d6a2b21414610205578063da35c664146101e8578063f73c2c62146101315763fbe53c2f146100bd575f80fd5b3461012d57604036600319011261012d576100d66106d3565b6100de6106bd565b9060018060a01b035f5416331461011f576001600160a01b039081165f90815260026020526040902080546001600160a01b03191692909116919091179055005b621607ef60ea1b5f5260045ffd5b5f80fd5b3461012d575f36600319011261012d57604051600480548083525f91825260208301917f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b91905b8181106101c957505050819003601f01601f191681019067ffffffffffffffff8211818310176101b5576101b1829182604052826106e9565b0390f35b634e487b7160e01b5f52604160045260245ffd5b82546001600160a01b0316845260209093019260019283019201610178565b3461012d575f36600319011261012d576020600754604051908152f35b3461012d57602036600319011261012d576001600160a01b036102266106d3565b165f526002602052602060018060a01b0360405f205416604051908152f35b3461012d57602036600319011261012d576004355f526003602052602060018060a01b0360405f205416604051908152f35b3461012d575f36600319011261012d57604051600680548083525f91825260208301917ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f91905b8181106102f757505050819003601f01601f191681019067ffffffffffffffff8211818310176101b5576101b1829182604052826106e9565b82546001600160a01b03168452602090930192600192830192016102be565b3461012d575f36600319011261012d57604051600580548083525f91825260208301917f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db091905b81811061039657505050819003601f01601f191681019067ffffffffffffffff8211818310176101b5576101b1829182604052826106e9565b82546001600160a01b031684526020909301926001928301920161035d565b3461012d57602036600319011261012d576103ce6106d3565b5f546001600160a01b0316331461011f57600454600160401b8110156101b55760018101806004558110156104425760045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0180546001600160a01b0319166001600160a01b03909216919091179055005b634e487b7160e01b5f52603260045260245ffd5b3461012d57602036600319011261012d5761046f6106d3565b5f546001600160a01b0316331461011f57600654600160401b8110156101b55760018101806006558110156104425760065f527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0180546001600160a01b0319166001600160a01b03909216919091179055005b3461012d575f36600319011261012d575f546001600160a01b0316331461011f576007545f1981146105215760016020910180600755604051908152f35b634e487b7160e01b5f52601160045260245ffd5b3461012d57602036600319011261012d576001600160a01b036105566106d3565b165f526001602052602060018060a01b0360405f205416604051908152f35b3461012d57602036600319011261012d5761058e6106d3565b5f546001600160a01b0316331461011f57600554600160401b8110156101b55760018101806005558110156104425760055f527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b03909216919091179055005b3461012d57604036600319011261012d5761061b6106d3565b6106236106bd565b9060018060a01b035f5416331461011f576001600160a01b039081165f90815260016020526040902080546001600160a01b03191692909116919091179055005b3461012d57604036600319011261012d5761067d6106bd565b5f546001600160a01b0316331461011f576004355f90815260036020526040902080546001600160a01b0319166001600160a01b03909216919091179055005b602435906001600160a01b038216820361012d57565b600435906001600160a01b038216820361012d57565b60206040818301928281528451809452019201905f5b81811061070c5750505090565b82516001600160a01b03168452602093840193909201916001016106ff56fea264697066735822122055cf73fa053aa5e2ec01c543022f5ad68c358a76c6ff4af44f6ae6935a46762864736f6c634300081c0033";

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
