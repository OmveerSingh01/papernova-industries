import Image from "next/image";
import { Award, Leaf, ShieldCheck, Truck } from "lucide-react";

import Card from "../ui/Card";
import Section from "../ui/Section";
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
    <Section
      id="about"
      background="gray"
    >
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}

        <div>
          <SectionBadge>About Us</SectionBadge>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Manufacturing Excellence.
            <br />
            <span className="text-green-600">
              Delivering Trust.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            PaperNova Industries is committed to delivering premium paper
            products through modern manufacturing, strict quality standards,
            and sustainable production practices. We proudly serve educational
            institutions, publishers, offices, and industries across India with
            a strong focus on quality, reliability, and customer satisfaction.
          </p>

          {/* Features */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl"
                >
                  <div className="rounded-full bg-green-100 p-3 transition-all duration-500 group-hover:bg-green-600">
                    <Icon className="h-6 w-6 text-green-600 transition-colors duration-500 group-hover:text-white" />
                  </div>

                  <span className="font-semibold text-slate-800">
                    {feature.title}
                  </span>
                </Card>
              );
            })}
          </div>

          <div className="mt-10">
            <PrimaryButton>
              Learn More
            </PrimaryButton>
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
              className="h-[650px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating Stats */}

          <div className="absolute -bottom-8 -left-8 hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl lg:block">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-green-600">
                  15+
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Years
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-600">
                  500+
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Clients
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-600">
                  25
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  States
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}