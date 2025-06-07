import { Button } from '@/components/ui/button'
import { LayoutGrid, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { chatSession } from '@/config/GoogleAIModel';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

function GenerateAITemplate({ setGenerateAIOutput, documentId }) {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    const GenerateFromAI = async () => {
        setLoading(true);
        const PROMPT = 'Generate template for editor.js in JSON for ' + userInput;

        try {
            const result = await chatSession.sendMessage(PROMPT);
            const output = JSON.parse(await result.response.text());
            
            setGenerateAIOutput(output); // Set AI output in the editor

            //  ✅ Save AI output to Firestore (per document)
            const docRef = doc(db, 'documentOutput', documentId);
            await updateDoc(docRef, { output: JSON.stringify(output) });

            console.log("✅ AI-generated template saved to Firestore!");
        } catch (e) {
            console.error("❌ Error parsing AI response:", e);
        }
        
        setLoading(false);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outline" className="flex gap-2" onClick={() => setOpen(true)}>
                <LayoutGrid className='h-4 w-4' /> Generate AI Template
            </Button>
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate AI Template</DialogTitle>
                        <DialogDescription>
                            <div>
                                <h2 className='mt-5'>What do you want to write in the document?</h2>
                                <Input placeholder="Ex. Project Idea" 
                                    value={userInput}
                                    onChange={(event) => setUserInput(event?.target.value)}
                                />
                                <div className='mt-5 flex gap-5 justify-end'>
                                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button 
                                        disabled={!userInput || loading}
                                        onClick={GenerateFromAI}>
                                        {loading ? <Loader2Icon className='animate-spin' /> : 'Generate'}
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GenerateAITemplate;
