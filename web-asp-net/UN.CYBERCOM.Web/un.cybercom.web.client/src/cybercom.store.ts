import { makeAutoObservable, runInAction} from 'mobx';
import { ethers } from 'ethers';
import { VotingParametersViewModel } from './cybercom.store.voting_parameters';
import { ContractAddressesViewModel } from './cybercom.store.contract_addresses';
import { CouncilViewModel, NationViewModel, CouncilsViewModel } from './cybercom.store.council';
import { AddMemberStore } from './cybercom.store.membership.add';
import { RemoveMemberStore, MembershipRemovalsViewModel } from './cybercom.store.membership.remove';
import { MembershipProposalsViewModel } from './cybercom.store.membership';
import {
    CybercomDAO__factory,
    CybercomDAO,
    CouncilManager__factory,
    ProposalStorageManager__factory,
    Voting__factory,
    MembershipRemovalManager__factory,
    MembershipManager__factory,
    VotingParametersManager__factory
} from './typechain';

const subscriptionId : string = import.meta.env.VITE_CHAINLINK_VRF_SUBSCRIPTION_ID;

export class CybercomStore implements ContractModel {
    deploying: boolean = false;
    connecting: boolean = false;
    isConnected: boolean = false;
    isLoading: boolean = false;
    contract: CybercomDAO | undefined = undefined;
    contractAddresses: ContractAddressesViewModel = new ContractAddressesViewModel();
    provider: ethers.BrowserProvider | undefined = undefined;
    signer: ethers.JsonRpcSigner | undefined = undefined;
    activity: string = '';
    cybercomContract: string | undefined = import.meta.env.VITE_CYBERCOM_DAO_CONTRACT;
    votingParameters: VotingParametersViewModel[] = [];
    councils: CouncilsViewModel = new CouncilsViewModel();
    nations: NationViewModel[] = [];
    addMembershipProposal: AddMemberStore
    membershipProposals: MembershipProposalsViewModel;
    removeMemberStore: RemoveMemberStore;
    removeMemberships: MembershipRemovalsViewModel;
    constructor() {
        this.addMembershipProposal = new AddMemberStore(this, this.councils);
        this.membershipProposals = new MembershipProposalsViewModel(this, this.councils);
        this.removeMemberStore = new RemoveMemberStore(this, this.councils);
        this.removeMemberships = new MembershipRemovalsViewModel(this, this.councils);
        makeAutoObservable(this);
    }

    async deployContract(subscription_id: ethers.BigNumberish): Promise<string | undefined> {
        if (!this.provider || !this.signer) return;
        this.activity = 'Deploying main contract';
        const factory = new CybercomDAO__factory(this.signer);
        const contract = await factory.deploy(subscription_id);
        await contract.waitForDeployment();
        const code = await contract.getDeployedCode();
        if (!code) return;

        this.activity = 'Deploying Council Manager Contract';
        const address = await contract.getAddress();
        const councilManagerFactory = new CouncilManager__factory(this.signer);
        const ct = await councilManagerFactory.deploy(address);
        await ct.waitForDeployment();
        const ctCode = await ct.getDeployedCode();
        if (!ctCode) return;

        this.activity = 'Deploying Proposal Storage Contract';
        const ctAddress = await ct.getAddress();
        const propStorContact = new ProposalStorageManager__factory(this.signer);
        const pCt = await propStorContact.deploy(address);
        await pCt.waitForDeployment();
        const pCtCode = await pCt.getDeployedCode();
        if (!pCtCode) return;

        this.activity = 'Deploying Voting Contract';
        const pCtAddress = await pCt.getAddress();
        const vsContract = new Voting__factory(this.signer);
        const vs = await vsContract.deploy(subscriptionId, address, ctAddress);
        await vs.waitForDeployment();
        const vsCode = await vs.getDeployedCode();
        if (!vsCode) return;

        this.activity = 'Deploying Membership Removal Contract';
        const vsAddress = await vs.getAddress();
        const memRemovalFactory = new MembershipRemovalManager__factory(this.signer);
        const memRemoval = await memRemovalFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await memRemoval.waitForDeployment();
        const memRemovalCode = await memRemoval.getDeployedCode();
        if (!memRemovalCode) return;

        this.activity = 'Deploying Membership Management Contract';
        const memRemovalAddress = await memRemoval.getAddress();
        const memManContractFactory = new MembershipManager__factory(this.signer);
        const memMan = await memManContractFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await memMan.waitForDeployment();
        const memManCode = await memMan.getDeployedCode();
        if (!memManCode) return;

        this.activity = 'Deploying Voting Parameter Contract';
        const memManAddress = await memMan.getAddress();
        const votParmFactory = new VotingParametersManager__factory(this.signer);
        const votParm = await votParmFactory.deploy(vsAddress, ctAddress, pCtAddress, address);
        await votParm.waitForDeployment();
        const votParmCode = await votParm.getDeployedCode();
        if (!votParmCode) return;

        this.activity = 'Initializing Cybercom Contract';
        const votParAddress = await votParm.getAddress();
        const initResp = await contract.initialize({
            daoAddress: address,
            votingAddress: vsAddress,
            votingParametersManagerAddress: votParAddress,
            proposalStorageAddress: pCtAddress,
            membershipManagerAddress: memManAddress,
            membershipRemovalAddress: memRemovalAddress,
            councilManagementAddress: ctAddress,
        });
        await initResp.wait();
        const closeResp = await contract.closeInitialization();
        this.activity = 'Finalizing Cybercom Contract';
        await closeResp.wait();
        console.log('Contract deployed at:', address);
        return address;
    }

    async handleSetupProvider() {
        try {
            this.connecting = true;
            if (window.ethereum) {
                const prov = new ethers.BrowserProvider(window.ethereum);
                await prov.send("eth_requestAccounts", []);
                const sig = await prov.getSigner(0);
                runInAction(() => {
                    this.provider = prov;
                    this.signer = sig;
                });
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0xaa36a7' }],
                    });
                } catch (switchError) {
                    console.error("Error switching to the Sepolia network", switchError);
                }
                runInAction(() => {
                    this.isConnected = !!sig;
                });
            }
        } finally {
            runInAction(() => {
                this.connecting = false;
            });
        }
    }

    async handleDeployContract() {
        try {
            this.deploying = true;
            const deployedAddress = await this.deployContract(subscriptionId);
            runInAction(() => {
                this.cybercomContract = deployedAddress;
            });
        } finally {
            runInAction(() => {
                this.deploying = false;
            });
        }
    }

    async handleLoadContract() {
        try {
            this.isLoading = true;
            if (!this.signer || !this.cybercomContract) return;
            const cybercom = CybercomDAO__factory.connect(this.cybercomContract, this.signer);
            runInAction(() => {
                this.contract = cybercom;
            });
            const addresses = await cybercom.getContractAddresses();
            this.contractAddresses.updateObj(addresses);
            const councilManagementContract = CouncilManager__factory.connect(addresses.councilManagementAddress, this.signer);
            const councils = await councilManagementContract.getCouncils();
            runInAction(() => {
                this.votingParameters.length = 0;
                const cvms: CouncilViewModel[] = [];
                this.nations.length = 0;
                councils.forEach((c) => {
                    const vp = new VotingParametersViewModel();
                    vp.updateObj(c.name, c.votingParameters);
                    this.votingParameters.push(vp);
                    const cvm = new CouncilViewModel();
                    cvm.updateObj(c);
                    cvm.groups.forEach((g) => {
                        g.nations.forEach(n => {
                            this.nations.push(n);
                        });
                    });
                    cvms.push(cvm);
                });
                this.councils.load(cvms);
            });
           
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}