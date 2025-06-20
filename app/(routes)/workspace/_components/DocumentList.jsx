import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { toast } from 'sonner';
import ShareModal from './ShareModal'; // Import ShareModal component

function DocumentList({ documentList, params }) {
  const router = useRouter();
  
  // State for controlling modal visibility and active document ID
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activeDocId, setActiveDocId] = useState(null);

  // Function to open the share modal with the current document's ID
  const openShareModal = (docId) => {
    setActiveDocId(docId); // Set active document ID
    setShareModalOpen(true); // Open the modal
  };

  // Function to handle deleting a document
  const DeleteDocument = async (docId) => {
    await deleteDoc(doc(db, 'workspaceDocuments', docId));
    toast('Document Deleted!');
  };

  return (
    <div>
      {documentList.map((doc, index) => (
        <div
          key={index}
          onClick={() => router.push('/workspace/' + params?.workspaceid + "/" + doc?.id)}
          className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer flex justify-between items-center ${doc?.id == params?.documentid && 'bg-white'}`}
        >
          <div className="flex gap-2 items-center">
            {!doc.emoji && <Image src={'/loopdocument.png'} width={20} height={20} />}
            <h2 className="flex gap-2"> {doc?.emoji} {doc.documentName}</h2>
          </div>

          {/* Pass shareModalOpen and openShareModal to DocumentOptions */}
          <DocumentOptions
            doc={doc}
            deleteDocument={DeleteDocument}
            shareDocument={openShareModal} // Pass share function to DocumentOptions
          />
        </div>
      ))}

      {/* Render the Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        documentId={activeDocId}
      />
    </div>
  );
}

export default DocumentList;
