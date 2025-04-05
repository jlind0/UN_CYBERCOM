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
  BytesLike,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Document,
  DocumentInterface,
} from "../../../contracts/Document.sol/Document";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owningContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_dochash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_url",
        type: "string",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
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
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "dochash",
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
    inputs: [],
    name: "owningContract",
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
    name: "signature",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "signer",
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
    inputs: [],
    name: "title",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "url",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f5ffd5b506040516107a23803806107a283398101604081905261002e91610326565b5f6100398282610476565b5060016100468382610476565b50600283905560036100588582610476565b50600480546001600160a01b038088166001600160a01b0319928316179092556005805492891692909116919091179055426006556002546040515f916100cd916020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b60408051601f19818403018152919052805160209091012090505f80806100f48489610156565b919450925090505f82600381111561010e5761010e610530565b14158061012957506004546001600160a01b03848116911614155b1561014757604051638baa579f60e01b815260040160405180910390fd5b50505050505050505050610544565b5f5f5f835160410361018d576020840151604085015160608601515f1a61017f8882858561019f565b955095509550505050610198565b505081515f91506002905b9250925092565b5f80806fa2a8918ca85bafe22016d0b997e4df60600160ff1b038411156101ce57505f91506003905082610253565b604080515f808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa15801561021f573d5f5f3e3d5ffd5b5050604051601f1901519150506001600160a01b03811661024a57505f925060019150829050610253565b92505f91508190505b9450945094915050565b80516001600160a01b0381168114610273575f5ffd5b919050565b634e487b7160e01b5f52604160045260245ffd5b5f806001600160401b038411156102a5576102a5610278565b50604051601f19601f85018116603f011681018181106001600160401b03821117156102d3576102d3610278565b6040528381529050808284018510156102ea575f5ffd5b8383602083015e5f60208583010152509392505050565b5f82601f830112610310575f5ffd5b61031f8383516020850161028c565b9392505050565b5f5f5f5f5f5f60c0878903121561033b575f5ffd5b6103448761025d565b95506103526020880161025d565b60408801519095506001600160401b0381111561036d575f5ffd5b8701601f8101891361037d575f5ffd5b61038c8982516020840161028c565b606089015160808a0151919650945090506001600160401b038111156103b0575f5ffd5b6103bc89828a01610301565b60a089015190935090506001600160401b038111156103d9575f5ffd5b6103e589828a01610301565b9150509295509295509295565b600181811c9082168061040657607f821691505b60208210810361042457634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561047157805f5260205f20601f840160051c8101602085101561044f5750805b601f840160051c820191505b8181101561046e575f815560010161045b565b50505b505050565b81516001600160401b0381111561048f5761048f610278565b6104a38161049d84546103f2565b8461042a565b6020601f8211600181146104d5575f83156104be5750848201515b5f19600385901b1c1916600184901b17845561046e565b5f84815260208120601f198516915b8281101561050457878501518255602094850194600190920191016104e4565b508482101561052157868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b634e487b7160e01b5f52602160045260245ffd5b610251806105515f395ff3fe608060405234801561000f575f5ffd5b506004361061006b575f3560e01c806310c83e531461006f578063238ac9331461008b5780634a79d50c146100b657806351ff4847146100cb5780635600f04f146100d3578063b80777ea146100db578063ca973727146100e4575b5f5ffd5b61007860025481565b6040519081526020015b60405180910390f35b60045461009e906001600160a01b031681565b6040516001600160a01b039091168152602001610082565b6100be6100f7565b60405161008291906101ca565b6100be610182565b6100be61018f565b61007860065481565b60055461009e906001600160a01b031681565b5f8054610103906101e3565b80601f016020809104026020016040519081016040528092919081815260200182805461012f906101e3565b801561017a5780601f106101515761010080835404028352916020019161017a565b820191905f5260205f20905b81548152906001019060200180831161015d57829003601f168201915b505050505081565b60038054610103906101e3565b60018054610103906101e3565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b602081525f6101dc602083018461019c565b9392505050565b600181811c908216806101f757607f821691505b60208210810361021557634e487b7160e01b5f52602260045260245ffd5b5091905056fea2646970667358221220a3e9add27624d51009de2e60b86a504f5d5d5f75955e7f0b19b764bcaddf665a64736f6c634300081c0033";

type DocumentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DocumentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Document__factory extends ContractFactory {
  constructor(...args: DocumentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _owningContract: AddressLike,
    _signer: AddressLike,
    _signature: BytesLike,
    _dochash: BytesLike,
    _url: string,
    _title: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _owningContract,
      _signer,
      _signature,
      _dochash,
      _url,
      _title,
      overrides || {}
    );
  }
  override deploy(
    _owningContract: AddressLike,
    _signer: AddressLike,
    _signature: BytesLike,
    _dochash: BytesLike,
    _url: string,
    _title: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _owningContract,
      _signer,
      _signature,
      _dochash,
      _url,
      _title,
      overrides || {}
    ) as Promise<
      Document & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Document__factory {
    return super.connect(runner) as Document__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DocumentInterface {
    return new Interface(_abi) as DocumentInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Document {
    return new Contract(address, _abi, runner) as unknown as Document;
  }
}
