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
import { Button } from "../ui/button";
import { HelpCircle } from "lucide-react";

const InfoTabs = () => {
  return (
    <Tabs defaultValue="general" className="mb-12">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-max">
        <TabsTrigger value="general">General Info</TabsTrigger>
        <TabsTrigger value="booking">Booking Process</TabsTrigger>
        <TabsTrigger value="manage">Manage Bookings</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
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
      <TabsContent value="support">
        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>Get additional help and support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Contact Customer Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our customer service team is available 24/7 to assist you.
                  </p>
                  <Button className="w-full">
                    <HelpCircle className="mr-2 h-4 w-4" /> Contact Us
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Chat with our support team for immediate assistance.
                  </p>
                  <Button className="w-full" variant="outline">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">FAQs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Find answers to commonly asked questions.
                  </p>
                  <Button className="w-full" variant="outline">
                    View FAQs
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    We value your feedback to improve our services.
                  </p>
                  <Button className="w-full" variant="outline">
                    Provide Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
