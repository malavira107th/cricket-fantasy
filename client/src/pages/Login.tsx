import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Simple login simulation (in production, this would be an API call)
    // For demo purposes, any email/password combination works
    const userData = {
      username: formData.email.split('@')[0],
      email: formData.email,
      state: "Maharashtra",
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('userSession', JSON.stringify(userData));
    toast.success("Login successful! Welcome back!");
    
    // Redirect to dashboard
    setTimeout(() => {
      setLocation('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-14 w-auto" />
              <div className="text-xl font-bold hidden sm:block">
                <span className="text-white">Sports IQ </span>
                <span className="text-secondary">Play</span>
              </div>
            </Link>

            <Link href="/signup">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                New here? Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
              <CardDescription className="text-base">
                Login to continue your cricket fantasy journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6">
                  Login
                </Button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline font-semibold">
                    Sign up for free
                  </Link>
                </p>

                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-gray-700 text-center">
                    🎮 <strong>100% Free to Play</strong> • No Prizes • Pure Entertainment
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
