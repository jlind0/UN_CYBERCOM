import React from 'react';
import { CybercomStore } from './cybercom.store.ts'
import { observer } from 'mobx-react-lite';

const cybercomStore = new CybercomStore();

const Cybercom = observer(() => {
    const store = cybercomStore;

    return (
        <>
            <title>UNofficial CYBERCOM Portal</title>
            <div>
                {store.isConnected && store.signer ? (
                    <div>
                        <h2>Connected to the blockchain!</h2>
                        <p>Wallet Address: {store.signer.address}</p>
                        {store.cybercomContract ? (
                            <div>
                                <p>Contract Address: {store.cybercomContract}</p>
                                <button onClick={() => store.handleLoadContract()} disabled={store.isLoading}>
                                    {store.isLoading ? 'Loading contract...' : 'Load Contract'}
                                </button>
                                {store.contract && store.contractAddresses && (
                                    <div>
                                        <p>Voting: {store.contractAddresses.votingAddress}</p>
                                        <p>Voting Parameters: {store.contractAddresses.votingParametersManagerAddress}</p>
                                        <p>Council Management: {store.contractAddresses.councilManagementAddress}</p>
                                        <p>Membership Manager: {store.contractAddresses.membershipManagerAddress}</p>
                                        <p>Membership Removal: {store.contractAddresses.membershipRemovalAddress}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => store.handleDeployContract()} disabled={store.deploying}>
                                    {store.deploying ? 'Deploying Contract...' : 'Deploy Contract'}
                                </button>
                                <p>{store.activity}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button onClick={() => store.handleSetupProvider()} disabled={store.connecting}>
                            {store.connecting ? 'Connecting Wallet...' : 'Connect Wallet'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
});

export default Cybercom;
