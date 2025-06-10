import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Custom Header
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus } from 'lucide-react';

// Placeholder data for chat list
const placeholderChats = [
  { id: '1', name: 'Alice Wonderland', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,face', lastMessage: 'See you tomorrow!', unreadCount: 2, lastMessageType: 'text', timestamp: '10m ago' },
  { id: '2', name: 'Bob The Builder', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,face', lastMessage: 'Sent a Snap', unreadCount: 0, lastMessageType: 'snap', timestamp: '1h ago' },
  { id: '3', name: 'Charlie Brown', avatarUrl: 'https://source.unsplash.com/random/100x100/?boy,face', lastMessage: 'Okay!', unreadCount: 5, lastMessageType: 'text', timestamp: '3h ago' },
  { id: '4', name: 'Diana Prince', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,hero', lastMessage: 'Received a Snap', unreadCount: 0, lastMessageType: 'snap-viewed', timestamp: 'yesterday' },
];

const ChatListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  console.log('ChatListScreen loaded');

  const filteredChats = placeholderChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatSelect = (chatId: string) => {
    navigate(`/chat/${chatId}`); // Navigate to specific chat
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        title="Chat"
        showBackButton={false} // Or true if navigating from somewhere else to here
        onBackClick={() => navigate(-1)} // Example back navigation
        actions={
          <>
            <Button variant="ghost" size="icon" aria-label="Add Friend">
              <UserPlus className="h-5 w-5" />
            </Button>
          </>
        }
      />

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
            aria-label="Search chats"
          />
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-2">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <Card key={chat.id} className="hover:bg-muted cursor-pointer" onClick={() => handleChatSelect(chat.id)}>
                <CardContent className="p-3 flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.avatarUrl} alt={chat.name} />
                    <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{chat.name}</p>
                    <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {chat.lastMessageType === 'snap' ? 'Snap' : 
                       chat.lastMessageType === 'snap-viewed' ? 'Opened Snap' : chat.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-muted-foreground">
                    <span>{chat.timestamp}</span>
                    {chat.unreadCount > 0 && (
                      <Badge variant="default" className="mt-1 bg-blue-500 text-white">{chat.unreadCount}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No chats found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatListScreen;