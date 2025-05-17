import { CybercomStoreParameter, PackagesTableParameters, AddPackageProposalParameter, UpdatePackageProposalParameter } from './cybercom.views.common';
import { ApprovalStatus } from './cybercom.store.common';
import { observer } from 'mobx-react-lite';
import { CButton, CFormCheck, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { ProposalDataCells } from './cybercom.views.proposals';
const PackagesView = observer(({ store }: CybercomStoreParameter) => (
    <>
        <CButton color="primary" onClick={() => store.packages.load()}>
            Load Packages
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
                    <PackagesTableView proposals={store.packages.enteredProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motioned">
                    <PackagesTableView proposals={store.packages.motioningProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motionFailed">
                    <PackagesTableView proposals={store.packages.motionFailedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="pending">
                    <PackagesTableView proposals={store.packages.pendingProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="ready">
                    <PackagesTableView proposals={store.packages.readyProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="accepted">
                    <PackagesTableView proposals={store.packages.acceptedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="rejected">
                    <PackagesTableView proposals={store.packages.rejectedProposals} />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    </>
));

const UpdatePackageView = observer(({ updateStore }: UpdatePackageProposalParameter) => (
    <>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Proposal Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Include</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {updateStore.packages.map((item, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>
                            <CFormCheck
                                type="checkbox"
                                label="Update"
                                checked={item.isSelected}
                                onChange={(evt) => (item.isSelected = evt.target.checked)} />
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
        <CButton color="primary"
            onClick={() => updateStore.updatePackage()}
            disabled={updateStore.deploying}>Add Proposals</CButton>
    </>
));
const PackagesTableView = observer(({ proposals }: PackagesTableParameters) => (
    <>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Proposal Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Proposals</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Documents</CTableHeaderCell>
                    {proposals.length > 0 && proposals[0].status != ApprovalStatus.Entered && (
                        <CTableHeaderCell scope="col">Votes</CTableHeaderCell>
                    )}
                    {proposals.length > 0 && proposals[0].status == ApprovalStatus.Entered && (
                        <CTableHeaderCell scope="col">Update</CTableHeaderCell>
                    )}
                    
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {proposals.map((item, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>{item.duration?.toISOString()}</CTableDataCell>
                        <CTableDataCell>
                            <ul>
                                {item.proposals.map((i, idx) => (
                                    <li key={idx}>{i}</li>
                            ))}
                            </ul>
                        </CTableDataCell>
                        <ProposalDataCells item={item} />
                        {item.status === ApprovalStatus.Entered && (
                            <CTableDataCell>
                                {item.updateModel && (
                                    <UpdatePackageView updateStore={item.updateModel} />
                                )}
                            </CTableDataCell>
                        )};
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    </>
));
const AddPackageProposalView = observer(({ addStore }: AddPackageProposalParameter) => (
    <>
        <CButton color="primary" onClick={() => (addStore.isOpen = true)}>
            Submit Package Proposal
        </CButton>
        <CModal
            visible={addStore.isOpen}
            onClose={() => (addStore.isOpen = false)}
            aria-labelledby="lblAddMember"
        >
            <CModalHeader>
                <CModalTitle id="lblAddMember">Propose Package</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p>Start a new Package</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => (addStore.isOpen = false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => addStore.submitPackage()}
                    disabled={addStore.deploying}
                >
                    {addStore.deploying ? 'Deploying Proposal...' : 'Propose Package'}
                </CButton>
            </CModalFooter>
        </CModal>
    </>
));
export { AddPackageProposalView, PackagesView };