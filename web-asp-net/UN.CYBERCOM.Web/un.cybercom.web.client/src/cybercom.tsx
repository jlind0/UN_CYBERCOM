import { CybercomStore } from './cybercom.store';
import { AddMemberStore } from './cybercom.store.membership.add';
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CForm, CFormInput, CFormSelect, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { MembershipProposalViewModel, ApprovalStatus } from './cybercom.store.membership';
const cybercomStore = new CybercomStore();
interface CybercomStoreParameter {
    store: CybercomStore;
}
interface AddMembershipProposalParameter {
    addStore: AddMemberStore;
}
const DisconnectedView = observer(({ store }: CybercomStoreParameter) => (
    <div>
        <CButton color="primary" onClick={() => store.handleSetupProvider()} disabled={store.connecting}>
            {store.connecting ? 'Connecting Wallet...' : 'Connect Wallet'}
        </CButton>
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
            {store.councils && store.councils.councils.map((council, index) => (
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
const MembershipProposalsView = observer(({ store }: CybercomStoreParameter) => (
    <>
        <CButton color="primary" onClick={() => store.membershipProposals.load()}>
            Load Membership Proposals
        </CButton>
        <CTabs activeItemKey="entered">
            <CTabList variant="tabs">
                <CTab itemKey="entered">Entered</CTab>
                <CTab itemKey="pending">Pending</CTab>
                <CTab itemKey="ready">Ready</CTab>
                <CTab itemKey="accepted">Accepted</CTab>
                <CTab itemKey="rejected">Rejected</CTab>
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="entered">
                    <MembershipProposalTableView proposals={store.membershipProposals.enteredProposals}/>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="pending">
                    <MembershipProposalTableView proposals={store.membershipProposals.pendingProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="ready">
                    <MembershipProposalTableView proposals={store.membershipProposals.readyProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="accepted">
                    <MembershipProposalTableView proposals={store.membershipProposals.acceptedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="rejected">
                    <MembershipProposalTableView proposals={store.membershipProposals.rejectedProposals} />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    </>
));
interface MembershipProposalTableParameters {
    proposals: MembershipProposalViewModel[]; 
}
const MembershipProposalTableView = observer(({ proposals }: MembershipProposalTableParameters) => (
    <>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Proposal Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Council</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">New Nation Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">New Nation Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Documents</CTableHeaderCell>
                    {proposals.length > 0 && proposals[0].status != ApprovalStatus.Entered && (
                        <CTableHeaderCell scope="col">Votes</CTableHeaderCell>
                    )}
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {proposals.map((item, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>{item.duration?.toISOString()}</CTableDataCell>
                        <CTableDataCell>{item.council?.name}</CTableDataCell>
                        <CTableDataCell>{item.group?.name}</CTableDataCell>
                        <CTableDataCell>{item.newNation?.id}</CTableDataCell>
                        <CTableDataCell>{item.newNation?.name}</CTableDataCell>
                        <CTableDataCell>
                            <CButton color="primary" onClick={async () => await item.load()}>Load Documents</CButton>
                            {item && item.status == ApprovalStatus.Entered && item.addDocument && (
                                <>
                                    <CButton color="primary" onClick={() => item.addDocument &&  (item.addDocument.isOpen = true)}>
                                        Add Document
                                    </CButton>
                                    <CModal
                                        visible={item.addDocument.isOpen}
                                        onClose={() => item.addDocument && (item.addDocument.isOpen = false)}
                                        aria-labelledby="lblAddMember"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="lblAddMember">Add Document</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CForm>
                                                {/* Select Council Group */}

                                                {/* Member Name Input */}
                                                <CFormInput
                                                    aria-label="Title"
                                                    placeholder="Enter Title"
                                                    value={item.addDocument.title}
                                                    onChange={(evt) => item.addDocument && (item.addDocument.title = evt.target.value)}
                                                    className="my-2"
                                                />
                                                <CFormInput
                                                    aria-label="Url"
                                                    placeholder="Enter URL"
                                                    value={item.addDocument.url}
                                                    onChange={(evt) => item.addDocument && (item.addDocument.url = evt.target.value)}
                                                    className="my-2"
                                                />
                                                {/* Member Address Input */}
                                                <CButton
                                                    color="primary"
                                                    onClick={() => item.addDocument && item.addDocument.signHash()}
                                                >
                                                    Sign
                                                </CButton>
                                                <p>Hash: {item.addDocument.documentHash}</p>
                                                <p>Signature: {item.addDocument.signature}</p>
                                            </CForm>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => item.addDocument &&  (item.addDocument.isOpen = false)}>
                                                Close
                                            </CButton>
                                            <CButton
                                                color="primary"
                                                onClick={() => item.addDocument &&  item.addDocument.add()}
                                            >
                                                Add Document
                                            </CButton>
                                        </CModalFooter>
                                    </CModal>
                                </>
                            )}
                            
                            {item.documents.map((doc, groupIndex) => (
                                <div key={groupIndex}>
                                    {doc.title} <a href={doc.url} target="_blank">{doc.url}</a>
                                    Hash:{doc.hash} Signature: {doc.signature} Signer: {doc.signer }
                                    <CButton color="primary" onClick={async () => alert(await doc.verify())}>
                                        Verify
                                    </CButton>
                                </div>
                            ))}
                        </CTableDataCell>
                        {item.status != ApprovalStatus.Entered && (
                            <CTableDataCell>
                                {item.votes.map((vote, groupIndex) => (
                                    <div key={groupIndex}>
                                        {vote.member?.name} {vote.voteCasted} {vote.timestamp?.toISOString()}
                                    </div>
                                ))}
                            </CTableDataCell>
                        )}
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    </>
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
                        {addStore.councils.councils.map((item) =>
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
