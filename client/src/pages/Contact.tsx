import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // In a real app, this would send to a backend
    toast.success("Message sent successfully! We'll get back to you within 24-48 hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

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

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-secondary transition-colors font-medium">
                Home
              </Link>
              <Link href="/faq" className="hover:text-secondary transition-colors font-medium">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-secondary transition-colors font-medium text-secondary">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary text-black hover:bg-secondary/90 font-semibold">
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions or need support? We're here to help!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your question or concern in detail..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full min-h-[150px]"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="bg-primary text-white hover:bg-primary/90 w-full md:w-auto px-10 py-6 text-lg font-semibold"
                    >
                      Send Message
                    </Button>

                    <p className="text-sm text-gray-600 mt-4">
                      * Required fields. We typically respond within 24-48 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">📧</div>
                    <h3 className="text-xl font-bold text-primary mb-2">Email Us</h3>
                    <p className="text-gray-700 text-sm mb-2">General Inquiries:</p>
                    <a href="mailto:support@sportsiqplay.com" className="text-primary font-semibold hover:underline">
                      support@sportsiqplay.com
                    </a>
                    <p className="text-gray-700 text-sm mt-3 mb-2">Legal & Privacy:</p>
                    <a href="mailto:legal@sportsiqplay.com" className="text-primary font-semibold hover:underline">
                      legal@sportsiqplay.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">🏢</div>
                    <h3 className="text-xl font-bold text-primary mb-2">Registered Office</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Sports IQ Play Private Limited<br/>
                      E-38/39, Rajiv Chowk<br/>
                      Inner Circle, Block E<br/>
                      Connaught Place<br/>
                      New Delhi, Delhi 110001<br/>
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">⏰</div>
                    <h3 className="text-xl font-bold text-primary mb-2">Response Time</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days (Monday-Friday).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Common Questions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">❓</div>
                  <h3 className="text-lg font-bold text-primary mb-2">General Questions</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Find answers to frequently asked questions about our platform
                  </p>
                  <Link href="/faq">
                    <Button variant="outline" className="w-full">
                      View FAQ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📖</div>
                  <h3 className="text-lg font-bold text-primary mb-2">How to Play</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Learn how to create teams, join contests, and score points
                  </p>
                  <Link href="/how-to-play">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="text-lg font-bold text-primary mb-2">About Us</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Learn more about Sports IQ Play and our mission
                  </p>
                  <Link href="/about">
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Support Categories */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">What Can We Help You With?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-semibold text-gray-900 mb-1">Account Issues</h4>
                <p className="text-sm text-gray-600">Login problems, password reset, account verification</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏏</div>
                <h4 className="font-semibold text-gray-900 mb-1">Contest Help</h4>
                <p className="text-sm text-gray-600">Joining contests, team creation, scoring questions</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">⚖️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Legal & Privacy</h4>
                <p className="text-sm text-gray-600">Terms, privacy policy, data deletion requests</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🐛</div>
                <h4 className="font-semibold text-gray-900 mb-1">Technical Issues</h4>
                <p className="text-sm text-gray-600">Bugs, errors, website not loading properly</p>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section>
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Before You Contact Us</h2>
                <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                  To help us assist you faster, please check our FAQ page first. Many common questions are already answered there. If you still need help, feel free to reach out!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/faq">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Browse FAQ
                    </Button>
                  </Link>
                  <Link href="/how-to-play">
                    <Button variant="outline">
                      How to Play Guide
                    </Button>
                  </Link>
                  <Link href="/responsible-gaming">
                    <Button variant="outline">
                      Responsible Gaming
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-secondary transition-colors">Responsible Gaming</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Support</Link></li>
                <li><Link href="/signup" className="hover:text-secondary transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-secondary transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="text-sm text-white/80 space-y-2">
                <img src="/logo.png" alt="Sports IQ Play" className="h-16 w-auto mb-3" />
                <p className="font-semibold text-white">SDSURABHI INFRA PRIVATE LIMITED</p>
                <p className="text-white/60 text-xs">Trading As: Sports IQ Play</p>
                <p className="text-white/60 text-xs">Trading As: Sports IQ Play</p>
                <p className="text-secondary">Test Your Cricket IQ</p>
                <p className="mt-3">48/2, Bijnour, Ayodhya Puri 2, Lucknow, Uttar Pradesh 226008, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70 leading-relaxed">
          {/* Authorized Advertising Partner */}
          <div className="border-t border-white/20 pt-6 pb-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Operated by:</span> <a href="https://sdsurabhi.in/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">SDSURABHI INFRA PRIVATE LIMITED</a>
            </p>
            <p className="text-xs text-white/60 mt-1">
              CIN: U41002UP2023PTC194590 | GST: 09ABMCS3759A1Z4
            </p>
          </div>


              <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-white/70 text-center">
              © 2025 SDSURABHI INFRA PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
