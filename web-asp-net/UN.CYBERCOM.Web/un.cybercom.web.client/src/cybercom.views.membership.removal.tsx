import { CybercomStoreParameter, RemoveMembershipTableParameters, RemoveMembershipProposalParameter } from './cybercom.views.common';
import { ApprovalStatus } from './cybercom.store.common';
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormSelect, CForm, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { ProposalDataCells } from './cybercom.views.proposals';
const MembershipRemovalsView = observer(({ store }: CybercomStoreParameter) => (
    <>
        <CButton color="primary" onClick={() => store.removeMemberships.load()}>
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
                    <MembershipRemovalTableView proposals={store.removeMemberships.enteredProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motioned">
                    <MembershipRemovalTableView proposals={store.removeMemberships.motioningProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motionFailed">
                    <MembershipRemovalTableView proposals={store.removeMemberships.motionFailedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="pending">
                    <MembershipRemovalTableView proposals={store.removeMemberships.pendingProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="ready">
                    <MembershipRemovalTableView proposals={store.removeMemberships.readyProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="accepted">
                    <MembershipRemovalTableView proposals={store.removeMemberships.acceptedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="rejected">
                    <MembershipRemovalTableView proposals={store.removeMemberships.rejectedProposals} />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    </>
));


const MembershipRemovalTableView = observer(({ proposals }: RemoveMembershipTableParameters) => (
    <>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Proposal Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nation Name</CTableHeaderCell>
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
                        <CTableDataCell>{item.nationToRemove?.name}</CTableDataCell>
                        <ProposalDataCells item={item} />
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    </>
));
const AddRemoveMemberProposalView = observer(({ removeStore }: RemoveMembershipProposalParameter) => (
    <>
        <CButton color="primary" onClick={() => (removeStore.isOpen = true)}>
            Submit Membership Removal Proposal
        </CButton>
        <CModal
            visible={removeStore.isOpen}
            onClose={() => (removeStore.isOpen = false)}
            aria-labelledby="lblAddMember"
        >
            <CModalHeader>
                <CModalTitle id="lblAddMember">Propose Membership Removal</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    {/* Select Council Group */}
                    <CFormSelect
                        aria-label="Select Nation"
                        value={removeStore.selectedNationAddress}
                        onChange={(evt) => (removeStore.selectedNationAddress = evt.target.value)}
                    >
                        <option value="">Select a Nation</option>
                        {removeStore.councils.nations.map((item) =>
                            <option key={item.id?.toString()} value={item.id?.toString()}>
                                {item.name}
                            </option>
                        )}
                    </CFormSelect>

                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => (removeStore.isOpen = false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => removeStore.removeMember()}
                    disabled={removeStore.deploying}
                >
                    {removeStore.deploying ? 'Deploying Proposal...' : 'Propose Removing Member'}
                </CButton>
            </CModalFooter>
        </CModal>
    </>
));
export { MembershipRemovalsView, AddRemoveMemberProposalView };