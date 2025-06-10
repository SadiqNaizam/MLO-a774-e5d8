import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import new pages
import CameraScreen from "./pages/CameraScreen";
import ChatListScreen from "./pages/ChatListScreen";
import ChatScreen from "./pages/ChatScreen";
import StoriesScreen from "./pages/StoriesScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to CameraScreen */}
          <Route path="/" element={<CameraScreen />} />
          <Route path="/camera" element={<CameraScreen />} /> 
          <Route path="/chat-list" element={<ChatListScreen />} />
          <Route path="/chat/:chatId" element={<ChatScreen />} /> {/* Dynamic route for specific chats */}
          <Route path="/chat" element={<ChatScreen />} /> {/* Fallback or general chat screen */}
          <Route path="/stories" element={<StoriesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;