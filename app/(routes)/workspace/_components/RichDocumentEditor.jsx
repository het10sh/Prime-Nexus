import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
  const editorInstance = useRef(null);
  const { user } = useUser();
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (user) {
      initEditor();
    }
  }, [user]);

  // Function to save the document to Firestore
  const saveDocument = async () => {
    if (!editorInstance.current) return;

    try {
      const outputData = await editorInstance.current.save();
      const docRef = doc(db, 'documentOutput', params?.documentid);
      await updateDoc(docRef, {
        output: JSON.stringify(outputData),
        editedBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("✅ Document saved successfully!");
    } catch (error) {
      console.error("❌ Error saving document:", error);
    }
  };

  // Function to get document output from Firestore
  const getDocumentOutput = async () => {
    try {
      const docRef = doc(db, 'documentOutput', params?.documentid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.output) {
          const parsedOutput = JSON.parse(data.output);
          if (editorInstance.current) {
            editorInstance.current.render(parsedOutput);
          }
        }
      }
    } catch (error) {
      console.error("❌ Error loading document:", error);
    }
  };

  // Function to initialize EditorJS
  const initEditor = () => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: Alert,
          table: Table,
          list: List,
          checklist: Checklist,
          image: SimpleImage,
          code: CodeTool,
        },
        onReady: async () => {
          console.log("✅ EditorJS is ready!");
          setIsEditorReady(true);
          await getDocumentOutput(); // Load saved document content
        },
        onChange: saveDocument, // Save document on every change
      });

      editorInstance.current = editor;
    }
  };

  return (
    <div className='relative'>
      <div id='editorjs' className='w-[70%]'></div>
      <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
        <GenerateAITemplate 
          documentId={params?.documentid} 
          setGenerateAIOutput={(output) => editorInstance.current?.render(output)}
        />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
