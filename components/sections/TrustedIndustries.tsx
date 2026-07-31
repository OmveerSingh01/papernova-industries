import {
  School,
  Building2,
  BookOpen,
  Factory,
  Package,
  ShoppingCart,
} from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionDivider from "../ui/SectionDivider";
import SectionTitle from "../ui/SectionTitle";

const industries = [
  {
    title: "Schools & Colleges",
    icon: School,
    description:
      "Supplying premium notebooks, exam sheets, and educational paper products.",
  },
  {
    title: "Corporate Offices",
    icon: Building2,
    description:
      "Reliable office paper solutions designed for everyday business operations.",
  },
  {
    title: "Publishing Houses",
    icon: BookOpen,
    description:
      "High-quality printing paper trusted by publishers across the country.",
  },
  {
    title: "Manufacturing",
    icon: Factory,
    description:
      "Industrial-grade paper products supporting manufacturing processes.",
  },
  {
    title: "Packaging Industry",
    icon: Package,
    description:
      "Durable paper materials for sustainable packaging and shipping solutions.",
  },
  {
    title: "Wholesale Distribution",
    icon: ShoppingCart,
    description:
      "Bulk paper supply network delivering consistent quality nationwide.",
  },
];

export default function TrustedIndustries() {
  return (
    <>
      <SectionDivider />

      <section className="py-24">
        <Container>
          <div className="flex justify-center">
            <SectionBadge>Trusted Across Industries</SectionBadge>
          </div>

          <div className="mx-auto mt-6 max-w-4xl">
            <SectionTitle
              title="Delivering Quality Paper Solutions for Every Industry"
              subtitle="From education and publishing to packaging and manufacturing, PaperNova Industries is committed to providing premium paper products that businesses can rely on."
              align="center"
            />
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;

              return (
                <Card
                  key={industry.title}
                  className="group rounded-3xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-green-600 hover:shadow-2xl"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 transition-colors duration-300 group-hover:bg-green-600">
                    <Icon
                      size={38}
                      className="text-green-600 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {industry.title}
                  </h3>

                  <p className="leading-8 text-gray-600">
                    {industry.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}