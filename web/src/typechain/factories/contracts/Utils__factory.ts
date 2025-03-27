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
  "0x6103b2610039600b82828239805160001a607314602c57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063eff46d811461003a575b600080fd5b61004d6100483660046101bf565b61005f565b60405190815260200160405180910390f35b600061006f565b60405180910390fd5b600082116100bf5760405162461bcd60e51b815260206004820152601d60248201527f426c6f636b206c656e677468206d75737420626520706f7369746976650000006044820152606401610066565b600160006100cc86610190565b905060006100da8587610201565b6100e49083610218565b9050848110156101365760405162461bcd60e51b815260206004820152601f60248201527f52657175657374656420626c6f636b206973206f7574206f662072616e6765006044820152606401610066565b60005b6101438683610218565b81101561015f57610155600a85610201565b9350600101610139565b50600061016d86600a610312565b90508061017a858a61033b565b610184919061034f565b98975050505050505050565b6000805b82156101b9576101a5600a8461033b565b9250806101b181610363565b915050610194565b92915050565b6000806000606084860312156101d457600080fd5b505081359360208301359350604090920135919050565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176101b9576101b96101eb565b818103818111156101b9576101b96101eb565b6001815b60018411156102665780850481111561024a5761024a6101eb565b600184161561025857908102905b60019390931c92800261022f565b935093915050565b60008261027d575060016101b9565b8161028a575060006101b9565b81600181146102a057600281146102aa576102c6565b60019150506101b9565b60ff8411156102bb576102bb6101eb565b50506001821b6101b9565b5060208310610133831016604e8410600b84101617156102e9575081810a6101b9565b6102f6600019848461022b565b806000190482111561030a5761030a6101eb565b029392505050565b600061031e838361026e565b9392505050565b634e487b7160e01b600052601260045260246000fd5b60008261034a5761034a610325565b500490565b60008261035e5761035e610325565b500690565b600060018201610375576103756101eb565b506001019056fea2646970667358221220e02aae1c0510efd4761cd6e4257903a9395081c30a591d43c424e9fe399e9a9764736f6c634300081c0033";

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
