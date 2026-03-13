import ContactForm from "./contact-form";
import ContactHero from "./contact-hero";
import ContactInfo from "./contact-info";
import ServiceTimes from "./service-times";

export const metadata = {
  title: "Contact Us | Gospel Light Ministries",
  description:
    "Reach out to Gospel Light Ministries — we'd love to hear from you. Find our address, service times, and send us a message.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      {/* Form + Info side by side */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <ServiceTimes />
    </main>
  );
}