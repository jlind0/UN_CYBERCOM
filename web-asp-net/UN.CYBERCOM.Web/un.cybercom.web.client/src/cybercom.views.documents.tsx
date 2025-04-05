import { AddDocumentParameter } from './cybercom.views.common';
import { observer } from 'mobx-react-lite';
import { CButton, CModal, CModalBody, CModalFooter,CModalHeader, CModalTitle,  CForm, CFormInput} from '@coreui/react'


const AddDocumentView = observer(({ addDocument }: AddDocumentParameter) => (
    <>
    { addDocument && (
    <>
        <CButton color="primary" onClick={() => addDocument && (addDocument.isOpen = true)}>
            Add Document
        </CButton>
        <CModal
            visible={addDocument.isOpen}
            onClose={() => addDocument && (addDocument.isOpen = false)}
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
                        value={addDocument.title}
                        onChange={(evt) => addDocument && (addDocument.title = evt.target.value)}
                        className="my-2"
                    />
                    <CFormInput
                        aria-label="Url"
                        placeholder="Enter URL"
                        value={addDocument.url}
                        onChange={(evt) => addDocument && (addDocument.url = evt.target.value)}
                        className="my-2"
                    />
                    {/* Member Address Input */}
                    <CButton
                        color="primary"
                        onClick={() => addDocument && addDocument.signHash()}
                    >
                        Sign
                    </CButton>
                    <p>Hash: {addDocument.documentHash}</p>
                    <p>Signature: {addDocument.signature}</p>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => addDocument && (addDocument.isOpen = false)}>
                    Close
                </CButton>
                <CButton
                    color="primary"
                    onClick={() => addDocument && addDocument.add()}
                >
                    Add Document
                </CButton>
            </CModalFooter>
        </CModal>
        </>
        )}
    </>
));
export { AddDocumentView };