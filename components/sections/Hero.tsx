import Link from "next/link";
import StatsCard from "@/components/common/StatsCard";

export default function Hero() {
  const products = [
    "📄 A4 Paper",
    "📚 Notebooks",
    "📦 Packaging Paper",
    "🧻 Tissue Products",
  ];

  const stats = [
    {
      value: "15+",
      label: "Years Experience",
    },
    {
      value: "500+",
      label: "Happy Clients",
    },
    {
      value: "50+",
      label: "Product Categories",
    },
    {
      value: "25",
      label: "States Served",
    },
  ];

  return (
    <section
      className="relative min-h-[88vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pt-20 pb-12 text-white">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-green-400/40 bg-green-500/10 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              PaperNova Industries
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Manufacturing Premium

            <span className="mt-2 block text-green-400">
              Paper Solutions
            </span>

            <span className="mt-2 block text-white">
              for Modern Businesses
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-200">
            PaperNova Industries manufactures premium-quality paper products
            for educational institutions, corporate offices, publishers,
            wholesalers, and industrial businesses across India with an
            uncompromising commitment to quality, innovation, and timely
            delivery.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">

            {/* Explore Products */}
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg"
            >
              Explore Products
            </Link>

            {/* Request Quote */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-slate-900"
            >
              Request Quote
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="relative md:absolute md:bottom-0 md:left-0 w-full border-t border-white/10 bg-black/25 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6 py-4">
          {products.map((product) => (
            <div
              key={product}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:bg-green-600/30"
            >
              {product}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}