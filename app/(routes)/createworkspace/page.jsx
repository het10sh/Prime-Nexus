"use client";
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import uuid4 from 'uuid4';

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState('');
  const [emoji, setEmoji] = useState(null); 
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Safe query handling
  const { workspaceId } = router.query || {}; // Default to empty object if query is undefined
  const isEditMode = !!workspaceId; // Check if workspaceId exists

  useEffect(() => {
    if (isEditMode) {
      // Fetch workspace data if editing
      const fetchWorkspaceData = async () => {
        const workspaceDoc = await getDoc(doc(db, 'Workspace', workspaceId));
        if (workspaceDoc.exists()) {
          const workspaceData = workspaceDoc.data();
          setWorkspaceName(workspaceData.workspaceName);
          setEmoji(workspaceData.emoji);
          setCoverImage(workspaceData.coverImage || '/cover.png');
        }
      };

      fetchWorkspaceData();
    }
  }, [workspaceId, isEditMode]); // Run effect only when workspaceId or isEditMode changes

  const OnCreateWorkspace = async () => {
    setLoading(true);
    const workspaceIdToUse = isEditMode ? workspaceId : Date.now().toString(); // Use existing ID for editing, generate new ID for create

    // Update workspace document if in edit mode
    await setDoc(doc(db, 'Workspace', workspaceIdToUse), {
      workspaceName: workspaceName,
      emoji: emoji || null, 
      coverImage: coverImage,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceIdToUse,
      orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
    });

    if (!isEditMode) {
      // If new workspace, create the initial document
      const docId = uuid4();
      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: workspaceIdToUse,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: []
      });

      await setDoc(doc(db, 'documentOutput', docId.toString()), {
        docId: docId,
        output: []
      });
    }

    setLoading(false);
    router.replace('/workspace/' + workspaceIdToUse); // Redirect to the workspace page after creating/updating
  };

  const handleCancel = () => {
    router.push('/dashboard'); // Navigate to the dashboard page when Cancel is clicked
  };

  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
      <div className='shadow-2xl rounded-xl'>
        {/* Cover Image */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className='relative group cursor-pointer'>
            <h2 className='hidden absolute p-4 w-full h-full
                items-center group-hover:flex
                justify-center  '>Change Cover</h2>
            <div className='group-hover:opacity-40'>
              <Image src={coverImage} width={400} height={400}
                className='w-full h-[180px] object-cover rounded-t-xl'
              />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section */}
        <div className='p-12'>
          <h2 className='font-medium text-xl'>{isEditMode ? 'Edit Workspace' : 'Create a new workspace'}</h2>
          <h2 className='text-sm mt-2'>
            {isEditMode ? 'You can update your workspace details.' : 
            'This is a shared space where you can collaborate with your team. You can always rename it later.'}
          </h2>
          <div className='mt-8 flex gap-2 items-center'>
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline">
                {emoji ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerComponent>
            <Input 
              value={workspaceName}
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)} 
            />
          </div>
          <div className='mt-7 flex justify-end gap-6'>
            <Button disabled={!workspaceName?.length || loading} onClick={OnCreateWorkspace}>
              {isEditMode ? 'Update' : 'Create'} {loading && <Loader2Icon className='animate-spin ml-2' />}
            </Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
