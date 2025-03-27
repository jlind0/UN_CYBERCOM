import type { TuonoRouteProps } from 'tuono'
import type { JSX } from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import { CybercomDAO__factory } from '../typechain';

interface MyData {
  subscription_id: bigint;
}



//await setupProvider();

export default function CybercomPage({
  data
}: TuonoRouteProps<MyData>): JSX.Element {
  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [deploying, setDeploying] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  var provider: ethers.BrowserProvider | undefined = undefined;
  var signer: ethers.JsonRpcSigner | undefined = undefined;

const deployContract = async(subscription_id: ethers.BigNumberish): Promise<string | undefined> => {
  if (provider && signer) {
    // Deploy a new instance of the contract with the constructor argument (subscription_id)
    const factory = new CybercomDAO__factory(signer);
    const contract = await factory.deploy(subscription_id);
    // Wait until the contract is fully deployed (using ethers v6's waitForDeployment)
    await contract.waitForDeployment();
    var code = await contract.getDeployedCode();
    if(code){
      const address = await contract.getAddress();
      console.log('Contract deployed at:', address);
      return address;
    }
  }
  return undefined;
};
  const handleDeployContract = async () => {
    if (data?.subscription_id) {
      setDeploying(true);
      const address = await deployContract(data.subscription_id);
      setContractAddress(address);
      setDeploying(false);
    }
  };
  const handleSetupProvider = async () => {
    if (window.ethereum) {
      // Use the BrowserProvider from MetaMask for a signer-enabled provider
      const prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      /*var sign = await prov.getSigner(0);
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
      } catch (switchError) {
        console.error("Error switching to the Sepolia network", switchError);
        // Optionally, you can add code to prompt the user to add the Sepolia network if it isn't available.
      }
      setIsConnected(sign !== undefined);*/
    }
  };
  return (
    <div>
     
      {data?.subscription_id && isConnected &&(
        <>
          <title>{data.subscription_id.toString()}</title>
          <div>
            <p>Subscription ID: {data.subscription_id.toString()}</p>
            <button onClick={handleDeployContract} disabled={deploying}>
              {deploying ? 'Deploying...' : 'Deploy Contract'}
            </button>
            {contractAddress && (
              <p>Contract deployed at: {contractAddress}</p>
            )}
          </div>
        </>
      )}
      
      {!isConnected && (
        <>
          <title>Connect Wallet</title>
          <div>
            <button onClick={handleSetupProvider}>Connect Wallet</button>
          </div>
        </>
      )}
    </div>
  );
}
