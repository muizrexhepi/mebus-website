// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useCheckoutStore, useDepositStore } from "@/store";
// import { Ticket } from "@/models/ticket";
// import { calculatePassengerPrices } from "@/hooks/use-passengers";
// import { toast } from "@/components/ui/toast";
// import { Button } from "@/components/ui/button";
// import { environment } from "@/environment";

// interface PaymentButtonProps {
//   loading: boolean;
//   totalPrice: number;
// }

// export const PaymentButton: React.FC<PaymentButtonProps> = ({
//   loading: externalLoading,
//   totalPrice,
// }) => {
//   const router = useRouter();
//   const [internalLoading, setInternalLoading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const { useDeposit, depositAmount } = useDepositStore();

//   const {
//     passengers,
//     outboundTicket,
//     returnTicket,
//     selectedFlex,
//     flexPrice,
//     setSelectedFlex,
//     resetCheckout,
//     cardCvc,
//     cardNumber,
//     cardExpiry,
//   } = useCheckoutStore();

//   useEffect(() => {
//     if (!selectedFlex) {
//       setSelectedFlex("no_flex");
//     }
//   }, [selectedFlex, setSelectedFlex]);

//   const calculateTicketTotal = (ticket: Ticket | null) => {
//     if (!ticket || !ticket.stops || !ticket.stops[0]) {
//       return 0;
//     }

//     const adultPrice = ticket.stops[0].other_prices?.our_price || 0;
//     const childPrice = ticket.stops[0].other_prices?.our_children_price || 0;
//     const adultCount = passengers.filter((p) => p.age > 10).length;
//     const childCount = passengers.filter((p) => p.age <= 10).length;

//     return adultPrice * adultCount + childPrice * childCount;
//   };

//   const outboundTotal = outboundTicket
//     ? calculateTicketTotal(outboundTicket)
//     : 0;
//   const returnTotal = returnTicket ? calculateTicketTotal(returnTicket) : 0;
//   const totalPriceWithFlex = outboundTotal + returnTotal + flexPrice;

//   const finalPrice = useDeposit
//     ? Math.max(totalPriceWithFlex - depositAmount, 0)
//     : totalPriceWithFlex;

//   const validatePayment = () => {
//     if (!cardNumber || !cardExpiry || !cardCvc) {
//       return "Please complete the card details.";
//     }
//     if (finalPrice <= 0) {
//       return "Invalid payment amount.";
//     }
//     return null;
//   };

//   const handlePayment = async () => {
//     const validationError = validatePayment();
//     if (validationError) {
//       toast({ description: validationError, variant: "destructive" });
//       return;
//     }

//     setInternalLoading(true);

//     try {
//       const response = await axios.post<{ data: { clientSecret: string } }>(
//         `${environment.apiurl}/payment/create-payment-intent`,
//         { passengers, amount_in_cents: totalPrice * 100 }
//       );

//       const { clientSecret } = response.data.data;
//       // Here, integrate with Stripe.js for payment confirmation
//       // Example: await stripe.confirmCardPayment(clientSecret, {...});
//       const paymentSucceeded = true; // Simulate a success scenario

//       if (paymentSucceeded) {
//         await createBookings(clientSecret);
//         resetCheckout();
//         router.push("/checkout/success");
//       }
//     } catch (error: any) {
//       console.error("Payment Error:", error);
//       toast({
//         description: error.response?.data?.message || "Payment failed.",
//         variant: "destructive",
//       });
//     } finally {
//       setInternalLoading(false);
//     }
//   };

//   const createBookings = async (paymentIntentId: string) => {
//     setInternalLoading(true);

//     try {
//       if (outboundTicket) {
//         await createBooking(outboundTicket, false, paymentIntentId);
//       }
//       if (returnTicket) {
//         await createBooking(returnTicket, true, paymentIntentId);
//       }
//     } catch (error: any) {
//       console.error("Booking Error:", error);
//       throw new Error(error.response?.data?.message || "Failed to create booking");
//     } finally {
//       setInternalLoading(false);
//     }
//   };

//   const createBooking = async (
//     ticket: Ticket,
//     isReturn: boolean,
//     paymentIntentId: string
//   ) => {
//     if (!ticket.stops?.[0]) {
//       throw new Error("Invalid ticket data");
//     }

//     const departure_station = ticket.stops[0].from._id;
//     const arrival_station = ticket.stops[0].to._id;
//     const passengersWithPrices = calculatePassengerPrices(passengers, ticket);
//     const ticketTotal = isReturn ? returnTotal : outboundTotal;

//     try {
//       await axios.post(`${environment.apiurl}/booking/create`, {
//         passengers: passengersWithPrices,
//         travel_flex: selectedFlex,
//         payment_intent_id: paymentIntentId,
//         flex_price: isReturn ? 0 : flexPrice,
//         total_price: ticketTotal + (isReturn ? 0 : flexPrice),
//         departure_station,
//         arrival_station,
//         is_return: isReturn,
//       });
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to create booking");
//     }
//   };

//   const loading = externalLoading || internalLoading || isProcessing;

//   return (
//     <Button
//       className={`py-2 mt-4 min-h-16 shrink-0 ${
//         loading ? "bg-gray-400" : "bg-primary"
//       } flex justify-center items-center h-16 rounded-lg flex-1`}
//       disabled={loading}
//       onClick={handlePayment}
//     >
//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <div className="loader"></div>
//           <span className="text-white font-medium text-lg">Processing</span>
//         </div>
//       ) : (
//         <span className="text-white font-medium text-lg">Complete Payment</span>
//       )}
//     </Button>
//   );
// };

// export default PaymentButton;
