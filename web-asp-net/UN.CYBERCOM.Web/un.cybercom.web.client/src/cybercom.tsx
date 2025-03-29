import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CybercomDAO__factory, CybercomDAO, CouncilManager__factory, ProposalStorageManager__factory, Voting__factory, MembershipRemovalManager__factory, MembershipManager__factory, VotingParametersManager__factory } from './typechain';
import { MembershipManagement } from './typechain/contracts/CybercomDAO'

const subscriptionId = BigInt(import.meta.env.VITE_CHAINLINK_VRF_SUBSCRIPTION_ID);
let cybercomContract = import.meta.env.VITE_CYBERCOM_DAO_CONTRACT;
function Cybercom() {

    const [deploying, setDeploying] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contract, setContract] = useState<CybercomDAO | undefined>();
    const [contractAddresses, setContractAddresses] = useState<MembershipManagement.ContractAddressesStructOutput | undefined>();
    const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>();
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>();
    const [activity, setActivity] = useState<string | undefined>();
    const deployContract = async (subscription_id: ethers.BigNumberish): Promise<string | undefined> => {
        if (!provider || !signer)
            return;
        setActivity('Deploying main contract');
        const factory = new CybercomDAO__factory(signer);
        const contract = await factory.deploy(subscription_id);
        await contract.waitForDeployment();
        const code = await contract.getDeployedCode();
        if (!code)
            return;
        setActivity('Deploying Council Manager Contract');
        const address = await contract.getAddress();
        const councilManagerFactory = new CouncilManager__factory(signer);
        const ct = await councilManagerFactory.deploy(address);
        await ct.waitForDeployment();
        const ctCode = await ct.getDeployedCode();
        if (!ctCode)
            return;
        setActivity('Deploying Proposal Storage Contract ');
        const ctAddress = await ct.getAddress();
        const propStorContact = new ProposalStorageManager__factory(signer);
        const pCt = await propStorContact.deploy(address);
        await pCt.waitForDeployment();
        const pCtCode = await pCt.getDeployedCode();
        if (!pCtCode)
            return;
        setActivity('Deploying Voting Contract');
        const pCtAddress = await pCt.getAddress();
        const vsContract = new Voting__factory(signer);
        const vs = await vsContract.deploy(subscriptionId, address, ctAddress);
        await vs.waitForDeployment();
        const vsCode = await vs.getDeployedCode();
        if (!vsCode)
            return;
        setActivity('Deploying Membership Removal Contract');
        const vsAddress = await vs.getAddress();
        const memRemovalFactory = new MembershipRemovalManager__factory(signer);
        const memRemoval = await memRemovalFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await memRemoval.waitForDeployment();
        const memRemovalCode = await memRemoval.getDeployedCode();
        if (!memRemovalCode)
            return;
        setActivity('Deploying Membership Management Contract');
        const memRemovalAddress = await memRemoval.getAddress();
        const memManContractFactory = new MembershipManager__factory(signer);
        const memMan = await memManContractFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await memMan.waitForDeployment();
        const memManCode = await memMan.getDeployedCode();

        if (!memManCode)
            return;
        setActivity('Deploying Voting Parameter Contract');

        const memManAddress = await memMan.getAddress();
        const votParmFactory = new VotingParametersManager__factory(signer);
        const votParm = await votParmFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await votParm.waitForDeployment();
        const votParmCode = await votParm.getDeployedCode();
        if (!votParmCode)
            return;
        setActivity('Initializing Cybercom Contract');
        const votParAddress = await votParm.getAddress();
        await contract.initialize({
            daoAddress: address,
            votingAddress: vsAddress,
            votingParametersManagerAddress: votParAddress,
            proposalStorageAddress: pCtAddress,
            membershipManagerAddress: memManAddress,
            membershipRemovalAddress: memRemovalAddress,
            councilManagementAddress: ctAddress
        });;
        console.log('Contract deployed at:', address);
        return address;
    };
    const handleSetupProvider = async () => {
        try {
            setConnecting(true);
            if (window.ethereum) {
                // Use the BrowserProvider from MetaMask for a signer-enabled provider
                const prov = new ethers.BrowserProvider(window.ethereum);
                await prov.send("eth_requestAccounts", []);
                const sig = await prov.getSigner(0);

                // Set the state after obtaining values
                setProvider(prov);
                setSigner(sig);
                
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0xaa36a7' }],
                    });
                } catch (switchError) {
                    console.error("Error switching to the Sepolia network", switchError);
                    // Optionally, you can add code to prompt the user to add the Sepolia network if it isn't available.
                }
                setIsConnected(sig !== undefined);
            }
        }
        finally {
            setConnecting(false);
        }
    };
    const handleDeployContract = async () => {
        try {
            setDeploying(true);
            cybercomContract = await deployContract(subscriptionId);
        }
        finally {
            setDeploying(false);
        }
    };
    const handleLoadContract = async () => {
        try {
            setIsLoading(true);
            const cybercom = CybercomDAO__factory.connect(cybercomContract, signer);
            if (cybercom !== undefined) {
                setContract(cybercom);
                setContractAddresses(await cybercom.getContractAddresses());

            }
            else {
                setContract(undefined);
                setContractAddresses(undefined);
            }
        }
        finally{
            setIsLoading(false);
        }
    };
    return (
        <>
            <title>UNofficial CYBERCOM Portal</title>
            <div>
                {isConnected && signer && (
                    <div>
                        <h2>Connected to the blockchain!</h2>
                        <p>Wallet Address : {signer.address}</p>
                        {cybercomContract && (
                            <div>
                                <p>Contract Address: {cybercomContract}</p>
                                <button onClick={handleLoadContract} disabled={isLoading}>{isLoading ? 'Loading contract...' : 'Load Contract'}</button>
                                {contract && contractAddresses && (
                                    <div>
                                        <p>Voting: {contractAddresses.votingAddress}</p>
                                        <p>Voting Parameters: {contractAddresses.votingParametersManagerAddress}</p>
                                        <p>Council Management: {contractAddresses.councilManagementAddress}</p>
                                        <p>Membership Manager: {contractAddresses.membershipManagerAddress}</p>
                                        <p>Membership Removal: {contractAddresses.membershipRemovalAddress}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {cybercomContract === undefined && (
                            <div>
                                <button onClick={handleDeployContract} disabled={deploying}>{deploying ? 'Deploying Contract...' : 'Deploy Contract'}</button>
                                <p>{activity ? activity : ''}</p>
                            </div>
                        )}
                    </div>
                )}
                {!isConnected && (
                    <div>
                        <button onClick={handleSetupProvider} disabled={connecting}>{connecting ? 'Connecting Wallet...' : 'Connect Wallet'}</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cybercom;
