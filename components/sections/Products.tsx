import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

const products = [
  {
    title: "Premium Notebooks",
    category: "Education",
    badge: "Ideal for Educational Institutions",
    image: "/images/products/notebook.jpg",
    description:
      "High-quality notebooks designed for students, educational institutions, and professionals.",
  },
  {
    title: "Copier & Printing Paper",
    category: "Office",
    badge: "Bulk Supply Available",
    image: "/images/products/copier-paper.jpg",
    description:
      "Premium A4 paper offering exceptional print quality for everyday office and business needs.",
  },
  {
    title: "File Folders",
    category: "Office",
    badge: "Corporate Office Solution",
    image: "/images/products/file-folder.jpg",
    description:
      "Durable file folders for efficient document organization in offices and institutions.",
  },
  {
    title: "Registers & Record Books",
    category: "Education",
    badge: "Trusted by Schools",
    image: "/images/products/register.jpg",
    description:
      "Strong, long-lasting registers suitable for schools, colleges, and commercial use.",
  },
  {
    title: "Custom Printed Stationery",
    category: "Business",
    badge: "Custom Branding Available",
    image: "/images/products/custom-stationery.jpg",
    description:
      "Customized stationery solutions tailored to your organization's branding requirements.",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="bg-gray-50 py-24"
    >
      <Container>
        <div className="text-center">
          <SectionBadge>Our Products</SectionBadge>

          <SectionTitle
            title="Premium Paper Products for Every Industry"
            subtitle="From premium notebooks to customized stationery, our products are crafted to meet the evolving needs of educational institutions, corporate offices, publishers, wholesalers, and businesses across India."
          />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                />

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-bold leading-tight text-slate-900">
                  {product.title}
                </h3>

                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
                  {product.description}
                </p>

                {/* Product Badge */}
                <span className="mt-6 inline-flex w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {product.badge}
                </span>

                {/* CTA */}
                <button className="mt-8 inline-flex items-center gap-2 font-semibold text-green-600 transition-all duration-300 hover:gap-3 hover:text-green-700">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}