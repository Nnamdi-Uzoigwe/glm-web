import DonationForm from "./DonationForm";
import DonationHero from "./DonationHero";
import DonationSidebar from "./DonationSidebar";


export const metadata = {
  title: "Give | Gospel Light Ministries",
  description:
    "Partner with Gospel Light Ministries. Your generosity fuels the Gospel across nations.",
};

export default function DonationPage() {
  return (
    <main>
      <DonationHero />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <DonationForm />
            <DonationSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}