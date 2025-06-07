"use client"
import Logo from '@/app/_components/Logo'
import { db } from '@/config/firebaseConfig';
import { OrganizationSwitcher, UserButton, useAuth, useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    user && saveUserData();
  }, [user]);

  /**
   * Used to save user data with subscription status
   */
  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    const userRef = doc(db, 'PrimeNexusUsers', docId);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User already exists, don't overwrite subscription status
        await setDoc(userRef, {
          name: user?.fullName,
          avatar: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress
        }, { merge: true });  // Keeps existing subscriptionStatus
      } else {
        // New user → Set default subscription status to "free"
        await setDoc(userRef, {
          name: user?.fullName,
          avatar: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress,
          subscriptionStatus: "free"  // Default status
        });
      }
    } catch (e) {
      console.error("Error saving user data:", e);
    }
  };

  return (
    <div className='flex justify-between items-center p-3 shadow-sm'>
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={'/dashboard'}
        afterCreateOrganizationUrl={'/dashboard'} />
      <UserButton />
    </div>
  );
}

export default Header;
