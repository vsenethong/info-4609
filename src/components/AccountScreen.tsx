import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Mail, 
  CreditCard, 
  History, 
  Settings, 
  LogOut,
  ChevronRight,
  GraduationCap
} from "lucide-react";

interface AccountScreenProps {
  isLoggedIn: boolean;
  userEmail: string;
  userName: string;
  userAllergens: string[];
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  onUpdateAllergens: (allergens: string[]) => void;
  onOpenPreferences: () => void;
}

export function AccountScreen({ 
  isLoggedIn, 
  userEmail, 
  userName,
  userAllergens,
  onLogin, 
  onLogout,
  onUpdateAllergens,
  onOpenPreferences
}: AccountScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <div className="text-center pt-8 pb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4" style={{ backgroundColor: '#CFB87C' }}>
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-2">University of Colorado Boulder Login</h1>
          <p className="text-neutral-600">Sign in with your school account</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">School Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="buff1234@colorado.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-100">
          <h3 className="text-sm mb-2">Student Benefits</h3>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li>• Skip the line with mobile ordering</li>
            <li>• Earn rewards points</li>
            <li>• Save favorite orders</li>
          </ul>
        </Card>

        <div className="text-center text-sm text-neutral-600">
          <p>Don't have an account?</p>
          <Button variant="link" className="p-0 h-auto">
            Register with your school email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center pt-8 pb-6">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="text-2xl text-white" style={{ backgroundColor: '#CFB87C'}}>
            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="mb-1">{userName}</h2>
        <p className="text-sm text-neutral-600">{userEmail}</p>
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            <GraduationCap className="h-4 w-4" />
            Student Account
          </span>
        </div>
      </div>

      {/* Account Options */}
      <div className="space-y-2">
        <Card className="divide-y">
          <button className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-neutral-600" />
              <span>Profile Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </button>
          
          <button className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-neutral-600" />
              <span>Payment Methods</span>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </button>
          
          <button className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-neutral-600" />
              <span>Order History</span>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </button>
          
          <button onClick={
              onOpenPreferences}
              className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-neutral-600" />
              <span>Preferences</span>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </button>
        </Card>
      </div>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-white-50 border-purple-100" style={{ backgroundColor: '#CFB87C'}}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm">Rewards Points</h3>
          <span className="text-xs bg-black-200 text-white-10 px-2 py-1 rounded-full">
            Gold Member
          </span>
        </div>
        <div className="text-3xl mb-1">350 pts</div>
        <p className="text-sm text-neutral-600">150 points until next free drink</p>
      </Card>

      <Button 
        variant="outline" 
        className="w-full" 
        size="lg"
        onClick={onLogout}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
