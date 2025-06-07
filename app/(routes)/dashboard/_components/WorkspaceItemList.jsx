"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function WorkspaceItemList({ workspaceList, isGridView }) {
  const router = useRouter();

  const OnClickWorkspaceItem = (workspaceId) => {
    router.push("/workspace/" + workspaceId);
  };

  return (
    <div
      className={`${
        isGridView
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          : "flex flex-col gap-4 mt-6"
      }`}
    >
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <div
            key={index}
            className={`border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer
              ${isGridView ? "" : "flex items-center gap-4 p-4"} `}
            onClick={() => OnClickWorkspaceItem(workspace.id)}
          >
            <Image
              src={workspace?.coverImage}
              width={isGridView ? 400 : 100}
              height={isGridView ? 200 : 80}
              alt="cover"
              className={`object-cover rounded-t-xl ${
                isGridView ? "h-[150px]" : "h-[80px] w-[100px] rounded-xl"
              }`}
            />
            <div className="p-4">
              <h2 className="flex gap-2">
                {workspace?.emoji} {workspace.workspaceName}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WorkspaceItemList;