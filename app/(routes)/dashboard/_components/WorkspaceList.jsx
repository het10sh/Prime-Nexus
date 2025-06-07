"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function WorkspaceList() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const router = useRouter();

  const [workspaceList, setWorkspaceList] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    if (user) getWorkspaceList();
  }, [orgId, user]);

  const getWorkspaceList = async () => {
    const q = query(
      collection(db, "Workspace"),
      where(
        "orgId",
        "==",
        orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);
    setWorkspaceList(
      querySnapshot.docs.map((doc) => ({ id: String(doc.id), ...doc.data() }))
    );
  };

  const openDeleteDialog = (workspace) => {
    setSelectedWorkspace(workspace);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWorkspace = async () => {
    if (!selectedWorkspace || !selectedWorkspace.id) return;

    const workspaceId = String(selectedWorkspace.id);

    try {
      await deleteDoc(doc(db, "Workspace", workspaceId));

      const workspaceDocsQuery = query(
        collection(db, "workspaceDocuments"),
        where("workspaceId", "==", workspaceId)
      );
      const workspaceDocsSnapshot = await getDocs(workspaceDocsQuery);

      const deletePromises = workspaceDocsSnapshot.docs.map(async (docItem) => {
        await deleteDoc(doc(db, "workspaceDocuments", docItem.id));
        await deleteDoc(doc(db, "documentOutput", docItem.id));
      });

      await Promise.all(deletePromises);

      setWorkspaceList((prev) =>
        prev.filter((w) => String(w.id) !== workspaceId)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("❌ Error deleting workspace:", error);
    }
  };

  const handleOpenWorkspace = (workspaceId) => {
    router.push(`/workspace/${workspaceId}`);
  };

  const handleEditWorkspace = (workspaceId) => {
    router.push(`/editworkspace/${workspaceId}`); // <-- Updated line
  };

  const displayName =
    user?.fullName ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.primaryEmailAddress?.emailAddress ||
    "User";

  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl" title={displayName}>
          Hello, {displayName}
        </h2>
        <Link href={"/createworkspace"}>
          <Button>+</Button>
        </Link>
      </div>

      {/* View Toggle */}
      <div className="mt-10 flex justify-between items-center">
        <h2 className="font-medium text-primary">Workspaces</h2>
        <div className="flex gap-2">
          <Button
            variant={isGridView ? "default" : "outline"}
            onClick={() => setIsGridView(true)}
          >
            <LayoutGrid className="w-5 h-5" />
          </Button>
          <Button
            variant={!isGridView ? "default" : "outline"}
            onClick={() => setIsGridView(false)}
          >
            <AlignLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* List or Empty State */}
      {workspaceList.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Image src={"/workspace.png"} width={200} height={200} alt="workspace" />
          <h2>Create a new workspace</h2>
          <Link href={"/createworkspace"}>
            <Button className="my-3">+ New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div
          className={
            isGridView ? "grid grid-cols-2 md:grid-cols-3 gap-6 mt-6" : "flex flex-col gap-4 mt-6"
          }
        >
          {workspaceList.map((workspace) => (
            <div
              key={workspace.id}
              onClick={() => handleOpenWorkspace(workspace.id)}
              className={`border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer ${
                isGridView ? "" : "flex items-center gap-4 p-4"
              }`}
            >
              <Image
                src={workspace.coverImage || "/cover.png"}
                width={isGridView ? 400 : 100}
                height={isGridView ? 200 : 80}
                alt="Workspace Cover"
                className={`object-cover ${
                  isGridView
                    ? "w-full h-[150px] rounded-t-xl"
                    : "h-[80px] w-[100px] rounded-xl"
                }`}
              />
              <div className="p-4 w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{workspace.emoji}</span>
                  <h3 className="font-semibold">{workspace.workspaceName}</h3>
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent routing to the workspace
                      handleEditWorkspace(workspace.id);
                    }}
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent routing to the workspace
                      openDeleteDialog(workspace);
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workspace?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to permanently delete the workspace{" "}
            <span className="font-bold">{selectedWorkspace?.workspaceName}</span>? This action
            cannot be undone!
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWorkspace}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WorkspaceList;
