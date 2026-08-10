import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  {
    name: "Home",
    href: "/#",
  },
  {
    name: "About",
    href: "/#about",
  },
  {
    name: "Products",
    href: "/#products",
  },
  {
    name: "Contact",
    href: "/#contact",
  },
];

const products = [
  {
    name: "Premium Notebooks",
    href: "/#products",
  },
  {
    name: "Copier Paper",
    href: "/#products",
  },
  {
    name: "File Folders",
    href: "/#products",
  },
  {
    name: "Registers",
    href: "/#products",
  },
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
    <footer className="bg-slate-950 text-gray-400">

      {/* Main Footer */}

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Company */}

        <div>
          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="PaperNova Industries Logo"
              width={56}
              height={56}
              className="rounded-full"
            />

            <h3 className="text-xl font-bold text-white">
              PaperNova Industries
            </h3>
          </Link>

          <p className="mt-5 leading-relaxed text-gray-400">
            Manufacturing Excellence.
            <br />
            Delivering Trust.
          </p>

          {/* Social Links */}

          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h4 className="mb-5 text-lg font-semibold text-white">
            Quick Links
          </h4>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition-colors duration-300 hover:text-green-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}

        <div>
          <h4 className="mb-5 text-lg font-semibold text-white">
            Products
          </h4>

          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.name}>
                <Link
                  href={product.href}
                  className="transition-colors duration-300 hover:text-green-500"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h4 className="mb-5 text-lg font-semibold text-white">
            Contact
          </h4>

          <ul className="space-y-4 text-gray-400">
            <li>📞 +91 98765 XXXXX</li>

            <li>✉️ info@papernova.com</li>

            <li>
              📍 Jaipur, Rajasthan, India
            </li>
          </ul>

          {/* Request Quote */}

          <Link
            href="/#contact"
            className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Divider */}

      <div className="mx-auto max-w-7xl border-t border-gray-800" />

      {/* Bottom Bar */}

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 text-sm md:flex-row">

        {/* Copyright */}

        <p className="text-gray-500">
          © {new Date().getFullYear()} PaperNova
          Industries. All Rights Reserved.
        </p>

        {/* Legal Links */}

        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="transition-colors duration-300 hover:text-green-500"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-and-conditions"
            className="transition-colors duration-300 hover:text-green-500"
          >
            Terms & Conditions
          </Link>
        </div>

      </div>

      {/* Developer Credit */}

      <div className="pb-8 text-center text-sm text-gray-500">

        Designed & Developed with{" "}
        <span className="text-pink-500">
          ❤️
        </span>{" "}
        by{" "}
        <span className="font-semibold text-gray-300">
          Omveer Singh
        </span>{" "}
        using{" "}
        <span className="text-gray-300">
          Next.js
        </span>{" "}
        &{" "}
        <span className="text-gray-300">
          Tailwind CSS
        </span>
        .

      </div>

    </footer>
  );
}