import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // For horizontal scrolling of lenses
// Potentially an icon for 'no lens' or specific lens previews
import { SmilePlus } from 'lucide-react';

interface Lens {
  id: string;
  name: string;
  previewIcon?: React.ReactNode; // Could be an image or an icon
}

interface ARLensSelectorProps {
  lenses: Lens[];
  selectedLensId?: string;
  onSelectLens: (lensId: string) => void;
}

const ARLensSelector: React.FC<ARLensSelectorProps> = ({ lenses, selectedLensId, onSelectLens }) => {
  console.log("Rendering ARLensSelector with lenses:", lenses.length);

  if (!lenses || lenses.length === 0) {
    console.log("No lenses to display in ARLensSelector.");
    return null; // Don't render if no lenses are provided
  }

  return (
    <div className="w-full px-4 py-2">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-3 p-2">
          {/* Option for no lens */}
           <Button
            variant={!selectedLensId ? "secondary" : "ghost"}
            className={`h-16 w-16 flex flex-col items-center justify-center rounded-full ${!selectedLensId ? 'border-2 border-blue-500' : ''}`}
            onClick={() => onSelectLens('')} // Assuming empty string means no lens
            aria-label="No lens"
          >
            <SmilePlus className="h-8 w-8 mb-1" /> {/* Generic icon */}
            <span className="text-xs">None</span>
          </Button>

          {lenses.map((lens) => (
            <Button
              key={lens.id}
              variant={selectedLensId === lens.id ? "secondary" : "ghost"}
              className={`h-16 w-16 flex flex-col items-center justify-center rounded-full ${selectedLensId === lens.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => onSelectLens(lens.id)}
              aria-label={`Select lens ${lens.name}`}
            >
              {lens.previewIcon || <div className="w-8 h-8 bg-gray-300 rounded-full mb-1" />} {/* Placeholder for lens icon */}
              <span className="text-xs truncate w-full text-center">{lens.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default ARLensSelector;