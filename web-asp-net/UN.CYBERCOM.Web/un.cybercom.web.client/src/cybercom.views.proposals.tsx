import { observer } from 'mobx-react-lite';
import { AddDocumentView } from './cybercom.views.documents';
import { ApprovalStatus } from './cybercom.store.common';
import { ProposalItemParameter } from './cybercom.views.common';
import { CButton,CFormCheck, CTableDataCell} from '@coreui/react'
const ProposalDataCells = observer(({ item }: ProposalItemParameter) => (
    <>
    <CTableDataCell>
        <CButton color="primary" onClick={async () => await item.load()}>Load Documents</CButton>
        {item && item.status == ApprovalStatus.Entered && item.addDocument && (
            <>
                <CButton color="primary" onClick={async () => await item.startVoting()}>Start Voting</CButton>
                <AddDocumentView addDocument={item.addDocument} />
            </>
        )}

        {item.documents.map((doc, groupIndex) => (
            <div key={groupIndex}>
                {doc.title} <a href={doc.url} target="_blank">{doc.url}</a>
                Hash:{doc.hash} Signature: {doc.signature} Signer: {doc.signer}
                <CButton color="primary" onClick={async () => alert(await doc.verify())}>
                    Verify
                </CButton>
            </div>
        ))}
    </CTableDataCell>
        {
            item.status != ApprovalStatus.Entered && (
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
                            {item.duration && item.duration <= new Date() && item.isProcessing === false && (
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
        </>
));
export { ProposalDataCells };