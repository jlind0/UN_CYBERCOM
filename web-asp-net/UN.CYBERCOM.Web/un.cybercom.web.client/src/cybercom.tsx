import { CybercomStore, AddMemberStore } from './cybercom.store';
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormInput, CFormSelect, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'

const cybercomStore = new CybercomStore();
interface CybercomStoreParameter {
    store: CybercomStore;
}
interface AddMembershipProposalParameter {
    addStore: AddMemberStore;
}
const DisconnectedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <button onClick={() => store.handleSetupProvider()} disabled={store.connecting}>
            {store.connecting ? 'Connecting Wallet...' : 'Connect Wallet'}
        </button>
    </div>
));
const VotingParametersView = observer(({ store }: CybercomStoreParameter) => (
    <CTable>
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell scope="col">Council Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Randomize By Group</CTableHeaderCell>
                <CTableHeaderCell scope="col">Randomize By Member</CTableHeaderCell>
                <CTableHeaderCell scope="col">Output Count For Group</CTableHeaderCell>
                <CTableHeaderCell scope="col">Output Count For Member</CTableHeaderCell>
                <CTableHeaderCell scope="col">Vote Denominator</CTableHeaderCell>
                <CTableHeaderCell scope="col">Vote Numerator</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sum Denominator</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sum Numerator</CTableHeaderCell>
                <CTableHeaderCell scope="col">Average Votes</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {store.votingParameters.map((vp, index) => (
                <CTableRow key={index}>
                    <CTableDataCell>{vp.councilName}</CTableDataCell>
                    <CTableDataCell>{vp.randomizeByGroup?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.randomizeByMember?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.outputCountForGroup?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.outputCountForMember?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.voteDenominator?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.voteNumerator?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.sumDenominator?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.sumNumerator?.toString()}</CTableDataCell>
                    <CTableDataCell>{vp.avgVotes?.toString()}</CTableDataCell>
                </CTableRow>
            ))}
        </CTableBody>
    </CTable>
));
const NationsView = observer(({ store }: CybercomStoreParameter) => (
    <CTable>
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell scope="col">Nation Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nation Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Council Name</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {store.nations.map((vp, index) => (
                <CTableRow key={index}>
                    <CTableDataCell>{vp.name}</CTableDataCell>
                    <CTableDataCell>{vp.id}</CTableDataCell>
                    <CTableDataCell>{vp.councilName}</CTableDataCell>
                </CTableRow>
            ))}
        </CTableBody>
    </CTable>
));
const CouncilsView = observer(({ store }: CybercomStoreParameter) => (
    <CTable>
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell scope="col">Council Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Council Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Groups</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {store.councils.map((council, index) => (
                <CTableRow key={index}>
                    <CTableDataCell>{council.name}</CTableDataCell>
                    <CTableDataCell>{council.role}</CTableDataCell>
                    <CTableDataCell>
                        {council.groups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {group.name} {group.id && `(ID: ${group.id.toString()})`}
                            </div>
                        ))}
                    </CTableDataCell>
                </CTableRow>
            ))}
        </CTableBody>
    </CTable>
));
const ContractLoadedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <p>Contract Address: {store.cybercomContract}</p>
        <button onClick={() => store.handleLoadContract()} disabled={store.isLoading}>
            {store.isLoading ? 'Loading contract...' : 'Load Contract'}
        </button>
        {store.contract && (
            <div>
                <AddMemberProposalView addStore={store.addMembershipProposal}/>
                <CTabs activeItemKey="addresses">
                    <CTabList variant="tabs">
                        <CTab itemKey="addresses">Addresses</CTab>
                        <CTab itemKey="councils">Councils</CTab>
                        <CTab itemKey="nations">Nations</CTab>

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
                        <CTabPanel className="p-3" itemKey="nations">
                            <NationsView store={store} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="councils">
                            <CouncilsView store={store} />
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
        )}
    </div>
));
const AddMemberProposalView = observer(({ addStore }: AddMembershipProposalParameter) => (
    <>
        <CButton color="primary" onClick={() => (addStore.isOpen = true)}>
            Submit Membership Proposal
        </CButton>
        <CModal
            visible={addStore.isOpen}
            onClose={() => (addStore.isOpen = false)}
            aria-labelledby="lblAddMember"
        >
            <CModalHeader>
                <CModalTitle id="lblAddMember">Propose Membership</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    {/* Select Council Group */}
                    <CFormSelect
                        aria-label="Select Council"
                        value={addStore.selectedGroupId?.toString()}
                        onChange={(evt) => (addStore.selectedGroupId = evt.target.value)}
                    >
                        <option value="">Select a Council Group</option>
                        {addStore.cyberComStore?.councils.map((item) =>
                            item.groups.map((g) => (
                                <option key={g.id?.toString() || g.name} value={g.id?.toString()}>
                                    {item.name} - {g.name}
                                </option>
                            ))
                        )}
                    </CFormSelect>

                    {/* Member Name Input */}
                    <CFormInput
                        aria-label="Member Name"
                        placeholder="Enter Member Name"
                        value={addStore.newNationName}
                        onChange={(evt) => (addStore.newNationName = evt.target.value)}
                        className="my-2"
                    />

                    {/* Member Address Input */}
                    <CFormInput
                        aria-label="Member Address"
                        placeholder="Enter Member Address"
                        value={addStore.newNationAddress}
                        onChange={(evt) => (addStore.newNationAddress = evt.target.value)}
                        className="my-2"
                    />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => (addStore.isOpen = false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => addStore.proposeMember()}
                    disabled={addStore.deploying}
                >
                    {addStore.deploying ? 'Deploying Proposal...' : 'Propose Member'}
                </CButton>
            </CModalFooter>
        </CModal>
    </>
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
