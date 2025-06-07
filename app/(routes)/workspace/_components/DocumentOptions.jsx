import { Link2Icon, MoreVertical, Trash2 } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function DocumentOptions({ doc, deleteDocument, shareDocument }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className='h-4 w-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Share Link Button - Opens Modal */}
          <DropdownMenuItem
            onClick={() => shareDocument(doc?.id)} // Opens the modal with document ID
            className="flex gap-2"
          >
            <Link2Icon className='h-4 w-4' />
            Share Link
          </DropdownMenuItem>

          {/* Delete Button */}
          <DropdownMenuItem
            onClick={() => deleteDocument(doc?.id)} // Calls delete function
            className="flex gap-2 text-red-500"
          >
            <Trash2 className='h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DocumentOptions;
