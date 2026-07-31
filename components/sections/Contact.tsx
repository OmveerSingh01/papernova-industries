import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import {
  ContactInfoCard,
  Input,
  PrimaryButton,
  Section,
  SectionBadge,
  SectionTitle,
  TextArea,
} from "../ui";

export default function Contact() {
  return (
    <Section
      id="contact"
      background="white"
    >
      <div className="text-center">
        <SectionBadge>Contact Us</SectionBadge>

        <SectionTitle
          title="Let's Build Something Great Together"
          subtitle="Have questions about our products or need a customized quotation? Our team is here to help you find the right paper solutions for your business."
          align="center"
        />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {/* Left Side */}

        <div>
          <h3 className="text-3xl font-bold text-slate-900">
            Get in Touch
          </h3>

          <p className="mt-4 leading-8 text-slate-600">
            Whether you're looking for premium notebooks, office stationery,
            or customized paper products, we'd love to hear from you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="transition-transform duration-300 hover:translate-x-2">
              <ContactInfoCard
                icon={<Phone size={22} />}
                title="Phone"
                value="+91 98765 XXXXX"
              />
            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">
              <ContactInfoCard
                icon={<Mail size={22} />}
                title="Email"
                value="info@papernova.com"
              />
            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">
              <ContactInfoCard
                icon={<MapPin size={22} />}
                title="Address"
                value="Jaipur, Rajasthan, India"
              />
            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">
              <ContactInfoCard
                icon={<Clock size={22} />}
                title="Business Hours"
                value="Mon – Sat • 9:00 AM – 6:00 PM"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl">
          <form className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />

            <Input
              label="Company Name"
              placeholder="Enter your company"
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 XXXXX"
            />

            <TextArea
              label="Message"
              placeholder="Tell us about your requirements..."
              rows={5}
              required
            />

            <div className="pt-2">
              <PrimaryButton className="w-full justify-center gap-2">
                Send Inquiry
                <Send size={18} />
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}