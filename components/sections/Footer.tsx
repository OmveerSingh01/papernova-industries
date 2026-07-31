import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const products = [
  { name: "Premium Notebooks", href: "/products" },
  { name: "Copier Paper", href: "/products" },
  { name: "File Folders", href: "/products" },
  { name: "Registers", href: "/products" },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png" // Replace with your logo path
                alt="PaperNova Industries Logo"
                width={44}
                height={44}
                className="rounded-full"
              />

              <div>
                <h3 className="text-xl font-bold text-white">
                  PaperNova Industries
                </h3>
              </div>
            </Link>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Manufacturing Excellence.
              <br />
              Delivering Trust.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-green-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Products
            </h4>

            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className="hover:text-green-500 transition-colors duration-300"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Contact
            </h4>

            <ul className="space-y-4 text-gray-400">
              <li>📞 +91 98765 XXXXX</li>
              <li>✉️ info@papernova.com</li>
              <li>📍 Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
<div className="mt-14 border-t border-gray-800 pt-8">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-sm text-gray-500">
      © 2026 PaperNova Industries. All Rights Reserved.
    </p>

    <div className="flex items-center gap-6 text-sm">
      <Link
        href="/privacy-policy"
        className="hover:text-green-500 transition-colors duration-300"
      >
        Privacy Policy
      </Link>

      <Link
        href="/terms-and-conditions"
        className="hover:text-green-500 transition-colors duration-300"
      >
        Terms & Conditions
      </Link>
    </div>
  </div>

  <p className="mt-5 text-center text-xs text-gray-500">
    Designed & Developed with{" "}
    <span className="text-red-500">❤️</span> by{" "}
    <span className="font-medium text-white">Omveer Singh</span>{" "}
    using{" "}
    <span className="font-medium text-white">Next.js</span> &{" "}
    <span className="font-medium text-white">Tailwind CSS</span>.
  </p>
</div>
      </div>
      
    </footer>
  );
}