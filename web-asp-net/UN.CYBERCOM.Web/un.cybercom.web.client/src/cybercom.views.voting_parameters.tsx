import { CybercomStoreParameter, ChangeVotingParametersTableParameters, ChangeVotingParametersProposalParameter } from './cybercom.views.common';
import { ApprovalStatus } from './cybercom.store.common';
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter, CFormCheck, CModalHeader, CModalTitle, CTab, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabList, CTabPanel, CTabs, CFormInput } from '@coreui/react'
import { ProposalDataCells } from './cybercom.views.proposals';
import { VotingParametersView } from "./cybercom.views.voting"
const VotingParametersProposalsView = observer(({ store }: CybercomStoreParameter) => (
    <>
        <CButton color="primary" onClick={() => store.changeVotingParameters.load()}>
            Load Voting Parameter Proposals
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
                    <ChangeParametersTableView proposals={store.changeVotingParameters.enteredProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motioned">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.motioningProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="motionFailed">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.motionFailedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="pending">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.pendingProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="ready">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.readyProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="accepted">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.acceptedProposals} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="rejected">
                    <ChangeParametersTableView proposals={store.changeVotingParameters.rejectedProposals} />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    </>
));


const ChangeParametersTableView = observer(({ proposals }: ChangeVotingParametersTableParameters) => (
    <>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Proposal Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Parameters</CTableHeaderCell>
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
                        <CTableDataCell>
                            <VotingParametersView votingParameters={item.votingParameters} />
                        </CTableDataCell>
                        <ProposalDataCells item={item} />
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    </>
));
const ChangeParameterProposalView = observer(({ changeVoting }: ChangeVotingParametersProposalParameter) => (
    <>
        <CButton color="primary" onClick={() => (changeVoting.isOpen = true)}>
            Submit Change Voting Parameters Proposal
        </CButton>
        <CModal
            visible={changeVoting.isOpen}
            onClose={() => (changeVoting.isOpen = false)}
            aria-labelledby="lblAddMember"
        >
            <CModalHeader>
                <CModalTitle id="lblAddMember">Propose Change Voting Parameters</CModalTitle>
            </CModalHeader>
            <CModalBody>
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
                        {changeVoting.votingParameters.votingParameters.map((vp, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{vp.councilName}</CTableDataCell>
                                <CTableDataCell><CFormCheck checked={vp.randomizeByGroup}
                                    onChange={(evt) => (vp.randomizeByGroup = evt.target.checked)} /></CTableDataCell>
                                        <CTableDataCell><CFormCheck checked={vp.randomizeByMember}
                                    onChange={(evt) => (vp.randomizeByMember = evt.target.checked)} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.outputCountForGroup?.toString()}
                                            onChange={(evt) => (vp.outputCountForGroup = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.outputCountForMember?.toString()}
                                            onChange={(evt) => (vp.outputCountForMember = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.voteDenominator?.toString()}
                                            onChange={(evt) => (vp.voteDenominator = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.voteNumerator?.toString()}
                                            onChange={(evt) => (vp.voteNumerator = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.sumDenominator?.toString()}
                                            onChange={(evt) => (vp.sumDenominator = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormInput type="number" value={vp.sumNumerator?.toString()}
                                            onChange={(evt) => (vp.sumNumerator = BigInt(evt.target.value))} /></CTableDataCell>
                                        <CTableDataCell><CFormCheck checked={vp.avgVotes}
                                    onChange={(evt) => (vp.avgVotes = evt.target.checked)} /></CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => (changeVoting.isOpen = false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => changeVoting.changeVotingParameters()}
                    disabled={changeVoting.deploying}
                >
                    {changeVoting.deploying ? 'Deploying Proposal...' : 'Propose Removing Member'}
                </CButton>
            </CModalFooter>
        </CModal>
    </>
));
export { VotingParametersProposalsView, ChangeParameterProposalView };