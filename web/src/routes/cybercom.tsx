import type { TuonoRouteProps } from 'tuono'
import type { JSX } from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import { CybercomDAO__factory } from '../typechain';

interface MyData {
  subscription_id: bigint;
}

let provider: ethers.BrowserProvider | undefined;
let signer: ethers.JsonRpcSigner | undefined;

async function deployContract(subscription_id: ethers.BigNumberish): Promise<string | undefined> {
  if (provider && signer) {
    // Deploy a new instance of the contract with the constructor argument (subscription_id)
    const factory = new CybercomDAO__factory(signer);
    const contract = await factory.deploy(subscription_id);

    // Wait until the contract is fully deployed (using ethers v6's waitForDeployment)
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log('Contract deployed at:', address);
    return address;
  }
  return undefined;
}

async function setupProvider(): Promise<void> {
  if (window.ethereum && window.ethereum.request) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
    } catch (switchError) {
      console.error("Error switching to the Sepolia network", switchError);
      // Optionally, you can add code to prompt the user to add the Sepolia network if it isn't available.
    }
    // Use the BrowserProvider from MetaMask for a signer-enabled provider
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }
}

await setupProvider();

export default function CybercomPage({
  isLoading,
  data,
}: TuonoRouteProps<MyData>): JSX.Element {
  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [deploying, setDeploying] = useState<boolean>(false);

  const handleDeployContract = async () => {
    if (data?.subscription_id) {
      setDeploying(true);
      const address = await deployContract(data.subscription_id);
      setContractAddress(address);
      setDeploying(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <>
          <title>Loading...</title>
          <div>Loading...</div>
        </>
      )}

      {data?.subscription_id && (
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
    </div>
  );
}
