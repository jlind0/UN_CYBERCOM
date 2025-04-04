import { observer } from 'mobx-react-lite';
import { CybercomStoreParameter } from './cybercom.views.common';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

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
export { VotingParametersView };