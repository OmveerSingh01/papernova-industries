import Image from "next/image";
import { Award, Leaf, ShieldCheck, Truck } from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import PrimaryButton from "../ui/PrimaryButton";
import SectionBadge from "../ui/SectionBadge";

const features = [
  {
    title: "Premium Quality",
    icon: Award,
  },
  {
    title: "Sustainable Manufacturing",
    icon: Leaf,
  },
  {
    title: "Trusted Reliability",
    icon: ShieldCheck,
  },
  {
    title: "Nationwide Distribution",
    icon: Truck,
  },
];

export default function About() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <SectionBadge>About Us</SectionBadge>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Manufacturing Excellence.
              <br />
              Delivering Trust.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              PaperNova Industries is committed to delivering premium paper
              products through modern manufacturing, strict quality standards,
              and sustainable production practices. We proudly serve educational
              institutions, publishers, offices, and industries across the
              country.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="flex items-center gap-4 p-5"
                  >
                    <div className="rounded-full bg-green-100 p-3">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>

                    <span className="font-semibold text-gray-800">
                      {feature.title}
                    </span>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10">
              <PrimaryButton>Learn More</PrimaryButton>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/about-factory.jpg"
                alt="Paper Factory"
                width={900}
                height={700}
                className="h-[650px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 hidden rounded-3xl bg-white p-8 shadow-2xl lg:block">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-green-600">15+</h3>
                  <p className="mt-2 text-sm text-gray-600">Years</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-green-600">500+</h3>
                  <p className="mt-2 text-sm text-gray-600">Clients</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-green-600">25</h3>
                  <p className="mt-2 text-sm text-gray-600">States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}