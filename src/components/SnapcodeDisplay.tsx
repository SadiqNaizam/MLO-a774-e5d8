import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode } from 'lucide-react'; // Placeholder icon

interface SnapcodeDisplayProps {
  snapcodeImageUrl?: string; // URL of the actual Snapcode image
  userName?: string;
}

const SnapcodeDisplay: React.FC<SnapcodeDisplayProps> = ({ snapcodeImageUrl, userName }) => {
  console.log("Rendering SnapcodeDisplay for user:", userName);

  return (
    <Card className="w-48 h-48 sm:w-56 sm:h-56 p-2 mx-auto shadow-lg">
      <CardContent className="flex flex-col items-center justify-center h-full bg-yellow-300 rounded-md p-4">
        {snapcodeImageUrl ? (
          <img
            src={snapcodeImageUrl}
            alt={userName ? `${userName}'s Snapcode` : 'Snapcode'}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
              // Show a placeholder QrCode icon if image fails
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent && !parent.querySelector('.snapcode-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'snapcode-placeholder flex flex-col items-center justify-center text-center';
                // This direct DOM manipulation is not ideal in React, but for onError it's a simple fallback
                // A better way would be to use state to toggle between img and placeholder component
                placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h.01"/><path d="M21 12v.01"/><path d="M12 21v-3a2 2 0 0 0-2-2H7"/><path d="M3 7h3a2 2 0 0 0 2-2V3"/></svg><p class='mt-2 text-xs font-medium'>Snapcode</p>`;
                parent.appendChild(placeholder);
              }
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <QrCode className="w-16 h-16 sm:w-24 sm:h-24 text-black" />
            <p className="mt-2 text-sm font-medium text-black">Snapcode</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default SnapcodeDisplay;