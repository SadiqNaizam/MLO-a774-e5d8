import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreVertical, Search, UserPlus } from 'lucide-react'; // Example icons

interface HeaderProps {
  title?: string;
  subtitle?: string; // e.g., friend's name or status
  showBackButton?: boolean;
  onBackClick?: () => void;
  // Allow for custom actions on the right (e.g., buttons, menus)
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, showBackButton, onBackClick, actions }) => {
  console.log("Rendering Header with title:", title);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center px-4 sm:px-6">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-2" aria-label="Go back">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1">
          {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
        {actions ? (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        ) : (
          // Default placeholder for actions if none provided specifically
          // This part might be application-specific and removed if actions are always passed
          <div className="flex items-center space-x-1">
            {/* Example default actions, remove if not generic */}
            {/* <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVertical className="h-5 w-5" />
            </Button> */}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;