"use client";

import { useState } from "react";
import { Clock, MapPin, Users, Star, Wifi, Zap, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StructuredData from "./structured-data";
import { MobileSearchBlock } from "@/app/search/_components/MobileSearchBlock";
import SearchSection from "@/app/search/_components/SearchSection";
import BookingWidget from "./booking-widget";
import RouteMap from "./route-map";
import ReviewCard from "./review-card";
import OperatorCard from "./operator-card";
import SecondaryFooter from "@/components/SecondaryFooter";

interface RoutePageContentProps {
  routeData: {
    fromCity: string;
    toCity: string;
    fromStation: any;
    toStation: any;
    distance: string;
    duration: string;
    minPrice: number;
    maxPrice: number;
    operators: any[];
    schedules: any[];
    reviews: any[];
    relatedRoutes: any[];
    faqs: any[];
  };
}

export default function RoutePageContent({ routeData }: RoutePageContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const {
    fromCity,
    toCity,
    fromStation,
    toStation,
    distance,
    duration,
    minPrice,
    maxPrice,
    operators,
    schedules,
    reviews,
    relatedRoutes,
    faqs,
  } = routeData;

  return (
    <div className="min-h-screen bg-primary-bg/5">
      <StructuredData routeData={routeData} />

      <MobileSearchBlock />
      <SearchSection />

      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {fromCity} to {toCity}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 font-light">
              Comfortable buses starting from €{minPrice}
            </p>
            <div className="flex items-center justify-center space-x-8 text-primary-foreground/70">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">
                  {operators.length} operators
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <BookingWidget
              fromCity={fromCity}
              toCity={toCity}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl font-semibold">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>Route Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {duration}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Travel Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {distance}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Distance
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      €{minPrice}-{maxPrice}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Price Range
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {schedules.length}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Daily Buses
                    </div>
                  </div>
                </div>

                <RouteMap
                  fromStation={fromStation}
                  toStation={toStation}
                  stops={[]}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl font-semibold">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span>Available Buses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="border border-border/50 rounded-xl p-6 hover:shadow-md hover:border-border transition-all duration-200 bg-white/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {schedule.departureTime}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                              {fromCity}
                            </div>
                          </div>
                          <div className="flex-1 flex items-center space-x-4 min-w-0">
                            <div className="flex-1 border-t border-dashed border-border"></div>
                            <div className="text-sm text-muted-foreground font-medium px-3 py-1 bg-muted/50 rounded-full">
                              {schedule.duration}
                            </div>
                            <div className="flex-1 border-t border-dashed border-border"></div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {schedule.arrivalTime}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                              {toCity}
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-8">
                          <div className="text-3xl font-bold text-primary mb-2">
                            €{schedule.price}
                          </div>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 shadow-sm"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-foreground">
                            {schedule.operator}
                          </span>
                          <div className="flex items-center space-x-2">
                            {schedule.amenities.includes("wifi") && (
                              <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                                <Wifi className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                            {schedule.amenities.includes("ac") && (
                              <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                                <Snowflake className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                            {schedule.amenities.includes("charging") && (
                              <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                                <Zap className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {schedule.seatsAvailable} seats left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold">
                  Bus Operators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {operators.map((operator, index) => (
                    <OperatorCard key={index} operator={operator} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl font-semibold">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <span>Passenger Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border/50 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Booking */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">
                  Quick Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BookingWidget
                  fromCity={fromCity}
                  toCity={toCity}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  compact={true}
                />
              </CardContent>
            </Card>

            {/* Related Routes */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">
                  Related Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedRoutes.map((route, index) => (
                    <a
                      key={index}
                      href={`/route/${route.slug}`}
                      className="block p-4 border border-border/50 rounded-lg hover:shadow-md hover:border-border transition-all duration-200 bg-white/50"
                    >
                      <div className="font-semibold text-foreground mb-1">
                        {route.from} → {route.to}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        From €{route.price}
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Stats */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">
                  Route Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Most popular time
                    </span>
                    <span className="font-semibold">08:00 - 10:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average price</span>
                    <span className="font-semibold">
                      €{Math.round((minPrice + maxPrice) / 2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Booking window
                    </span>
                    <span className="font-semibold">Up to 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SecondaryFooter />
    </div>
  );
}
