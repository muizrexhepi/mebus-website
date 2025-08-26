"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { MapPin, Ticket, Star, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SavedItem {
  id: string;
  type: "ticket" | "destination";
  name: string;
  details: string;
  date?: string;
}

export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTickets, setShowTickets] = useState(true);
  const [showDestinations, setShowDestinations] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API call to fetch user's saved items
    setTimeout(() => {
      setSavedItems([
        {
          id: "1",
          type: "ticket",
          name: "New York to Boston",
          details: "Express Bus",
          date: "2023-06-15",
        },
        {
          id: "2",
          type: "destination",
          name: "Washington D.C.",
          details: "Capital city tour",
        },
        {
          id: "3",
          type: "ticket",
          name: "Boston to Philadelphia",
          details: "Night Bus",
          date: "2023-07-20",
        },
        {
          id: "4",
          type: "destination",
          name: "Miami",
          details: "Beach vacation",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Simulating API call to remove saved item
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSavedItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast({ description: "Item removed successfully." });
    } catch (error) {
      // console.error("Failed to remove item:", error);
      toast({
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredItems = savedItems.filter(
    (item) =>
      (showTickets && item.type === "ticket") ||
      (showDestinations && item.type === "destination")
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Saved Destinations/Tickets</h2>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-tickets"
                className="data-[state=checked]:bg-primary-accent"
                checked={showTickets}
                onCheckedChange={setShowTickets}
              />
              <Label htmlFor="show-tickets">Show Tickets</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-destinations"
                className="data-[state=checked]:bg-primary-accent"
                checked={showDestinations}
                onCheckedChange={setShowDestinations}
              />
              <Label htmlFor="show-destinations">Show Destinations</Label>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {item.type === "ticket" ? (
                    <Ticket className="h-5 w-5" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                  <span>{item.name}</span>
                </CardTitle>
                <CardDescription>
                  {item.type === "ticket"
                    ? "Saved Ticket"
                    : "Saved Destination"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.details}</p>
                {item.date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Date: {item.date}
                  </p>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                      <DialogDescription>
                        {item.type === "ticket"
                          ? "Ticket Details"
                          : "Destination Details"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Type:</span>
                        <span className="capitalize">{item.type}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Details:</span>
                        <span>{item.details}</span>
                      </div>
                      {item.date && (
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span className="font-medium">Date:</span>
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
