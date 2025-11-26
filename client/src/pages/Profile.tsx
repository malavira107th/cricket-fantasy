import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    state: '',
    joinedDate: ''
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      setLocation('/login');
      return;
    }
    setIsLoggedIn(true);

    // Load user data
    const user = JSON.parse(userSession);
    setUserData(user);
  }, [setLocation]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update localStorage
    localStorage.setItem('userSession', JSON.stringify(userData));
    toast.success("Profile updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // In a real app, verify current password and update
    toast.success("Password changed successfully!");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem('userSession');
      localStorage.removeItem('myTeams');
      toast.success("Account deleted successfully");
      setLocation('/');
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Dashboard
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  localStorage.removeItem('userSession');
                  setLocation('/');
                }}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 flex-1">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <Input
                      type="text"
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <Input
                      type="text"
                      value={userData.state}
                      className="w-full bg-gray-100"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      State cannot be changed after registration
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Member Since
                    </label>
                    <Input
                      type="text"
                      value={new Date(userData.joinedDate).toLocaleDateString()}
                      className="w-full bg-gray-100"
                      disabled
                    />
                  </div>

                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full"
                      required
                      minLength={6}
                    />
                  </div>

                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle>Account Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {JSON.parse(localStorage.getItem('myTeams') || '[]').length}
                    </p>
                    <p className="text-gray-600 mt-1">Teams Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {JSON.parse(localStorage.getItem('myTeams') || '[]').length}
                    </p>
                    <p className="text-gray-600 mt-1">Contests Joined</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">0</p>
                    <p className="text-gray-600 mt-1">Total Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-white shadow-lg border-red-200">
              <CardHeader className="bg-red-600 text-white">
                <CardTitle>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Delete Account</h4>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="ml-4"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
