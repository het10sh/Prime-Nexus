"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }) {
  const { documentid } = params; // ✅ Proper destructuring

  return (
    <LiveblocksProvider
      authEndpoint={`/api/liveblocks-auth?roomId=${documentid}`}
      resolveUsers={async ({ userIds }) => {
        if (!userIds || userIds.length === 0) return [];

        // 🔹 Firestore only allows 'in' queries with up to 10 elements
        const batchSize = 10;
        let userList = [];

        for (let i = 0; i < userIds.length; i += batchSize) {
          const batch = userIds.slice(i, i + batchSize);
          const q = query(collection(db, "PrimeNexusUsers"), where("email", "in", batch));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            userList.push(doc.data());
          });
        }

        return userList;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        let userList = [];
        const q = query(collection(db, "PrimeNexusUsers"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });

        if (text) {
          userList = userList.filter((user) =>
            user.name?.toLowerCase().includes(text.toLowerCase()) // ✅ Avoid case sensitivity issues
          );
        }

        return userList.map((user) => user.email);
      }}
    >
      <RoomProvider id={documentid || "1"}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
