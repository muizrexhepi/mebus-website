import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const InfoTabs = () => {
  return (
    <Tabs defaultValue="general" className="mb-12">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-max">
        <TabsTrigger value="general">General Info</TabsTrigger>
        <TabsTrigger value="booking">Booking Process</TabsTrigger>
        <TabsTrigger value="manage">Manage Bookings</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Learn about our services and policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>About Our Bus Service</AccordionTrigger>
                <AccordionContent>
                  We offer reliable and comfortable bus transportation services
                  across multiple cities. Our fleet consists of modern buses
                  equipped with amenities such as Wi-Fi, power outlets, and
                  onboard entertainment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Routes and Destinations</AccordionTrigger>
                <AccordionContent>
                  We operate routes connecting major cities and popular
                  destinations. To view our current routes, please visit the
                  &quot;Routes&quot; section of our website or mobile app.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Luggage Policy</AccordionTrigger>
                <AccordionContent>
                  Each passenger is allowed one piece of luggage (max. 20kg) for
                  the luggage compartment and one piece of hand luggage (max.
                  7kg) to take on board. Additional or oversized luggage may
                  incur extra fees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Pet Policy</AccordionTrigger>
                <AccordionContent>
                  Only service animals are allowed on our buses. Pets, including
                  emotional support animals, are not permitted for the comfort
                  and safety of all passengers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="booking">
        <Card>
          <CardHeader>
            <CardTitle>Booking Process</CardTitle>
            <CardDescription>
              Learn how to book your bus tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Book a Ticket</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Go to our website or open our mobile app</li>
                    <li>Enter your departure and arrival locations</li>
                    <li>Select your travel date</li>
                    <li>Choose your preferred bus and seats</li>
                    <li>Enter passenger details</li>
                    <li>Select any add-ons (e.g., extra luggage)</li>
                    <li>Review your booking details</li>
                    <li>Proceed to payment</li>
                    <li>Receive your e-ticket via email</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Payment Methods</AccordionTrigger>
                <AccordionContent>
                  We accept various payment methods including:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Credit/Debit Cards (Visa, MasterCard, American Express)
                    </li>
                    <li>PayPal</li>
                    <li>Apple Pay and Google Pay (on mobile devices)</li>
                    <li>Bank transfers (for select routes)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Seat Selection</AccordionTrigger>
                <AccordionContent>
                  You can select your preferred seats during the booking
                  process. Seat selection is subject to availability and may
                  incur an additional fee for premium seats (e.g., extra
                  legroom).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Group Bookings</AccordionTrigger>
                <AccordionContent>
                  For groups of 10 or more, please contact our group booking
                  department at groups@busbooking.com. We offer special rates
                  and assistance for large group travel.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>Manage Bookings</CardTitle>
            <CardDescription>
              Learn how to modify or cancel your bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Modify a Booking</AccordionTrigger>
                <AccordionContent>
                  To modify your booking:
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Log in to your account on our website or app</li>
                    <li>Go to &quot;My Bookings&quot;</li>
                    <li>Select the booking you want to modify</li>
                    <li>Click on &quot;Modify Booking&quot;</li>
                    <li>Make your desired changes</li>
                    <li>Pay any difference in fare or fees</li>
                    <li>Receive a confirmation of your modified booking</li>
                  </ol>
                  Note: Modifications are subject to our change policy and may
                  incur fees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                <AccordionContent>
                  Our cancellation policy is as follows:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>More than 72 hours before departure: Full refund</li>
                    <li>24-72 hours before departure: 50% refund</li>
                    <li>Less than 24 hours before departure: No refund</li>
                  </ul>
                  To cancel a booking, log in to your account, go to &quot;My
                  Bookings,&quot; select the booking you want to cancel, and
                  click on &quot;Cancel Booking.&quot;
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Refund Process</AccordionTrigger>
                <AccordionContent>
                  Refunds are processed within 5-10 business days, depending on
                  your payment method. The refund will be issued to the original
                  form of payment used for the booking.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Lost Ticket</AccordionTrigger>
                <AccordionContent>
                  If you&apos;ve lost your e-ticket, you can easily retrieve it
                  by logging into your account and going to &quot;My
                  Bookings.&quot; From there, you can resend the e-ticket to
                  your email or download it directly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="faqs">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about our bus ticket booking
              service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How early should I arrive at the bus station?
                </AccordionTrigger>
                <AccordionContent>
                  We recommend arriving at least 15-30 minutes before your
                  scheduled departure time. This allows time for check-in,
                  luggage storage, and boarding. For popular routes or during
                  peak travel seasons, you may want to arrive up to 45 minutes
                  early.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I change the name on my ticket?
                </AccordionTrigger>
                <AccordionContent>
                  Name changes are generally not allowed for security reasons.
                  If you need to transfer your ticket to someone else,
                  you&apos;ll need to cancel your existing booking (subject to
                  our cancellation policy) and make a new booking under the new
                  passenger&apos;s name.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What happens if I miss my bus?
                </AccordionTrigger>
                <AccordionContent>
                  If you miss your bus, your ticket is typically considered
                  void. However, we understand that unexpected situations can
                  arise. Contact our customer service as soon as possible, and
                  we&apos;ll do our best to accommodate you on the next
                  available bus, subject to availability and possible additional
                  fees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Are there power outlets on the bus?
                </AccordionTrigger>
                <AccordionContent>
                  Most of our buses are equipped with power outlets for each
                  seat. However, availability may vary depending on the specific
                  bus and route. We recommend bringing a portable charger as a
                  backup, especially for longer journeys.
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-5">
                <AccordionTrigger>
                  Do you offer student discounts?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer student discounts on many of our routes. To be
                  eligible, you must have a valid student ID from a recognized
                  educational institution. The discount amount may vary
                  depending on the route and season. You can select the student
                  fare option during the booking process.
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
