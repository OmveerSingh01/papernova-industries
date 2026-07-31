import { Quote, Star } from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

const stats = [
  {
    value: "500+",
    label: "Happy Clients",
  },
  {
    value: "15+",
    label: "Years Experience",
  },
  {
    value: "98%",
    label: "On-Time Delivery",
  },
  {
    value: "25+",
    label: "States Served",
  },
];

const testimonials = [
  {
    company: "ABC Educational Supplies",
    role: "School Distribution Partner",
    initials: "AE",
    review:
      "PaperNova has consistently delivered premium-quality stationery products with exceptional reliability. Their commitment to quality makes them a trusted business partner.",
  },
  {
    company: "Vertex Office Solutions",
    role: "Corporate Procurement Partner",
    initials: "VO",
    review:
      "From office stationery to customized printing solutions, every order has met our expectations. Their service is professional, dependable, and always on schedule.",
  },
  {
    company: "National Book Distributors",
    role: "Distribution Partner",
    initials: "NB",
    review:
      "The product quality, timely deliveries, and customer support have helped us serve our clients with confidence. We highly recommend PaperNova Industries.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="text-center">
          <SectionBadge>Testimonials</SectionBadge>

          <SectionTitle
            title="Trusted by Businesses Across India"
            subtitle="Our commitment to quality, reliability, and customer satisfaction has earned the trust of educational institutions, distributors, and corporate partners nationwide."
            align="center"
          />
        </div>

        {/* Statistics */}

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              <h3 className="text-4xl font-extrabold text-green-600">
                {stat.value}
              </h3>

              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-green-600" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Testimonials */}

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.company}
              className="relative pt-8"
            >
              {/* Floating Quote */}

              <div className="absolute left-8 top-0 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 shadow-xl transition-transform duration-500 hover:scale-110">
                <Quote
                  size={30}
                  className="text-white"
                />
              </div>

              <Card className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 pt-12 transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                {/* Stars */}

                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review */}

                <p className="mt-6 flex-1 text-[15px] leading-8 text-slate-600">
                  "{testimonial.review}"
                </p>

                {/* Client */}

                <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white transition-transform duration-500 group-hover:scale-110">
                    {testimonial.initials}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">
                      {testimonial.company}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}