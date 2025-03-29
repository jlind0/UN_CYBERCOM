import React from 'react';
import { CybercomStore } from './cybercom.store';
import { observer } from 'mobx-react-lite';
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'

const cybercomStore = new CybercomStore();
interface CybercomStoreParameter {
    store: CybercomStore;
}
const DisconnectedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <button onClick={() => store.handleSetupProvider()} disabled={store.connecting}>
            {store.connecting ? 'Connecting Wallet...' : 'Connect Wallet'}
        </button>
    </div>
));
const VotingParametersView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <h3>Council Voting Parameters</h3>
        <table>
            <thead>
                <tr>
                    <th>Council Name</th>
                    <th>Randomize By Group</th>
                    <th>Randomize By Member</th>
                    <th>Output Count For Group</th>
                    <th>Output Count For Member</th>
                    <th>Vote Denominator</th>
                    <th>Vote Numerator</th>
                    <th>Sum Denominator</th>
                    <th>Sum Numerator</th>
                    <th>Average Votes</th>
                </tr>
            </thead>
            <tbody>
                {store.votingParameters.map((vp, index) => (
                    <tr key={index}>
                        <td>{vp.councilName}</td>
                        <td>{vp.randomizeByGroup?.toString()}</td>
                        <td>{vp.randomizeByMember?.toString()}</td>
                        <td>{vp.outputCountForGroup?.toString()}</td>
                        <td>{vp.outputCountForMember?.toString()}</td>
                        <td>{vp.voteDenominator?.toString()}</td>
                        <td>{vp.voteNumerator?.toString()}</td>
                        <td>{vp.sumDenominator?.toString()}</td>
                        <td>{vp.sumNumerator?.toString()}</td>
                        <td>{vp.avgVotes?.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
));
const ContractLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <p>Contract Address: {store.cybercomContract}</p>
        <button onClick={() => store.handleLoadContract()} disabled={store.isLoading}>
            {store.isLoading ? 'Loading contract...' : 'Load Contract'}
        </button>
        {store.contract && (
            <div>
                <CTabs activeItemKey="addresses">
                    <CTabList variant="tabs">
                        <CTab itemKey="addresses">Addresses</CTab>
                        <CTab itemKey="voting_parameters">Voting Parameters</CTab>
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
                    </CTabContent>
                </CTabs>
            </div>
        )}
    </div>
));

const ContractNotLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <button onClick={() => store.handleDeployContract()} disabled={store.deploying}>
            {store.deploying ? 'Deploying Contract...' : 'Deploy Contract'}
        </button>
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
