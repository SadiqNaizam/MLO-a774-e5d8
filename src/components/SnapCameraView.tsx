import React, { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw, Zap, Users, Send } from 'lucide-react'; // Example icons

// Props might include onCapture, onSwitchCamera, etc.
interface SnapCameraViewProps {
  // For now, let's assume child components like ARLensSelector are passed or positioned absolutely
}

const SnapCameraView: React.FC<SnapCameraViewProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  console.log("Rendering SnapCameraView");

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false, // Assuming no audio capture for snaps initially
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        console.log("Camera started with facing mode:", facingMode);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Potentially show a toast or error message to the user
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
      console.log("Camera stopped");
    }
  }, []);

  // Placeholder for capture logic
  const handleCapture = () => {
    console.log("Capture button clicked");
    // TODO: Implement image capture logic (e.g., using a canvas)
    // For now, just log. This would typically trigger a preview/edit state.
  };

  const handleSwitchCamera = () => {
    console.log("Switching camera");
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    // Camera will restart due to useEffect dependency on facingMode or explicit call
    stopCamera(); // Stop current stream before starting new one
    // Consider calling startCamera() here or using useEffect to manage it
  };

  // Start camera on component mount or when facingMode changes
  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);


  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        aria-label="Camera feed"
      />

      {/* Overlay UI Elements */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50" onClick={handleSwitchCamera} aria-label="Switch camera">
          <RotateCcw className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50" aria-label="Toggle flash">
          <Zap className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Controls - Shutter Button & potentially Lens Selector trigger */}
      <div className="absolute bottom-8 w-full flex flex-col items-center z-10">
        {/* ARLensSelector could be rendered here or triggered by a button */}
        {/* <ARLensSelector /> */}
        <Button
          onClick={handleCapture}
          className="w-20 h-20 rounded-full bg-white/80 hover:bg-white border-4 border-black/20 shadow-xl"
          aria-label="Capture photo"
        >
          {/* Inner circle for visual shutter */}
          <div className="w-16 h-16 rounded-full bg-white"></div>
        </Button>
      </div>

      {/* Top-left buttons (Profile, Search) as per JSON comment - assumed to be outside this component for now */}
      {/* Top-right (Add Friends) */}

      {/* Placeholder for Send To button (appears after capture/edit) */}
      {/* <Button className="absolute bottom-4 right-4 z-10" aria-label="Send snap">
        Send To <Send className="ml-2 h-4 w-4" />
      </Button> */}
    </div>
  );
};
export default SnapCameraView;