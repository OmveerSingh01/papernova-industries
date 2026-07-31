import {
  FileStack,
  Factory,
  ShieldCheck,
  Package,
  Truck,
} from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

const processSteps = [
  {
    title: "Paper Procurement",
    description:
      "Premium paper and paperboard are sourced from certified and trusted suppliers.",
    icon: FileStack,
  },
  {
    title: "Product Manufacturing",
    description:
      "Paper is cut, printed, laminated, folded, and transformed into high-quality finished products.",
    icon: Factory,
  },
  {
    title: "Quality Inspection",
    description:
      "Every product undergoes rigorous quality checks to ensure consistency and durability.",
    icon: ShieldCheck,
  },
  {
    title: "Packaging",
    description:
      "Finished products are carefully packed to ensure safe storage and transportation.",
    icon: Package,
  },
  {
    title: "Distribution",
    description:
      "Products are delivered efficiently to schools, offices, distributors, and businesses nationwide.",
    icon: Truck,
  },
];

export default function ManufacturingProcess() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="text-center">
          <SectionBadge>Our Process</SectionBadge>

          <SectionTitle
            title="How We Create Premium Paper Products"
            subtitle="Every product follows a carefully managed production process to ensure outstanding quality, precision, and customer satisfaction."
            align="center"
          />
        </div>

        <div className="relative mt-20">

          {/* Timeline */}
          <div className="absolute left-0 right-0 top-12 hidden h-1 rounded-full bg-gradient-to-r from-green-200 via-green-500 to-green-200 lg:block" />

          <div className="relative grid gap-10 lg:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative">

                  {/* Step Number */}
                  <div className="absolute left-1/2 top-0 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-5 items-center justify-center rounded-full border-4 border-white bg-green-600 text-sm font-bold text-white shadow-lg">
                    {index + 1}
                  </div>

                  <Card className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 pt-14 text-center transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 transition-all duration-500 group-hover:scale-110 group-hover:bg-green-600">
                      <Icon
                        size={38}
                        className="text-green-600 transition-colors duration-500 group-hover:text-white"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 flex-1 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}