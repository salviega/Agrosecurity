/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721, ERC721Interface } from "../ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "name",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620016963803806200169683398101604081905262000034916200018a565b600062000042838262000307565b50600162000051828262000307565b505050620003d7565b634e487b7160e01b600052604160045260246000fd5b601f19601f83011681018181106001600160401b03821117156200009857620000986200005a565b6040525050565b6000620000ab60405190565b9050620000b9828262000070565b919050565b60006001600160401b03821115620000da57620000da6200005a565b601f19601f83011660200192915050565b60005b8381101562000108578181015183820152602001620000ee565b50506000910152565b6000620001286200012284620000be565b6200009f565b905082815260208101848484011115620001455762000145600080fd5b62000152848285620000eb565b509392505050565b600082601f830112620001705762000170600080fd5b81516200018284826020860162000111565b949350505050565b60008060408385031215620001a257620001a2600080fd5b82516001600160401b03811115620001bd57620001bd600080fd5b620001cb858286016200015a565b92505060208301516001600160401b03811115620001ec57620001ec600080fd5b620001fa858286016200015a565b9150509250929050565b634e487b7160e01b600052602260045260246000fd5b6002810460018216806200022f57607f821691505b60208210810362000244576200024462000204565b50919050565b60006200025b620002588381565b90565b92915050565b6200026c836200024a565b81546008840282811b60001990911b908116901990911617825550505050565b60006200029b81848462000261565b505050565b81811015620002bf57620002b66000826200028c565b600101620002a0565b5050565b601f8211156200029b576000818152602090206020601f85010481016020851015620002ec5750805b620003006020601f860104830182620002a0565b5050505050565b81516001600160401b038111156200032357620003236200005a565b6200032f82546200021a565b6200033c828285620002c3565b6020601f8311600181146200037357600084156200035a5750858201515b600019600886021c1981166002860217865550620003cf565b600085815260208120601f198616915b82811015620003a5578885015182556020948501946001909201910162000383565b86831015620003c25784890151600019601f89166008021c191682555b6001600288020188555050505b505050505050565b6112af80620003e76000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101a8578063b88d4fde146101bb578063c87b56dd146101ce578063e985e9c5146101e157600080fd5b80636352211e1461016d57806370a082311461018057806395d89b41146101a057600080fd5b806301ffc9a7146100d457806306fdde03146100fd578063081812fc14610112578063095ea7b31461013257806323b872dd1461014757806342842e0e1461015a575b600080fd5b6100e76100e2366004610ada565b6101f4565b6040516100f49190610b05565b60405180910390f35b610105610246565b6040516100f49190610b69565b610125610120366004610b8b565b6102d8565b6040516100f49190610bc6565b610145610140366004610be8565b6102ff565b005b610145610155366004610c25565b61038d565b610145610168366004610c25565b6103be565b61012561017b366004610b8b565b6103d9565b61019361018e366004610c75565b61040e565b6040516100f49190610c9c565b610105610452565b6101456101b6366004610cbd565b610461565b6101456101c9366004610de3565b610470565b6101056101dc366004610b8b565b6104a8565b6100e76101ef366004610e62565b61051c565b60006001600160e01b031982166380ac58cd60e01b148061022557506001600160e01b03198216635b5e139f60e01b145b8061024057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461025590610eab565b80601f016020809104026020016040519081016040528092919081815260200182805461028190610eab565b80156102ce5780601f106102a3576101008083540402835291602001916102ce565b820191906000526020600020905b8154815290600101906020018083116102b157829003601f168201915b5050505050905090565b60006102e38261054a565b506000908152600460205260409020546001600160a01b031690565b600061030a826103d9565b9050806001600160a01b0316836001600160a01b0316036103465760405162461bcd60e51b815260040161033d90610f18565b60405180910390fd5b336001600160a01b03821614806103625750610362813361051c565b61037e5760405162461bcd60e51b815260040161033d90610f82565b6103888383610581565b505050565b61039733826105ef565b6103b35760405162461bcd60e51b815260040161033d90610fdc565b61038883838361064e565b61038883838360405180602001604052806000815250610470565b6000818152600260205260408120546001600160a01b0316806102405760405162461bcd60e51b815260040161033d90611023565b60006001600160a01b0382166104365760405162461bcd60e51b815260040161033d90611079565b506001600160a01b031660009081526003602052604090205490565b60606001805461025590610eab565b61046c338383610776565b5050565b61047a33836105ef565b6104965760405162461bcd60e51b815260040161033d90610fdc565b6104a284848484610818565b50505050565b60606104b38261054a565b60006104ca60408051602081019091526000815290565b905060008151116104ea5760405180602001604052806000815250610515565b806104f48461084b565b6040516020016105059291906110ab565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6000818152600260205260409020546001600160a01b031661057e5760405162461bcd60e51b815260040161033d90611023565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906105b6826103d9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806105fb836103d9565b9050806001600160a01b0316846001600160a01b031614806106225750610622818561051c565b806106465750836001600160a01b031661063b846102d8565b6001600160a01b0316145b949350505050565b826001600160a01b0316610661826103d9565b6001600160a01b0316146106875760405162461bcd60e51b815260040161033d90611105565b6001600160a01b0382166106ad5760405162461bcd60e51b815260040161033d90611156565b826001600160a01b03166106c0826103d9565b6001600160a01b0316146106e65760405162461bcd60e51b815260040161033d90611105565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316036107a75760405162461bcd60e51b815260040161033d9061119a565b6001600160a01b0383811660008181526005602090815260408083209487168084529490915290819020805460ff1916851515179055517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319061080b908590610b05565b60405180910390a3505050565b61082384848461064e565b61082f848484846108df565b6104a25760405162461bcd60e51b815260040161033d906111f9565b60606000610858836109e0565b600101905060008167ffffffffffffffff81111561087857610878610cf0565b6040519080825280601f01601f1916602001820160405280156108a2576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846108ac575b509392505050565b60006001600160a01b0384163b156109d557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610923903390899088908890600401611209565b6020604051808303816000875af192505050801561095e575060408051601f3d908101601f1916820190925261095b91810190611258565b60015b6109bb573d80801561098c576040519150601f19603f3d011682016040523d82523d6000602084013e610991565b606091505b5080516000036109b35760405162461bcd60e51b815260040161033d906111f9565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610646565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610a1f5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310610a4b576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310610a6957662386f26fc10000830492506010015b6305f5e1008310610a81576305f5e100830492506008015b6127108310610a9557612710830492506004015b60648310610aa7576064830492506002015b600a83106102405760010192915050565b6001600160e01b031981165b811461057e57600080fd5b803561024081610ab8565b600060208284031215610aef57610aef600080fd5b60006106468484610acf565b8015155b82525050565b602081016102408284610afb565b60005b83811015610b2e578181015183820152602001610b16565b50506000910152565b6000610b41825190565b808452602084019350610b58818560208601610b13565b601f01601f19169290920192915050565b602080825281016105158184610b37565b80610ac4565b803561024081610b7a565b600060208284031215610ba057610ba0600080fd5b60006106468484610b80565b60006001600160a01b038216610240565b610aff81610bac565b602081016102408284610bbd565b610ac481610bac565b803561024081610bd4565b60008060408385031215610bfe57610bfe600080fd5b6000610c0a8585610bdd565b9250506020610c1b85828601610b80565b9150509250929050565b600080600060608486031215610c3d57610c3d600080fd5b6000610c498686610bdd565b9350506020610c5a86828701610bdd565b9250506040610c6b86828701610b80565b9150509250925092565b600060208284031215610c8a57610c8a600080fd5b60006106468484610bdd565b80610aff565b602081016102408284610c96565b801515610ac4565b803561024081610caa565b60008060408385031215610cd357610cd3600080fd5b6000610cdf8585610bdd565b9250506020610c1b85828601610cb2565b634e487b7160e01b600052604160045260246000fd5b601f19601f830116810181811067ffffffffffffffff82111715610d2c57610d2c610cf0565b6040525050565b6000610d3e60405190565b9050610d4a8282610d06565b919050565b600067ffffffffffffffff821115610d6957610d69610cf0565b601f19601f83011660200192915050565b82818337506000910152565b6000610d99610d9484610d4f565b610d33565b905082815260208101848484011115610db457610db4600080fd5b6108d7848285610d7a565b600082601f830112610dd357610dd3600080fd5b8135610646848260208601610d86565b60008060008060808587031215610dfc57610dfc600080fd5b6000610e088787610bdd565b9450506020610e1987828801610bdd565b9350506040610e2a87828801610b80565b925050606085013567ffffffffffffffff811115610e4a57610e4a600080fd5b610e5687828801610dbf565b91505092959194509250565b60008060408385031215610e7857610e78600080fd5b6000610e848585610bdd565b9250506020610c1b85828601610bdd565b634e487b7160e01b600052602260045260246000fd5b600281046001821680610ebf57607f821691505b602082108103610ed157610ed1610e95565b50919050565b602181526000602082017f4552433732313a20617070726f76616c20746f2063757272656e74206f776e658152603960f91b602082015291505b5060400190565b6020808252810161024081610ed7565b603d81526000602082017f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f81527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060208201529150610f11565b6020808252810161024081610f28565b602d81526000602082017f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6581526c1c881bdc88185c1c1c9bdd9959609a1b60208201529150610f11565b6020808252810161024081610f92565b601881526000602082017f4552433732313a20696e76616c696420746f6b656e2049440000000000000000815291505b5060200190565b6020808252810161024081610fec565b602981526000602082017f4552433732313a2061646472657373207a65726f206973206e6f7420612076618152683634b21037bbb732b960b91b60208201529150610f11565b6020808252810161024081611033565b6000611093825190565b6110a1818560208601610b13565b9290920192915050565b60006110b78285611089565b91506106468284611089565b602581526000602082017f4552433732313a207472616e736665722066726f6d20696e636f72726563742081526437bbb732b960d91b60208201529150610f11565b60208082528101610240816110c3565b602481526000602082017f4552433732313a207472616e7366657220746f20746865207a65726f206164648152637265737360e01b60208201529150610f11565b6020808252810161024081611115565b601981526000602082017f4552433732313a20617070726f766520746f2063616c6c6572000000000000008152915061101c565b6020808252810161024081611166565b603281526000602082017f4552433732313a207472616e7366657220746f206e6f6e20455243373231526581527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60208201529150610f11565b60208082528101610240816111aa565b608081016112178287610bbd565b6112246020830186610bbd565b6112316040830185610c96565b81810360608301526112438184610b37565b9695505050505050565b805161024081610ab8565b60006020828403121561126d5761126d600080fd5b6000610646848461124d56fea26469706673582212203c71f5c28b3b2415e826b7869eae886e4372915ebb889fd14a81cd26dd84460464736f6c63430008110033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721";
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }
  static readonly contractName: "ERC721";
  public readonly contractName: "ERC721";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
