import { Scale, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { LINK_NAMESPACES } from '../config/linkNamespaces';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">I Want My Lawyer</span>
            </div>
            <p className="text-gray-400 text-sm">
              Official storefront for I Want My Lawyer Present apparel,
              accessories, and digital drops.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#shop" className="hover:text-yellow-400 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#video-clips" className="hover:text-yellow-400 transition-colors">
                  Video Clips
                </a>
              </li>
              <li>
                <a href="#checkout" className="hover:text-yellow-400 transition-colors">
                  Checkout
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href={LINK_NAMESPACES.facebookPageUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={LINK_NAMESPACES.instagramPageUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Official Domain:
              <br />
              <a
                href={LINK_NAMESPACES.siteDomain}
                target="_blank"
                rel="noreferrer"
                className="text-yellow-400 font-semibold"
              >
                iwantmylawyerpresent.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} I Want My Lawyer Present. All rights reserved.
            </p>
            <div className="flex flex-col items-center md:items-end gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="Powered by A MackProjekt"
              >
                <span className="w-5 h-5 rounded border border-gray-600 text-gray-400 text-[9px] font-bold grid place-items-center leading-none">
                  AM
                </span>
                <span className="text-[11px] tracking-wide uppercase">
                  AMP <span className="normal-case">Powered by A MackProjekt</span>
                </span>
              </a>
              <p className="text-gray-500 text-xs max-w-2xl text-center md:text-right">
                Product details, pricing, and availability may change without
                notice. Please review your order before submitting payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
