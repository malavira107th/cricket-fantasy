import { Link } from "wouter";
import { APP_LOGO, APP_TITLE, COMPANY_NAME, COMPANY_ADDRESS, TAGLINE } from "@/const";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
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
            <div className="flex flex-col items-start gap-3 mb-4">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-auto" />
            </div>
            <div className="text-sm text-white/80 space-y-2">
              <p className="font-semibold text-white">{COMPANY_NAME}</p>
              <p className="italic text-secondary">{TAGLINE}</p>
              <p className="mt-3">{COMPANY_ADDRESS}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 pb-4">
          <p className="text-sm text-white/70 leading-relaxed">
            <span className="font-semibold text-white">Legal Disclaimer:</span> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
          </p>
        </div>

        <div className="border-t border-white/20 pt-4">
          <p className="text-sm text-white/70 text-center">
            © 2025 Sports IQ Play Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
