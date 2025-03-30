import { ethers } from 'ethers';
import { ContractAddressesViewModel } from './cybercom.store.contract_addresses';
import {
    CybercomDAO
} from './typechain';
declare global {
    interface Window {
        ethereum?: ethers.Eip1193Provider;
    }
    declare namespace NodeJS {
        interface ProcessEnv {
            VITE_CHAINLINK_VRF_SUBSCRIPTION_ID: string;
            VITE_CYBERCOM_DAO_CONTRACT?: string;
        }
    }
    interface ContractModel {
        contract: CybercomDAO | undefined;
        contractAddresses: ContractAddressesViewModel;
        provider: ethers.BrowserProvider | undefined;
        signer: ethers.JsonRpcSigner | undefined;
    }
}
export { };