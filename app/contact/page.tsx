"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Clock,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <Navbar />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        We're here to assist you with your bus booking needs. Choose your
        preferred method of contact or send us a message directly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="text-blue-500" />
              <span>Call Us</span>
            </CardTitle>
            <CardDescription>
              Our support team is available 24/7
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Toll-Free:</span>
              <span>1-800-123-4567</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">International:</span>
              <span>+1-555-987-6543</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="text-blue-500" />
              <span>Email Us</span>
            </CardTitle>
            <CardDescription>Get a response within 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Support:</span>
              <span>support@busbooking.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Bookings:</span>
              <span>bookings@busbooking.com</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="text-blue-500" />
              <span>Visit Us</span>
            </CardTitle>
            <CardDescription>Our main office location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>123 Bus Terminal Street</p>
            <p>Suite 456</p>
            <p>New York, NY 10001</p>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" size={16} />
              <span>Mon-Fri: 9AM-6PM</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>
              We'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking Inquiry</SelectItem>
                    <SelectItem value="refund">Refund Request</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Send Message
              </Button>
            </form>
            {formSubmitted && (
              <Alert className="mt-4 bg-green-100 border-green-500">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your message has been sent. We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I book a bus ticket?</AccordionTrigger>
                <AccordionContent>
                  To book a bus ticket, use our online booking system:
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Enter your departure and arrival locations</li>
                    <li>Select your travel date</li>
                    <li>Choose your preferred bus and seats</li>
                    <li>Complete the payment process</li>
                  </ol>
                  You'll receive a confirmation email with your ticket details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What's your cancellation policy?
                </AccordionTrigger>
                <AccordionContent>
                  You can cancel or change your booking up to 24 hours before
                  the scheduled departure time. Cancellation fees may apply:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>More than 72 hours before departure: Full refund</li>
                    <li>24-72 hours before departure: 50% refund</li>
                    <li>Less than 24 hours before departure: No refund</li>
                  </ul>
                  For changes, a rebooking fee may be charged.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How much luggage can I bring?
                </AccordionTrigger>
                <AccordionContent>
                  Each passenger is allowed:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                      One piece of luggage (max. 20kg) for the luggage
                      compartment
                    </li>
                    <li>
                      One piece of hand luggage (max. 7kg) to take on board
                    </li>
                  </ul>
                  Additional luggage may incur extra fees. Please check with our
                  customer service for oversized items.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Do you offer group discounts?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer group discounts for parties of 10 or more
                  traveling together. Contact our group booking department at
                  groups@busbooking.com for more information and to receive a
                  custom quote.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Connect With Us</CardTitle>
          <CardDescription>
            Follow us on social media for updates and special offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-100 hover:bg-blue-200"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-100 hover:bg-blue-200"
            >
              <Twitter className="h-5 w-5 text-blue-400" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-100 hover:bg-blue-200"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
