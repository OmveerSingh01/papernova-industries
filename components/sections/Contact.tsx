"use client";

import { useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "/api/inquiries",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to submit inquiry."
        );
      }

      /*
       * Success
       */

      setSuccess(
        "Thank you! Your inquiry has been submitted successfully. Our team will contact you soon."
      );

      /*
       * Clear form
       */

      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Inquiry submission error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact">

      {/* Header */}

      <div className="text-center">

        <SectionBadge>
          Contact Us
        </SectionBadge>

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
            Whether you're looking for
            premium notebooks, office
            stationery, or customized
            paper products, we'd love to
            hear from you.
          </p>

          <div className="mt-8 space-y-5">

            <div className="transition-transform duration-300 hover:translate-x-2">

              <ContactInfoCard
                icon={
                  <Phone size={22} />
                }
                title="Phone"
                value="+91 98765 XXXXX"
              />

            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">

              <ContactInfoCard
                icon={
                  <Mail size={22} />
                }
                title="Email"
                value="info@papernova.com"
              />

            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">

              <ContactInfoCard
                icon={
                  <MapPin size={22} />
                }
                title="Address"
                value="Jaipur, Rajasthan, India"
              />

            </div>

            <div className="transition-transform duration-300 hover:translate-x-2">

              <ContactInfoCard
                icon={
                  <Clock size={22} />
                }
                title="Business Hours"
                value="Mon – Sat • 9:00 AM – 6:00 PM"
              />

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Success */}

            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

                <CheckCircle
                  size={22}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-sm font-medium">
                  {success}
                </p>

              </div>
            )}

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Name */}

            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            {/* Email */}

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* Company */}

            <Input
              label="Company Name"
              name="company"
              placeholder="Enter your company"
              value={form.company}
              onChange={handleChange}
            />

            {/* Phone */}

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 98765 XXXXX"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Message */}

            <TextArea
              label="Message"
              name="message"
              placeholder="Tell us about your requirements..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />

            {/* Submit */}

            <div className="pt-2">

              <PrimaryButton
                type="submit"
                disabled={loading}
                className="w-full justify-center gap-2"
              >
                {loading
                  ? "Sending..."
                  : "Send Inquiry"}

                <Send size={18} />

              </PrimaryButton>

            </div>

          </form>

        </div>

      </div>

    </Section>
  );
}