import PrimaryButton from "@/components/ui/PrimaryButton";
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
      className="relative min-h-[calc(100vh-72px)] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-6 pt-16 pb-32 text-white lg:pt-20">
        <div className="max-w-2xl">
          {/* Company Name */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
            PaperNova Industries
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Manufacturing Premium
            <span className="block text-green-400">
              Paper Solutions
            </span>
            <span className="block text-white">
              for Modern Businesses
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-200 md:text-xl">
            PaperNova Industries manufactures high-quality paper products for
            schools, offices, publishers, wholesalers, and industrial clients
            across India with a commitment to quality, innovation, and timely
            delivery.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton>
              Explore Products
            </PrimaryButton>

            <PrimaryButton variant="outline">
              Request Quote
            </PrimaryButton>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 lg:grid-cols-4">
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

      {/* Product Highlights */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-white/10 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6 py-6">
          {products.map((product) => (
            <div
              key={product}
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              {product}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}