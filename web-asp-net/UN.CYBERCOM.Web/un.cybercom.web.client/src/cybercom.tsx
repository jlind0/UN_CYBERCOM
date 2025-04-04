import { CybercomStore } from './cybercom.store';
import { CybercomStoreParameter } from './cybercom.views.common';
import { observer } from 'mobx-react-lite';
import { MembershipProposalsView, AddMemberProposalView } from './cybercom.views.membership';
import { CButton, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { VotingParametersView } from './cybercom.views.voting';
import { NationsView, CouncilsView } from './cybercom.views.council';
const cybercomStore = new CybercomStore();

const DisconnectedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <CButton color="primary" onClick={() => store.handleSetupProvider()} disabled={store.connecting}>
            {store.connecting ? 'Connecting Wallet...' : 'Connect Wallet'}
        </CButton>
    </div>
));

const ContractLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <p>Contract Address: {store.cybercomContract}</p>
        <CButton color="primary" onClick={() => store.handleLoadContract()} disabled={store.isLoading}>
            {store.isLoading ? 'Loading contract...' : 'Load Contract'}
        </CButton>
        {store.contract && (
            <div>
                <AddMemberProposalView addStore={store.addMembershipProposal}/>
                <CTabs activeItemKey="addresses">
                    <CTabList variant="tabs">
                        <CTab itemKey="addresses">Addresses</CTab>
                        <CTab itemKey="councils">Councils</CTab>
                        <CTab itemKey="nations">Nations</CTab>
                        <CTab itemKey="voting_parameters">Voting Parameters</CTab>
                        <CTab itemKey="membershipProposals">Membership Proposals</CTab>
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-3" itemKey="addresses">
                            <p>Voting: {store.contractAddresses.votingAddress}</p>
                            <p>Voting Parameters: {store.contractAddresses.votingParametersManagerAddress}</p>
                            <p>Council Management: {store.contractAddresses.councilManagementAddress}</p>
                            <p>Membership Manager: {store.contractAddresses.membershipManagerAddress}</p>
                            <p>Membership Removal: {store.contractAddresses.membershipRemovalAddress}</p>
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="voting_parameters">
                            <VotingParametersView store={store} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="nations">
                            <NationsView store={store} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="councils">
                            <CouncilsView store={store} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="membershipProposals">
                            <MembershipProposalsView store={store} />
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
        )}
    </div>
));


const ContractNotLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <CButton color="primary" onClick={() => store.handleDeployContract()} disabled={store.deploying}>
            {store.deploying ? 'Deploying Contract...' : 'Deploy Contract'}
        </CButton>
        <p>{store.activity}</p>
    </div>
));

const ConnectedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <h2>Connected to the blockchain!</h2>
        <p>Wallet Address: {store.signer ? store.signer.address : 'Error Loading Signer'}</p>
        {store.cybercomContract ? (
            <ContractLoadedView store={store} />
        ) : (
            <ContractNotLoadedView store={store} />
        )}
    </div>
));

const Cybercom = observer(() => {
    const store = cybercomStore;

    return (
        <>
            <title>UNofficial CYBERCOM Portal</title>
            <div>
                {store.isConnected && store.signer ? (
                    <ConnectedView store={store} />
                ) : (
                    <DisconnectedView store={store} />
                )}
            </div>
        </>
    );
});

export default Cybercom;
