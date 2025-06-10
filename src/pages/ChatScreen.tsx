import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Custom Header
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Potentially for chat bubbles
import { Send, Paperclip, Camera, Smile } from 'lucide-react';

// Placeholder message type
interface Message {
  id: string;
  sender: 'user' | 'friend';
  type: 'text' | 'snap' | 'image';
  content: string;
  timestamp: string;
  avatarUrl?: string;
}

// Placeholder data for a chat
const placeholderMessages: Message[] = [
  { id: 'm1', sender: 'friend', type: 'text', content: 'Hey! How are you?', timestamp: '10:00 AM', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,face' },
  { id: 'm2', sender: 'user', type: 'text', content: 'Hi! I am good, thanks! How about you?', timestamp: '10:01 AM', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,profile' },
  { id: 'm3', sender: 'friend', type: 'snap', content: 'Sent a Snap', timestamp: '10:02 AM', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,face' },
  { id: 'm4', sender: 'user', type: 'image', content: 'https://source.unsplash.com/random/300x200/?nature', timestamp: '10:05 AM', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,profile' },
];

// Placeholder friend data (in a real app, this would come from an API based on chatId)
const getFriendDetails = (chatId?: string) => {
    if (chatId === '1') return { name: 'Alice Wonderland', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,face' };
    if (chatId === '2') return { name: 'Bob The Builder', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,face' };
    if (chatId === '3') return { name: 'Charlie Brown', avatarUrl: 'https://source.unsplash.com/random/100x100/?boy,face' };
    return { name: 'Friend', avatarUrl: 'https://source.unsplash.com/random/100x100/?person' };
};


const ChatScreen = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(placeholderMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const friendDetails = getFriendDetails(chatId);
  console.log(`ChatScreen loaded for chat ID: ${chatId}`);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      type: 'text',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarUrl: 'https://source.unsplash.com/random/100x100/?man,profile' // User's avatar
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        title={friendDetails.name}
        subtitle="Online" // Or last seen
        showBackButton={true}
        onBackClick={() => navigate('/chat-list')}
        actions={
          <Avatar className="h-8 w-8">
            <AvatarImage src={friendDetails.avatarUrl} alt={friendDetails.name} />
            <AvatarFallback>{friendDetails.name.substring(0,1)}</AvatarFallback>
          </Avatar>
        }
      />

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'friend' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatarUrl} alt="Friend" />
                  <AvatarFallback>{friendDetails.name.substring(0,1)}</AvatarFallback>
                </Avatar>
              )}
              <Card className={`max-w-xs md:max-w-md p-3 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {msg.type === 'text' && <p className="text-sm">{msg.content}</p>}
                {msg.type === 'snap' && <p className="text-sm font-medium italic">{msg.content}</p>}
                {msg.type === 'image' && <img src={msg.content} alt="Sent image" className="rounded-md max-h-48" />}
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.timestamp}</p>
              </Card>
               {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatarUrl} alt="User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t bg-background flex items-center space-x-2">
        <Button variant="ghost" size="icon" aria-label="Open camera for Snap">
          <Camera className="h-5 w-5" />
        </Button>
        <div className="relative flex-grow">
            <Input
            type="text"
            placeholder="Send a chat..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="pr-10"
            aria-label="Message input"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" aria-label="Emoji">
                <Smile className="h-5 w-5 text-muted-foreground"/>
            </Button>
        </div>
        <Button variant="ghost" size="icon" aria-label="Attach media">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button size="icon" onClick={handleSendMessage} aria-label="Send message" className="bg-blue-500 hover:bg-blue-600">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatScreen;