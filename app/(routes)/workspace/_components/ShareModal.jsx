'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendInvitation } from '@/lib/sendInvitation'; // Adjust this if you have a different logic

function ShareModal({ isOpen, setIsOpen, documentId }) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const shareDocument = async () => {
    if (!email) return alert("Please enter an email");

    setLoading(true);

    try {
      await sendInvitation(email, documentId); // Sending the invitation
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
    navigator.clipboard.writeText(`${window.location.origin}/document/${documentId}`); // Copy shareable link
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
}

export default ShareModal;
