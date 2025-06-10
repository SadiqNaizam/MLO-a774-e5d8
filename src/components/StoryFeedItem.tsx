import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card"; // Optional: if story items have a card-like bg

interface StoryFeedItemProps {
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  storyPreviewUrl?: string; // URL to an image or video thumbnail for the story
  isViewed?: boolean;
  timestamp?: string; // e.g., "2h ago"
  onPress: (userId: string) => void;
}

const StoryFeedItem: React.FC<StoryFeedItemProps> = ({
  userId,
  userName,
  userAvatarUrl,
  storyPreviewUrl, // Not used in this simple layout, but good to have for richer previews
  isViewed = false,
  timestamp,
  onPress,
}) => {
  console.log("Rendering StoryFeedItem for user:", userName);

  // Ring color changes if story is viewed or not
  const ringColorClass = isViewed ? 'ring-gray-300' : 'ring-pink-500 hover:ring-pink-600';

  return (
    <button
      onClick={() => onPress(userId)}
      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`View ${userName}'s story`}
    >
      <div className={`relative p-0.5 rounded-full ring-2 ${ringColorClass} ring-offset-2 ring-offset-background transition-all`}>
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
          <AvatarImage src={userAvatarUrl} alt={`${userName}'s avatar`} />
          <AvatarFallback>{userName?.substring(0, 2).toUpperCase() || '??'}</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs sm:text-sm font-medium truncate max-w-[60px] sm:max-w-[80px]">{userName}</span>
      {timestamp && <span className="text-xs text-muted-foreground">{timestamp}</span>}
    </button>
  );
};
export default StoryFeedItem;