/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Utils, UtilsInterface } from "../../contracts/Utils";

const _abi = [
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
    name: "GroupNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProposal",
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
    name: "NationDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OutstandingProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposalNotReadyForTally",
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
    inputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockLength",
        type: "uint256",
      },
    ],
    name: "getDigitBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608080604052346019576101d6908161001e823930815050f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c63eff46d8114610024575f80fd5b606036600319011261018f57602435604435600435811561014a576001925f9082805b6101345750838102908082048514901517156100a15761006691610193565b918083106100ef575f935b61007b8285610193565b8510156100b557600a810290808204600a14901517156100a15760019490940193610071565b634e487b7160e01b5f52601160045260245ffd5b90604d81116100a157600a0a9181156100db570481156100db5760209160405191068152f35b634e487b7160e01b5f52601260045260245ffd5b60405162461bcd60e51b815260206004820152601f60248201527f52657175657374656420626c6f636b206973206f7574206f662072616e6765006044820152606490fd5b600a9004915f1981146100a15785019180610047565b60405162461bcd60e51b815260206004820152601d60248201527f426c6f636b206c656e677468206d75737420626520706f7369746976650000006044820152606490fd5b5f80fd5b919082039182116100a15756fea2646970667358221220f0dd730c7a689eee4c335bac8984d046e0424d63fe797f36343c566a4f2cfb2764736f6c634300081c0033";

type UtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UtilsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Utils__factory extends ContractFactory {
  constructor(...args: UtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Utils & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Utils__factory {
    return super.connect(runner) as Utils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UtilsInterface {
    return new Interface(_abi) as UtilsInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Utils {
    return new Contract(address, _abi, runner) as unknown as Utils;
  }
}
