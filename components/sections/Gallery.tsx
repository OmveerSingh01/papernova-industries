import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Section from "../ui/Section";
import PrimaryButton from "../ui/PrimaryButton";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

const galleryItems = [
  {
    title: "Printing & Finishing",
    subtitle: "Precision in Every Detail",
    image: "/images/gallery/printing-process.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Quality Inspection",
    subtitle: "Ensuring Excellence",
    image: "/images/gallery/quality-inspection.jpg",
  },
  {
    title: "Finished Products",
    subtitle: "Crafted for Professionals",
    image: "/images/gallery/finished-products.jpg",
  },
  {
    title: "Packaging & Dispatch",
    subtitle: "Ready for Nationwide Delivery",
    image: "/images/gallery/packaging-dispatch.jpg",
  },
  {
    title: "Business Operations",
    subtitle: "Professional Collaboration",
    image: "/images/gallery/corporate-office.jpg",
  },
  {
    title: "Product Showroom",
    subtitle: "Explore Our Product Range",
    image: "/images/gallery/product-showroom.jpg",
    className: "md:col-span-2",
  },
];

export default function Gallery() {
  return (
    <Section
      id="gallery"
      background="gray"
    >
      {/* Heading */}

      <div className="text-center">
        <SectionBadge>Inside Our Company</SectionBadge>

        <SectionTitle
          title="Behind the Scenes at PaperNova"
          subtitle="Explore our production process, premium products, quality assurance, and the people committed to delivering excellence every day."
          align="center"
        />
      </div>

      {/* Gallery */}

      <div className="mt-16 grid auto-rows-[260px] gap-6 md:grid-cols-3">
        {galleryItems.map((item) => (
          <div
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] ${
              item.className ?? ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content */}

            <div className="absolute bottom-0 left-0 right-0 translate-y-8 p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-200">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}

      <div className="mt-24 rounded-3xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-16 text-center text-white shadow-2xl">
        <h3 className="text-4xl font-bold">
          Ready to Work With PaperNova Industries?
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-green-100">
          Whether you're looking for premium notebooks, office stationery,
          or customized paper products, our team is ready to deliver quality
          solutions tailored to your business needs.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/contact">
            <PrimaryButton className="group">
              Get In Touch

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}