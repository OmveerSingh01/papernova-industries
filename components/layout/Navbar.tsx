import Link from "next/link";
import Logo from "@/components/common/Logo";
import PrimaryButton from "@/components/ui/PrimaryButton";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Products", href: "#" },
  { name: "Gallery", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <PrimaryButton>
            Request Quote
          </PrimaryButton>
        </div>

      </div>
    </header>
  );
}