import Accordion from "../ui/Accordion";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

const faqItems = [
  {
    question: "Do you offer customized stationery products?",
    answer:
      "Yes. We provide customized notebooks, office stationery, and branded paper products tailored to your business or institutional requirements.",
  },
  {
    question: "Can you fulfill bulk orders?",
    answer:
      "Absolutely. We specialize in large-volume manufacturing and timely delivery for educational institutions, corporate organizations, distributors, and wholesalers.",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We work with schools, colleges, corporate offices, publishing houses, distributors, retailers, and manufacturing businesses across India.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes. Our logistics network enables reliable delivery to customers in multiple states across the country.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Simply contact our team using the contact form below or reach us through our phone number or email. We'll respond with a customized quotation based on your requirements.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-gray-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Frequently Asked Questions</SectionBadge>

          <SectionTitle
            title="Everything You Need to Know"
            subtitle="Find answers to the questions we receive most often about our products, services, delivery, and bulk order process."
            align="center"
          />
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion items={faqItems} />
        </div>
      </Container>
    </section>
  );
}