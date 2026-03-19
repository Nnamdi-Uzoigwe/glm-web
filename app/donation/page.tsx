// import DonationForm from "./DonationForm";
// import DonationHero from "./DonationHero";
// import DonationSidebar from "./DonationSidebar";


// export const metadata = {
//   title: "Give | Gospel Light Ministries",
//   description:
//     "Partner with Gospel Light Ministries. Your generosity fuels the Gospel across nations.",
// };

// export default function DonationPage() {
//   return (
//     <main>
//       <DonationHero />

//       <section className="bg-gray-50 py-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
//             <DonationForm />
//             <DonationSidebar />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


import { Suspense } from "react";
import DonationHero from "./DonationHero";
import DonationForm from "./DonationForm";
import DonationSidebar from "./DonationSidebar";

export default function DonationPage() {
  return (
    <main>
      <DonationHero />
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <Suspense fallback={
              <div className="bg-white rounded-2xl border border-gray-100 p-10 animate-pulse">
                <div className="h-8 bg-gray-100 rounded-xl w-48 mb-4" />
                <div className="h-4 bg-gray-100 rounded w-64 mb-8" />
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-xl" />
                  ))}
                </div>
              </div>
            }>
              <DonationForm />
            </Suspense>
            <DonationSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}