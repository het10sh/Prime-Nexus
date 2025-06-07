"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import NotificationBox from './NotificationBox'

function SideNav({ params }) {
    const [documentList, setDocumentList] = useState([]);
    const [workspaceName, setWorkspaceName] = useState("Workspace");
    const [workspaceEmoji, setWorkspaceEmoji] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState("free"); // Default to free
    const [isUpgrading, setIsUpgrading] = useState(false); // Track upgrade process
    const router = useRouter();

    useEffect(() => {
        if (params) {
            GetDocumentList();
            GetWorkspaceName();
        }
    }, [params]);

    useEffect(() => {
        if (user) {
            fetchSubscriptionStatus();
        }
    }, [user]);

    /**
     * Fetch Subscription Status from Firestore
     */
    const fetchSubscriptionStatus = async () => {
        if (!user?.primaryEmailAddress) return;

        const userRef = doc(db, 'PrimeNexusUsers', user.primaryEmailAddress.emailAddress);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setSubscriptionStatus(userSnap.data().subscriptionStatus || "free");
        }
    };

    /**
     * Define MAX_FILE based on subscription status
     */
    const MAX_FILE = subscriptionStatus === "active" ? 20 : 5;

    /**
     * Fetch Document List from Firestore
     */
    const GetDocumentList = () => {
        if (!params?.workspaceid) return;

        const q = query(collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid)));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = querySnapshot.docs.map(doc => doc.data());
            setDocumentList(docs);
        });

        return () => unsubscribe();
    };

    /**
     * Fetch Workspace Name and Emoji from Firestore
     */
    const GetWorkspaceName = () => {
        if (!params?.workspaceid) return;

        const workspaceRef = doc(db, "Workspace", params.workspaceid);

        const unsubscribe = onSnapshot(workspaceRef, (docSnap) => {
            if (docSnap.exists()) {
                setWorkspaceName(docSnap.data().workspaceName);
                setWorkspaceEmoji(docSnap.data().emoji || "");
            } else {
                setWorkspaceName("Workspace Not Found");
                setWorkspaceEmoji("");
            }
        });

        return () => unsubscribe();
    };

    /**
     * Create a New Document
     */
    const CreateNewDocument = async () => {
        if (!user?.primaryEmailAddress) return;

        if (documentList?.length >= MAX_FILE) {
            toast("Upgrade to add a new file", {
                description: `You've reached the max file limit (${MAX_FILE}). Upgrade for more access.`,
                action: {
                    label: "Upgrade",
                    onClick: handleUpgrade, // Call handleUpgrade when clicked
                },
            });
            return;
        }

        setLoading(true);
        const docId = uuid4();

        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createdBy: user.primaryEmailAddress.emailAddress,
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

        setLoading(false);
        router.replace(`/workspace/${params?.workspaceid}/${docId}`);
    };

    /**
     * Handle Plan Upgrade and Redirect to Previous Page
     */
    const handleUpgrade = async () => {
        if (!user?.primaryEmailAddress) return;
        
        setIsUpgrading(true);
    
        try {
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userId: user.id, 
                    email: user.primaryEmailAddress.emailAddress,
                    returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/workspace/${params?.workspaceid}`
                }),
            });
    
            const data = await response.json();
    
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to create checkout session. Please try again.");
                console.error("Stripe Checkout Error:", data);
                setIsUpgrading(false);
            }
        } catch (error) {
            console.error("Upgrade Error:", error);
            toast.error("Something went wrong.");
            setIsUpgrading(false);
        }
    };

    return (
        <div className='h-screen md:w-72 hidden md:block fixed bg-green-50 p-5 shadow-md'>
            <div className='flex justify-between items-center'>
                <Logo />
                <NotificationBox>
                    <Bell className='h-5 w-5 text-gray-500' />
                </NotificationBox>
            </div>
            <hr className='my-5'></hr>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium text-lg'>
                        {workspaceEmoji} {workspaceName}
                    </h2>
                    <Button size="sm" className="text-lg" onClick={CreateNewDocument}>
                        {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : '+'}
                    </Button>
                </div>
            </div>

            {/* Document List */}
            <DocumentList documentList={documentList} params={params} />

            {/* Progress Bar */}
            <div className='absolute bottom-10 w-[85%]'>
                <Progress value={(documentList?.length / MAX_FILE) * 100} />
                <h2 className='text-sm font-light my-2'>
                    <strong>{documentList?.length}</strong> out of <strong>{MAX_FILE}</strong> files used
                </h2>

                {subscriptionStatus !== "active" && (
                    <>
                        <h2 className='text-sm font-light'>Upgrade your plan for more access</h2>
                        <Button 
                            size="sm" 
                            className="w-full mt-2" 
                            onClick={handleUpgrade}
                            disabled={isUpgrading}
                        >
                            {isUpgrading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : 'Upgrade Plan'}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SideNav;
