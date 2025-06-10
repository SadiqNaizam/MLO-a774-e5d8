import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Custom Header
import SnapcodeDisplay from '@/components/SnapcodeDisplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Users, Settings, LogOut, Star, ShieldCheck, HelpCircle } from 'lucide-react';

// Placeholder user data
const userProfile = {
  displayName: 'Current User',
  username: 'snapfan123',
  avatarUrl: 'https://source.unsplash.com/random/200x200/?profile,me',
  snapcodeImageUrl: 'https://www.snapchat.com/ghost/img/snapcode.svg', // Placeholder generic Snapcode
  bio: 'Lover of snaps and filters! ✨',
  friendCount: 123,
};

const ProfileScreen = () => {
  const navigate = useNavigate();
  console.log('ProfileScreen loaded');

  const menuItems = [
    { label: 'My Friends', icon: <Users className="mr-2 h-5 w-5" />, action: () => console.log('My Friends clicked') },
    { label: 'Add Friends', icon: <Users className="mr-2 h-5 w-5" />, action: () => console.log('Add Friends clicked') }, // Or UserPlus icon
    { label: 'My Public Profile', icon: <Star className="mr-2 h-5 w-5" />, action: () => console.log('My Public Profile') },
    { label: 'Privacy Settings', icon: <ShieldCheck className="mr-2 h-5 w-5" />, action: () => console.log('Privacy clicked') },
    { label: 'Settings', icon: <Settings className="mr-2 h-5 w-5" />, action: () => console.log('Settings clicked') },
    { label: 'Support', icon: <HelpCircle className="mr-2 h-5 w-5" />, action: () => console.log('Support clicked') },
    { label: 'Log Out', icon: <LogOut className="mr-2 h-5 w-5 text-red-500" />, action: () => console.log('Log Out clicked'), variant: 'destructive' as const },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header
        title="Profile"
        showBackButton={true}
        onBackClick={() => navigate(-1)} // Go back to previous screen (e.g., Camera)
      />

      <main className="flex-grow p-4 md:p-6 space-y-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-yellow-400">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.displayName} />
              <AvatarFallback>{userProfile.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
              <p className="text-muted-foreground">@{userProfile.username}</p>
              <p className="text-sm text-muted-foreground mt-1">{userProfile.bio}</p>
            </div>
            <SnapcodeDisplay snapcodeImageUrl={userProfile.snapcodeImageUrl} userName={userProfile.username} />
            <Button variant="outline" onClick={() => console.log('Share Snapcode')}>Share Snapcode</Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>My Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                {menuItems.slice(0,3).map((item, index) => (
                     <React.Fragment key={index}>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start text-base h-12 ${item.variant === 'destructive' ? 'text-red-500 hover:bg-red-500/10 hover:text-red-600' : ''}`}
                            onClick={item.action}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                        {index < menuItems.slice(0,3).length -1 && <Separator />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Settings & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                 {menuItems.slice(3).map((item, index) => (
                     <React.Fragment key={index}>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start text-base h-12 ${item.variant === 'destructive' ? 'text-red-500 hover:bg-red-500/10 hover:text-red-600' : ''}`}
                            onClick={item.action}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                        {index < menuItems.slice(3).length -1 && <Separator />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default ProfileScreen;