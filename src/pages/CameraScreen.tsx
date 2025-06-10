import React, { useState } from 'react';
import SnapCameraView from '@/components/SnapCameraView';
import ARLensSelector from '@/components/ARLensSelector';
import { Button } from '@/components/ui/button';
import { UserCircle, Search, UserPlus, MessageSquare, CircleUserRound, PlaySquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder AR Lenses
const sampleLenses = [
  { id: 'lens1', name: 'Hearts', previewIcon: <span role="img" aria-label="hearts">💖</span> },
  { id: 'lens2', name: 'Dog Ears', previewIcon: <span role="img" aria-label="dog">🐶</span> },
  { id: 'lens3', name: 'Cool Shades', previewIcon: <span role="img" aria-label="shades">😎</span> },
  { id: 'lens4', name: 'Stars', previewIcon: <span role="img" aria-label="stars">✨</span> },
  { id: 'lens5', name: 'Rainbow', previewIcon: <span role="img" aria-label="rainbow">🌈</span> },
];

const CameraScreen = () => {
  const [selectedLensId, setSelectedLensId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  console.log('CameraScreen loaded');

  const handleSelectLens = (lensId: string) => {
    setSelectedLensId(lensId);
    console.log('Selected Lens:', lensId);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <SnapCameraView />

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50 rounded-full" onClick={() => navigate('/profile')} aria-label="Profile">
            <CircleUserRound className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50 rounded-full" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50 rounded-full" aria-label="Add Friends">
          <UserPlus className="h-6 w-6" />
        </Button>
      </div>

      {/* AR Lens Selector - typically shown above or near the shutter button */}
      <div className="absolute bottom-24 left-0 right-0 z-20">
        <ARLensSelector lenses={sampleLenses} selectedLensId={selectedLensId} onSelectLens={handleSelectLens} />
      </div>

      {/* Bottom Navigation/Action Bar (Mimicking Snapchat's main navigation) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-sm flex justify-around items-center z-20 md:hidden">
         <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/chat-list')} aria-label="Chat">
            <MessageSquare className="h-7 w-7" />
        </Button>
        {/* Central button is the camera shutter, part of SnapCameraView, so placeholder or empty space here */}
        <div className="w-16 h-16 flex items-center justify-center">
            {/* This space is typically where the shutter button from SnapCameraView aligns */}
        </div>
        <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/stories')} aria-label="Stories">
            <PlaySquare className="h-7 w-7" />
        </Button>
      </div>

       {/* Desktop/Tablet Navigation (Not typical for Snapchat, but for completeness if app runs on larger screens) */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-20">
          <Button variant="outline" className="text-white border-white/50 bg-black/30 hover:bg-black/50" onClick={() => navigate('/profile')}>Profile</Button>
          <Button variant="outline" className="text-white border-white/50 bg-black/30 hover:bg-black/50" onClick={() => navigate('/chat-list')}>Chats</Button>
          <Button variant="outline" className="text-white border-white/50 bg-black/30 hover:bg-black/50" onClick={() => navigate('/stories')}>Stories</Button>
      </div>
    </div>
  );
};

export default CameraScreen;