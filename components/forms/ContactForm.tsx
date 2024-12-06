"use client";

import React, { useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <Card className=" h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">Send Us a Message</CardTitle>
        <CardDescription>
          We&apos;ll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="John"
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                required
                className="h-12 bg-primary-bg/5 rounded-lg border-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              required
              className="h-12 bg-primary-bg/5 rounded-lg border-none"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subject">Subject</Label>
            <Select required>
              <SelectTrigger className="h-12 bg-primary-bg/5 rounded-lg border-none">
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
          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="resize-none bg-primary-bg/5 rounded-lg border-none"
              id="message"
              placeholder="Type your message here"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 rounded-lg button-gradient text-white"
          >
            Send Message
          </Button>
        </form>
        {formSubmitted && (
          <Alert className="mt-4 bg-green-100 border-green-500">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your message has been sent. We&apos;ll get back to you soon.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
