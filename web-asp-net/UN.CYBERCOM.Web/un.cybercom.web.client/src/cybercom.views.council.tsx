import { observer } from 'mobx-react-lite';
import { CybercomStoreParameter } from './cybercom.views.common';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
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
export { NationsView, CouncilsView };