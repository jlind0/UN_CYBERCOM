import React from 'react';
import { CybercomStore } from './cybercom.store.ts';
import { observer } from 'mobx-react-lite';

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

const ContractLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <p>Contract Address: {store.cybercomContract}</p>
        <button onClick={() => store.handleLoadContract()} disabled={store.isLoading}>
            {store.isLoading ? 'Loading contract...' : 'Load Contract'}
        </button>
        {store.contract && (
            <div>
                <p>Voting: {store.contractAddresses.votingAddress}</p>
                <p>Voting Parameters: {store.contractAddresses.votingParametersManagerAddress}</p>
                <p>Council Management: {store.contractAddresses.councilManagementAddress}</p>
                <p>Membership Manager: {store.contractAddresses.membershipManagerAddress}</p>
                <p>Membership Removal: {store.contractAddresses.membershipRemovalAddress}</p>
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
