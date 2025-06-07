"use client";

import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2Icon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditWorkspacePage() {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [workspaceName, setWorkspaceName] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { orgId } = useAuth();
  const router = useRouter();
  const { workspaceId } = useParams();

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      const docRef = doc(db, "Workspace", workspaceId);
      const workspaceSnap = await getDoc(docRef);
      if (workspaceSnap.exists()) {
        const data = workspaceSnap.data();
        setWorkspaceName(data.workspaceName);
        setEmoji(data.emoji);
        setCoverImage(data.coverImage || "/cover.png");
      }
    };
    if (workspaceId) {
      fetchWorkspaceData();
    }
  }, [workspaceId]);

  const onUpdateWorkspace = async () => {
    setLoading(true);
    const docRef = doc(db, "Workspace", workspaceId);
    await setDoc(docRef, {
      workspaceName: workspaceName,
      emoji: emoji || null,
      coverImage: coverImage,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceId,
      orgId: orgId || user?.primaryEmailAddress?.emailAddress,
    });
    setLoading(false);
    router.replace('/dashboard');

  };

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Picker */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center">
              Change Cover
            </h2>
            <div className="group-hover:opacity-40">
              <Image
                src={coverImage}
                width={400}
                height={400}
                className="w-full h-[180px] object-cover rounded-t-xl"
                alt="cover"
              />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Edit Workspace</h2>
          <h2 className="text-sm mt-2">
            You can update your workspace details.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickerComponent>
            <Input
              value={workspaceName}
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="mt-7 flex justify-end gap-6">
            <Button
              disabled={!workspaceName?.length || loading}
              onClick={onUpdateWorkspace}
            >
              Update {loading && <Loader2Icon className="animate-spin ml-2" />}
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWorkspacePage;
