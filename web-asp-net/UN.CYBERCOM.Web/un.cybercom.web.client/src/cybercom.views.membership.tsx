import { CybercomStoreParameter, MembershipProposalTableParameters, AddMembershipProposalParameter } from './cybercom.views.common';
import { ApprovalStatus } from './cybercom.store.common'; 
import { observer } from 'mobx-react-lite';
import { ProposalDataCells } from './cybercom.views.proposals';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormSelect, CForm, CFormInput, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'
const MembershipProposalsView = observer(({ store }: CybercomStoreParameter) => (
    <>
        <CButton color="primary" onClick={() => store.membershipProposals.load()}>
            Load Membership Proposals
        </CButton>
        <CTabs activeItemKey="entered">
            <CTabList variant="tabs">
                <CTab itemKey="entered">Entered</CTab>
                <CTab itemKey="motioned">Motioning</CTab>
                <CTab itemKey="motionFailed">Motion Failed</CTab>
                <CTab itemKey="pending">Pending</CTab>
                <CTab itemKey="ready">Ready</CTab>
                <CTab itemKey="accepted">Accepted</CTab>
                <CTab itemKey="rejected">Rejected</CTab>
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="entered">
                    <MembershipProposalTableView proposals={store.membershipProposals.enteredProposals}/>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motioned">
                    <MembershipProposalTableView proposals={store.membershipProposals.motioningProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motionFailed">
                    <MembershipProposalTableView proposals={store.membershipProposals.motionFailedProposals} />
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
                        <CTableHeaderCell scope="col">Votes &amp; Motions</CTableHeaderCell>
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
                        <ProposalDataCells item={item}/>
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