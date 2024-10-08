import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Mebus - Luggage Policy",
  description:
    "Learn about Mebus' luggage policy, including rules for baggage allowances, restrictions, and guidelines for safe travel.",
  keywords:
    "Mebus, Luggage Policy, Baggage Allowance, Bus Travel, Travel Guidelines, Restricted Items",
  authors: [{ name: "Mebus" }],
  robots: "index, follow",
  openGraph: {
    title: "Mebus - Luggage Policy",
    description:
      "Understand the Mebus luggage policy for bus travelers, including baggage allowances, weight limits, and prohibited items.",
    url: "https://www.mebus.com/luggage-policy",
    type: "website",
    images: [
      {
        url: "https://www.mebus.com/images/luggage-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Mebus Luggage Policy",
      },
    ],
  },
};

export default function MebusLuggagePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Luggage Policy</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8">
          At Mebus, we aim to make your journey comfortable and hassle-free. Our
          luggage policy is designed to ensure that all passengers can travel
          with their necessary belongings while maintaining the safety and
          comfort of everyone on board.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a href="#allowance" className="text-blue-600 hover:underline">
              Luggage Allowance
            </a>
          </li>
          <li>
            <a href="#restrictions" className="text-blue-600 hover:underline">
              Restricted Items
            </a>
          </li>
          <li>
            <a href="#special-items" className="text-blue-600 hover:underline">
              Special Items
            </a>
          </li>
          <li>
            <a href="#liability" className="text-blue-600 hover:underline">
              Liability and Insurance
            </a>
          </li>
          <li>
            <a href="#faq" className="text-blue-600 hover:underline">
              Frequently Asked Questions
            </a>
          </li>
        </ol>

        <section id="allowance" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Luggage Allowance</h2>
          <p className="mb-4">Each passenger is allowed the following:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>One piece of carry-on luggage (max. 10 kg / 22 lbs)</li>
            <li>Two pieces of checked luggage (max. 20 kg / 44 lbs each)</li>
          </ul>
          <p className="mt-4">
            Carry-on luggage must fit in the overhead compartment or under the
            seat in front of you. Checked luggage will be stored in the bus's
            luggage compartment.
          </p>
        </section>

        <section id="restrictions" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Restricted Items</h2>
          <p className="mb-4">
            For the safety and comfort of all passengers, the following items
            are not allowed on Mebus vehicles:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Dangerous goods (explosives, flammable materials, etc.)</li>
            <li>Weapons of any kind</li>
            <li>Illegal substances</li>
            <li>Perishable items</li>
            <li>Oversized items that cannot fit in the luggage compartment</li>
          </ul>
        </section>

        <section id="special-items" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Special Items</h2>
          <p className="mb-4">
            We understand that some passengers may need to travel with special
            items. The following guidelines apply:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Bicycles: Must be dismantled and packed in a bicycle bag</li>
            <li>
              Musical instruments: Small instruments can be carried as hand
              luggage; larger instruments may require an extra seat (additional
              fees apply)
            </li>
            <li>
              Sports equipment: May be carried as checked luggage if within size
              and weight limits
            </li>
            <li>
              Wheelchairs and mobility aids: Can be transported free of charge
              in addition to the regular luggage allowance
            </li>
          </ul>
        </section>

        <section id="liability" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Liability and Insurance
          </h2>
          <p className="mb-4">
            Mebus takes reasonable care to ensure the safety of your luggage.
            However, we recommend that you:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not pack valuable items in your checked luggage</li>
            <li>
              Label all your luggage with your name and contact information
            </li>
            <li>
              Consider purchasing travel insurance to cover your belongings
            </li>
          </ul>
          <p className="mt-4">
            Our liability for lost or damaged luggage is limited in accordance
            with our Terms of Service. Please refer to our full Terms for more
            details.
          </p>
        </section>

        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Can I bring food and drinks on the bus?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can bring food and non-alcoholic drinks for personal
                consumption. However, we ask that you be considerate of other
                passengers and avoid foods with strong odors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What if I need to bring more luggage than the allowed amount?
              </AccordionTrigger>
              <AccordionContent>
                Additional luggage may be allowed for an extra fee, subject to
                available space. Please contact our customer service in advance
                to arrange for extra luggage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Are pets allowed on Mebus?</AccordionTrigger>
              <AccordionContent>
                Small pets in appropriate carriers that fit under the seat are
                allowed. Service animals are always welcome. Please inform us in
                advance if you're traveling with a pet or service animal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What happens if I lose something on the bus?
              </AccordionTrigger>
              <AccordionContent>
                If you realize you've left something on the bus, contact our
                customer service immediately. We'll do our best to locate your
                item, but we cannot guarantee recovery of lost items.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> September 13, 2024
          </p>
        </div>
      </div>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
