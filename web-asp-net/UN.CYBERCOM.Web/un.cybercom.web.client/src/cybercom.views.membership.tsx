import { CybercomStoreParameter, MembershipProposalTableParameters, AddMembershipProposalParameter } from './cybercom.views.common';
import { ApprovalStatus } from './cybercom.store.common'; 
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter, CFormCheck, CModalHeader, CModalTitle, CFormSelect, CForm, CFormInput, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'
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
                                    <CButton color="primary" onClick={async () => await item.startVoting()}>Start Voting</CButton>
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
                                {item.status == ApprovalStatus.Pending && (
                                    <>
                                        {item.duration && item.duration > new Date() && (
                                            <>
                                            <CFormCheck
                                                type="checkbox"
                                                label="Approve"
                                                checked={item.vote}
                                                onChange={(evt) => (item.vote = evt.target.checked)} />
                                            <CButton
                                                color="primary"
                                                        onClick={async () => await item.performVote()}>Cast Vote</CButton>
                                            </>
                                        )}
                                        {item.duration && item.duration <= new Date() && (
                                            <>
                                                <CButton
                                                    color="primary"
                                                        onClick={async () => await item.startTally()}>Start Tally</CButton>
                                            </>
                                        )}
                                        
                                    </>
                                )}
                                {item.status == ApprovalStatus.Ready && (
                                    <>
                                        <CButton
                                            color="primary"
                                            onClick={async () => await item.completeTally()}>Complete Tally</CButton>
                                    </>
                                )}
                                {item.votes.map((vote, groupIndex) => (
                                    <div key={groupIndex}>
                                        {vote.member?.name} {vote.voteCasted?.toString()} {vote.timestamp?.toISOString()}
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
export { MembershipProposalsView, AddMemberProposalView };