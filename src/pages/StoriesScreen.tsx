import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Custom Header
import StoryFeedItem from '@/components/StoryFeedItem';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Settings2 } from 'lucide-react';

// Placeholder data for stories
const myStory = {
  userId: 'currentUser',
  userName: 'My Story',
  userAvatarUrl: 'https://source.unsplash.com/random/100x100/?profile,me', // User's avatar
  timestamp: 'Tap to add',
};

const friendStories = [
  { id: 's1', userId: 'friend1', userName: 'Elara Vance', userAvatarUrl: 'https://source.unsplash.com/random/100x100/?woman,nature', storyPreviewUrl: '', isViewed: false, timestamp: '2h ago' },
  { id: 's2', userId: 'friend2', userName: 'Jax Thorn', userAvatarUrl: 'https://source.unsplash.com/random/100x100/?man,city', storyPreviewUrl: '', isViewed: true, timestamp: '5h ago' },
  { id: 's3', userId: 'friend3', userName: 'Lyra Moon', userAvatarUrl: 'https://source.unsplash.com/random/100x100/?woman,space', storyPreviewUrl: '', isViewed: false, timestamp: '15m ago' },
  { id: 's4', userId: 'friend4', userName: 'Orion Starr', userAvatarUrl: 'https://source.unsplash.com/random/100x100/?man,sky', storyPreviewUrl: '', isViewed: false, timestamp: 'Just now' },
];

const StoriesScreen = () => {
  const navigate = useNavigate();
  console.log('StoriesScreen loaded');

  const handleStoryPress = (userId: string) => {
    console.log(`View story for user: ${userId}`);
    // Navigate to story viewer: navigate(`/story/${userId}`);
  };

  const handleAddMyStory = () => {
    console.log('Add to My Story');
    // Navigate to camera or story creation flow
    navigate('/'); // Go to camera screen to create a snap for story
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        title="Stories"
        showBackButton={false}
        actions={
          <Button variant="ghost" size="icon" aria-label="Story Settings">
            <Settings2 className="h-5 w-5" />
          </Button>
        }
      />

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          {/* My Story Section */}
          <section>
            <h2 className="text-lg font-semibold mb-2 px-1">My Story</h2>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer" onClick={handleAddMyStory}>
              <div className="relative">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-dashed border-primary">
                  <AvatarImage src={myStory.userAvatarUrl} alt={myStory.userName} />
                  <AvatarFallback>{myStory.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                    <PlusCircle className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div>
                <p className="font-medium">{myStory.userName}</p>
                <p className="text-sm text-muted-foreground">{myStory.timestamp}</p>
              </div>
            </div>
          </section>

          {/* Friends' Stories Section */}
          <section>
            <h2 className="text-lg font-semibold mb-2 px-1">Friends</h2>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-1 pb-2">
                {friendStories.map(story => (
                    <StoryFeedItem
                    key={story.id}
                    userId={story.userId}
                    userName={story.userName}
                    userAvatarUrl={story.userAvatarUrl}
                    storyPreviewUrl={story.storyPreviewUrl}
                    isViewed={story.isViewed}
                    timestamp={story.timestamp}
                    onPress={handleStoryPress}
                    />
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {friendStories.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No stories from friends yet.</p>
            )}
          </section>

          {/* Potentially "Discover" or public stories section here */}

        </div>
      </ScrollArea>
       {/* Bottom Navigation (Consistent with CameraScreen for main app flow) */}
        <div className="sticky bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => navigate('/chat-list')} aria-label="Chat">
                <MessageSquare className="h-7 w-7" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => navigate('/')} aria-label="Camera">
                <Camera className="h-7 w-7" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary" aria-label="Stories">
                <PlaySquare className="h-7 w-7" />
            </Button>
        </div>
    </div>
  );
};

export default StoriesScreen;