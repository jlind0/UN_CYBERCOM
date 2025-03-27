/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace MembershipManagement {
  export type ContractAddressesStruct = {
    daoAddress: AddressLike;
    votingAddress: AddressLike;
    councilManagementAddress: AddressLike;
    proposalStorageAddress: AddressLike;
    membershipRemovalAddress: AddressLike;
    membershipManagerAddress: AddressLike;
    votingParametersManagerAddress: AddressLike;
  };

  export type ContractAddressesStructOutput = [
    daoAddress: string,
    votingAddress: string,
    councilManagementAddress: string,
    proposalStorageAddress: string,
    membershipRemovalAddress: string,
    membershipManagerAddress: string,
    votingParametersManagerAddress: string
  ] & {
    daoAddress: string;
    votingAddress: string;
    councilManagementAddress: string;
    proposalStorageAddress: string;
    membershipRemovalAddress: string;
    membershipManagerAddress: string;
    votingParametersManagerAddress: string;
  };

  export type VotingParametersStruct = {
    randomizeByGroup: boolean;
    randomizeByMember: boolean;
    outputCountForGroup: BigNumberish;
    outputCountForMember: BigNumberish;
    voteDenominator: BigNumberish;
    voteNumerator: BigNumberish;
    sumDenominator: BigNumberish;
    sumNumerator: BigNumberish;
    avgVotes: boolean;
  };

  export type VotingParametersStructOutput = [
    randomizeByGroup: boolean,
    randomizeByMember: boolean,
    outputCountForGroup: bigint,
    outputCountForMember: bigint,
    voteDenominator: bigint,
    voteNumerator: bigint,
    sumDenominator: bigint,
    sumNumerator: bigint,
    avgVotes: boolean
  ] & {
    randomizeByGroup: boolean;
    randomizeByMember: boolean;
    outputCountForGroup: bigint;
    outputCountForMember: bigint;
    voteDenominator: bigint;
    voteNumerator: bigint;
    sumDenominator: bigint;
    sumNumerator: bigint;
    avgVotes: boolean;
  };

  export type ChangeVotingParametersRoleStruct = {
    council: BytesLike;
    parameters: MembershipManagement.VotingParametersStruct;
  };

  export type ChangeVotingParametersRoleStructOutput = [
    council: string,
    parameters: MembershipManagement.VotingParametersStructOutput
  ] & {
    council: string;
    parameters: MembershipManagement.VotingParametersStructOutput;
  };

  export type ChangeVotingParametersRequestStruct = {
    parameters: MembershipManagement.ChangeVotingParametersRoleStruct[];
    duration: BigNumberish;
    owner: AddressLike;
  };

  export type ChangeVotingParametersRequestStructOutput = [
    parameters: MembershipManagement.ChangeVotingParametersRoleStructOutput[],
    duration: bigint,
    owner: string
  ] & {
    parameters: MembershipManagement.ChangeVotingParametersRoleStructOutput[];
    duration: bigint;
    owner: string;
  };

  export type NationStruct = { id: AddressLike; name: string };

  export type NationStructOutput = [id: string, name: string] & {
    id: string;
    name: string;
  };

  export type MembershipProposalRequestStruct = {
    member: AddressLike;
    newNation: MembershipManagement.NationStruct;
    groupId: BigNumberish;
    duration: BigNumberish;
    owner: AddressLike;
  };

  export type MembershipProposalRequestStructOutput = [
    member: string,
    newNation: MembershipManagement.NationStructOutput,
    groupId: bigint,
    duration: bigint,
    owner: string
  ] & {
    member: string;
    newNation: MembershipManagement.NationStructOutput;
    groupId: bigint;
    duration: bigint;
    owner: string;
  };

  export type MembershipRemovalRequestStruct = {
    nationToRemove: AddressLike;
    duration: BigNumberish;
    owner: AddressLike;
  };

  export type MembershipRemovalRequestStructOutput = [
    nationToRemove: string,
    duration: bigint,
    owner: string
  ] & { nationToRemove: string; duration: bigint; owner: string };
}

export interface CybercomDAOInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DEFAULT_ADMIN_ROLE"
      | "acceptMemberExt"
      | "closeInitialization"
      | "completeVoting"
      | "contracts"
      | "getContractAddresses"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "performVote"
      | "prepareTally"
      | "renounceRole"
      | "revokeRole"
      | "startVoting"
      | "submitChangeVotingParameters"
      | "submitMembershipProposal"
      | "submitMembershipRemovalProposal"
      | "supportsInterface"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "MemberAccepted"
      | "MemberKept"
      | "MemberRejected"
      | "MemberRemoved"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "TallyPrepared"
      | "VoteCast"
      | "VoteStarted"
      | "VotingCompleted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptMemberExt",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "closeInitialization",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "completeVoting",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "contracts", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getContractAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [MembershipManagement.ContractAddressesStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "performVote",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareTally",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "startVoting",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "submitChangeVotingParameters",
    values: [MembershipManagement.ChangeVotingParametersRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "submitMembershipProposal",
    values: [MembershipManagement.MembershipProposalRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "submitMembershipRemovalProposal",
    values: [MembershipManagement.MembershipRemovalRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptMemberExt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "closeInitialization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contracts", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getContractAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "performVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareTally",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitChangeVotingParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitMembershipProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitMembershipRemovalProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
}

export namespace MemberAcceptedEvent {
  export type InputTuple = [memberId: AddressLike];
  export type OutputTuple = [memberId: string];
  export interface OutputObject {
    memberId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MemberKeptEvent {
  export type InputTuple = [memberId: AddressLike];
  export type OutputTuple = [memberId: string];
  export interface OutputObject {
    memberId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MemberRejectedEvent {
  export type InputTuple = [memberId: AddressLike];
  export type OutputTuple = [memberId: string];
  export interface OutputObject {
    memberId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MemberRemovedEvent {
  export type InputTuple = [memberId: AddressLike];
  export type OutputTuple = [memberId: string];
  export interface OutputObject {
    memberId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TallyPreparedEvent {
  export type InputTuple = [proposalId: BigNumberish];
  export type OutputTuple = [proposalId: bigint];
  export interface OutputObject {
    proposalId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VoteCastEvent {
  export type InputTuple = [
    proposalId: BigNumberish,
    voter: AddressLike,
    vote: boolean
  ];
  export type OutputTuple = [proposalId: bigint, voter: string, vote: boolean];
  export interface OutputObject {
    proposalId: bigint;
    voter: string;
    vote: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VoteStartedEvent {
  export type InputTuple = [proposalId: BigNumberish, startedBy: AddressLike];
  export type OutputTuple = [proposalId: bigint, startedBy: string];
  export interface OutputObject {
    proposalId: bigint;
    startedBy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotingCompletedEvent {
  export type InputTuple = [proposalId: BigNumberish, status: BigNumberish];
  export type OutputTuple = [proposalId: bigint, status: bigint];
  export interface OutputObject {
    proposalId: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CybercomDAO extends BaseContract {
  connect(runner?: ContractRunner | null): CybercomDAO;
  waitForDeployment(): Promise<this>;

  interface: CybercomDAOInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  acceptMemberExt: TypedContractMethod<
    [proposalAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  closeInitialization: TypedContractMethod<[], [void], "nonpayable">;

  completeVoting: TypedContractMethod<
    [proposalId: BigNumberish],
    [void],
    "nonpayable"
  >;

  contracts: TypedContractMethod<
    [],
    [
      [string, string, string, string, string, string, string] & {
        daoAddress: string;
        votingAddress: string;
        councilManagementAddress: string;
        proposalStorageAddress: string;
        membershipRemovalAddress: string;
        membershipManagerAddress: string;
        votingParametersManagerAddress: string;
      }
    ],
    "view"
  >;

  getContractAddresses: TypedContractMethod<
    [],
    [MembershipManagement.ContractAddressesStructOutput],
    "view"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  initialize: TypedContractMethod<
    [_contracts: MembershipManagement.ContractAddressesStruct],
    [void],
    "nonpayable"
  >;

  performVote: TypedContractMethod<
    [proposalId: BigNumberish, voteCast: boolean],
    [void],
    "nonpayable"
  >;

  prepareTally: TypedContractMethod<
    [proposalId: BigNumberish],
    [void],
    "nonpayable"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  startVoting: TypedContractMethod<
    [proposalId: BigNumberish],
    [void],
    "nonpayable"
  >;

  submitChangeVotingParameters: TypedContractMethod<
    [request: MembershipManagement.ChangeVotingParametersRequestStruct],
    [string],
    "nonpayable"
  >;

  submitMembershipProposal: TypedContractMethod<
    [request: MembershipManagement.MembershipProposalRequestStruct],
    [string],
    "nonpayable"
  >;

  submitMembershipRemovalProposal: TypedContractMethod<
    [request: MembershipManagement.MembershipRemovalRequestStruct],
    [string],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptMemberExt"
  ): TypedContractMethod<[proposalAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "closeInitialization"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "completeVoting"
  ): TypedContractMethod<[proposalId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "contracts"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, string, string, string, string] & {
        daoAddress: string;
        votingAddress: string;
        councilManagementAddress: string;
        proposalStorageAddress: string;
        membershipRemovalAddress: string;
        membershipManagerAddress: string;
        votingParametersManagerAddress: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getContractAddresses"
  ): TypedContractMethod<
    [],
    [MembershipManagement.ContractAddressesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [_contracts: MembershipManagement.ContractAddressesStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "performVote"
  ): TypedContractMethod<
    [proposalId: BigNumberish, voteCast: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "prepareTally"
  ): TypedContractMethod<[proposalId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "startVoting"
  ): TypedContractMethod<[proposalId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitChangeVotingParameters"
  ): TypedContractMethod<
    [request: MembershipManagement.ChangeVotingParametersRequestStruct],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitMembershipProposal"
  ): TypedContractMethod<
    [request: MembershipManagement.MembershipProposalRequestStruct],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitMembershipRemovalProposal"
  ): TypedContractMethod<
    [request: MembershipManagement.MembershipRemovalRequestStruct],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;

  getEvent(
    key: "MemberAccepted"
  ): TypedContractEvent<
    MemberAcceptedEvent.InputTuple,
    MemberAcceptedEvent.OutputTuple,
    MemberAcceptedEvent.OutputObject
  >;
  getEvent(
    key: "MemberKept"
  ): TypedContractEvent<
    MemberKeptEvent.InputTuple,
    MemberKeptEvent.OutputTuple,
    MemberKeptEvent.OutputObject
  >;
  getEvent(
    key: "MemberRejected"
  ): TypedContractEvent<
    MemberRejectedEvent.InputTuple,
    MemberRejectedEvent.OutputTuple,
    MemberRejectedEvent.OutputObject
  >;
  getEvent(
    key: "MemberRemoved"
  ): TypedContractEvent<
    MemberRemovedEvent.InputTuple,
    MemberRemovedEvent.OutputTuple,
    MemberRemovedEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "TallyPrepared"
  ): TypedContractEvent<
    TallyPreparedEvent.InputTuple,
    TallyPreparedEvent.OutputTuple,
    TallyPreparedEvent.OutputObject
  >;
  getEvent(
    key: "VoteCast"
  ): TypedContractEvent<
    VoteCastEvent.InputTuple,
    VoteCastEvent.OutputTuple,
    VoteCastEvent.OutputObject
  >;
  getEvent(
    key: "VoteStarted"
  ): TypedContractEvent<
    VoteStartedEvent.InputTuple,
    VoteStartedEvent.OutputTuple,
    VoteStartedEvent.OutputObject
  >;
  getEvent(
    key: "VotingCompleted"
  ): TypedContractEvent<
    VotingCompletedEvent.InputTuple,
    VotingCompletedEvent.OutputTuple,
    VotingCompletedEvent.OutputObject
  >;

  filters: {
    "MemberAccepted(address)": TypedContractEvent<
      MemberAcceptedEvent.InputTuple,
      MemberAcceptedEvent.OutputTuple,
      MemberAcceptedEvent.OutputObject
    >;
    MemberAccepted: TypedContractEvent<
      MemberAcceptedEvent.InputTuple,
      MemberAcceptedEvent.OutputTuple,
      MemberAcceptedEvent.OutputObject
    >;

    "MemberKept(address)": TypedContractEvent<
      MemberKeptEvent.InputTuple,
      MemberKeptEvent.OutputTuple,
      MemberKeptEvent.OutputObject
    >;
    MemberKept: TypedContractEvent<
      MemberKeptEvent.InputTuple,
      MemberKeptEvent.OutputTuple,
      MemberKeptEvent.OutputObject
    >;

    "MemberRejected(address)": TypedContractEvent<
      MemberRejectedEvent.InputTuple,
      MemberRejectedEvent.OutputTuple,
      MemberRejectedEvent.OutputObject
    >;
    MemberRejected: TypedContractEvent<
      MemberRejectedEvent.InputTuple,
      MemberRejectedEvent.OutputTuple,
      MemberRejectedEvent.OutputObject
    >;

    "MemberRemoved(address)": TypedContractEvent<
      MemberRemovedEvent.InputTuple,
      MemberRemovedEvent.OutputTuple,
      MemberRemovedEvent.OutputObject
    >;
    MemberRemoved: TypedContractEvent<
      MemberRemovedEvent.InputTuple,
      MemberRemovedEvent.OutputTuple,
      MemberRemovedEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "TallyPrepared(uint256)": TypedContractEvent<
      TallyPreparedEvent.InputTuple,
      TallyPreparedEvent.OutputTuple,
      TallyPreparedEvent.OutputObject
    >;
    TallyPrepared: TypedContractEvent<
      TallyPreparedEvent.InputTuple,
      TallyPreparedEvent.OutputTuple,
      TallyPreparedEvent.OutputObject
    >;

    "VoteCast(uint256,address,bool)": TypedContractEvent<
      VoteCastEvent.InputTuple,
      VoteCastEvent.OutputTuple,
      VoteCastEvent.OutputObject
    >;
    VoteCast: TypedContractEvent<
      VoteCastEvent.InputTuple,
      VoteCastEvent.OutputTuple,
      VoteCastEvent.OutputObject
    >;

    "VoteStarted(uint256,address)": TypedContractEvent<
      VoteStartedEvent.InputTuple,
      VoteStartedEvent.OutputTuple,
      VoteStartedEvent.OutputObject
    >;
    VoteStarted: TypedContractEvent<
      VoteStartedEvent.InputTuple,
      VoteStartedEvent.OutputTuple,
      VoteStartedEvent.OutputObject
    >;

    "VotingCompleted(uint256,uint8)": TypedContractEvent<
      VotingCompletedEvent.InputTuple,
      VotingCompletedEvent.OutputTuple,
      VotingCompletedEvent.OutputObject
    >;
    VotingCompleted: TypedContractEvent<
      VotingCompletedEvent.InputTuple,
      VotingCompletedEvent.OutputTuple,
      VotingCompletedEvent.OutputObject
    >;
  };
}
