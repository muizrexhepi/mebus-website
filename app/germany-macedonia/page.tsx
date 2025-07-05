"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Shield,
  Users,
  CheckCircle,
  MapPin,
  Clock,
  Euro,
  ArrowRight,
  Calendar,
  User,
  Menu,
  ChevronDown,
} from "lucide-react"

export default function GoBuslyLanding() {
  const routes = [
    {
      from: "Berlin",
      to: "Skopje",
      price: 85,
      duration: "18h",
      operator: "FlixBus",
      frequency: "Daily",
      country: "Germany → Macedonia",
    },
    {
      from: "Munich",
      to: "Tetovo",
      price: 80,
      duration: "16h",
      operator: "Eurolines",
      frequency: "3x weekly",
      country: "Germany → Macedonia",
    },
    {
      from: "Hamburg",
      to: "Kumanovo",
      price: 90,
      duration: "20h",
      operator: "RegionalBus",
      frequency: "2x weekly",
      country: "Germany → Macedonia",
    },
    {
      from: "Frankfurt",
      to: "Struga",
      price: 88,
      duration: "17h",
      operator: "FlixBus",
      frequency: "Daily",
      country: "Germany → Macedonia",
    },
    {
      from: "Cologne",
      to: "Ohrid",
      price: 92,
      duration: "19h",
      operator: "Eurolines",
      frequency: "3x weekly",
      country: "Germany → Macedonia",
    },
    {
      from: "Stuttgart",
      to: "Bitola",
      price: 87,
      duration: "18h",
      operator: "RegionalBus",
      frequency: "2x weekly",
      country: "Germany → Macedonia",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">


      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-red-500 mb-6">Navigate Roads with Comfort</h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12">
              Book your bus tickets for a comfortable journey between Germany and Macedonia
            </p>

            {/* Route Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Germany → Macedonia</h3>
                  <p className="text-gray-600 mb-4">Direct routes from major German cities to Macedonia</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span>6 Cities</span>
                    <span>•</span>
                    <span>Multiple Operators</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Euro className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Starting from €80</h3>
                  <p className="text-gray-600 mb-4">Competitive prices for comfortable travel</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span>Best Rates</span>
                    <span>•</span>
                    <span>No Hidden Fees</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comfortable Travel</h3>
              <p className="text-gray-600">Experience comfort with our modern bus fleet</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Booking</h3>
              <p className="text-gray-600">Easy scheduling with multiple departure options</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Booking</h3>
              <p className="text-gray-600">Safe and secure online booking system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Germany ↔ Macedonia Routes</h2>
              <p className="text-xl text-gray-600">Discover all available routes between Germany and Macedonia</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                        {route.country}
                      </Badge>
                      <span className="text-sm text-gray-500">{route.operator}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="font-semibold text-lg text-gray-900">
                          {route.from} → {route.to}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Price from</span>
                        </div>
                        <span className="text-2xl font-bold text-red-500">€{route.price}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Duration</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{route.duration}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Frequency</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{route.frequency}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">The smartest way to travel by bus</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience seamless bus travel with our comprehensive platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">15,000+</div>
                <p className="text-gray-600">Happy Travelers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                <p className="text-gray-600">Routes Available</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free cancellation up to 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure payment guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.8/5 customer rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GB</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">GoBusly</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your trusted partner for comfortable bus travel between Germany and Macedonia.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Popular Routes</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Berlin → Skopje</li>
                  <li>Munich → Tetovo</li>
                  <li>Frankfurt → Struga</li>
                  <li>Hamburg → Kumanovo</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Customer Service</li>
                  <li>Booking Help</li>
                  <li>Cancellation Policy</li>
                  <li>Travel Insurance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-500">© 2024 GoBusly. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
