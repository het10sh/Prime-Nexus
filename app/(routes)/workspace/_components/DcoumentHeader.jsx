import { Button } from '@/components/ui/button';
import { sendInvitation } from '@/lib/sendInvitation';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

function DocumentHeader({ documentId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isClient, setIsClient] = useState(false); // New state to check client-side
  const [currentUrl, setCurrentUrl] = useState('');

  // This useEffect ensures that useRouter is only run on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're on the client side, initialize the router and fetch the current URL
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      const currentUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
      setCurrentUrl(currentUrl);
    }
  }, [isClient]);

  const shareDocument = async () => {
    if (!email) return alert("Please enter an email");

    setLoading(true);

    try {
      await sendInvitation(email, documentId);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setEmail('');
    } catch (error) {
      console.error("Error sharing document:", error);
      alert("Failed to send invitation.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl); // Copy the dynamic URL
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
  };

  return (
    <>
      <div className='flex justify-between items-center p-3 px-7 shadow-md'>
        <div></div>
        <OrganizationSwitcher />
        <div className='flex gap-2'>
          <Button onClick={() => setIsOpen(true)}>Share</Button>
          <UserButton />
        </div>
      </div>

      {/* Share Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-25"></div>

          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-5 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Share Document</Dialog.Title>

              <div className="mt-3">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  className="w-full mt-3"
                  onClick={shareDocument}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Invite"}
                </Button>

                {success && <p className="text-green-500 mt-2">Invitation Sent!</p>}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">Shareable Link:</p>
                <Button variant="outline" onClick={copyToClipboard}>
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>

              <div className="mt-4 text-right">
                <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DocumentHeader;
