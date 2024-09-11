// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { ChevronDownIcon, ClockIcon, MapPinIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function Component() {
//   const bookings = [
//     {
//       day: "Tue",
//       date: 13,
//       time: "09:00 - 09:30",
//       location: "Online",
//       title: "30min call meeting Peer ↔ Leslie",
//       participants: [
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//       ],
//     },
//     {
//       day: "Tue",
//       date: 13,
//       time: "09:00 - 09:30",
//       location: "Online",
//       title: "30min call meeting Peer ↔ Leslie",
//       participants: [
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//       ],
//     },
//     {
//       day: "Tue",
//       date: 13,
//       time: "09:00 - 09:30",
//       location: "Online",
//       title: "30min call meeting Peer ↔ Leslie",
//       participants: [
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//         { src: "/placeholder-user.jpg", fallback: "PL" },
//       ],
//     },
//   ];

//   const today = new Date();
//   const todayDay = today.toLocaleString("en-US", { weekday: "short" });
//   const todayDate = today.getDate();

//   return (
//     <div className="">
//       <h2 className="text-3xl font-semibold">My Bookings</h2>
//       <p className="text-gray-600">
//         See your scheduled events from your calendar events links.
//       </p>
//       <div className="mt-4">
//         <Tabs defaultValue="upcoming">
//           <TabsList>
//             <TabsTrigger value="upcoming" className="font-medium">
//               Upcoming
//             </TabsTrigger>
//             <TabsTrigger value="pending" className="font-medium">
//               Pending
//             </TabsTrigger>
//             <TabsTrigger value="recurring" className="font-medium">
//               Recurring
//             </TabsTrigger>
//             <TabsTrigger value="past" className="font-medium">
//               Past
//             </TabsTrigger>
//             <TabsTrigger value="cancelled" className="font-medium">
//               Cancelled
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>
//       <div className="mt-6 space-y-4">
//         {bookings.map((booking, index) => (
//           <Card key={index} className="flex justify-between items-center p-4">
//             <div className="flex items-center">
//               <div className="text-center border-r-2 px-8">
//                 <p
//                   className={`${
//                     booking.day === todayDay && booking.date === todayDate
//                       ? "text-red-500"
//                       : "text-gray-500"
//                   } font-semibold text-3xl`}
//                 >
//                   {booking.day}
//                 </p>
//                 <p
//                   className={cn("text-6xl font-medium", {
//                     "text-red-500":
//                       booking.day === todayDay && booking.date === todayDate,
//                   })}
//                 >
//                   {booking.date}
//                 </p>
//               </div>
//               <div className="px-6 flex items-center gap-4 h-full">
//                 <div className="space-y-6">
//                   <div className="flex items-center space-x-2">
//                     <ClockIcon className="h-4 w-4 text-gray-400" />
//                     <span>{booking.time}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <MapPinIcon className="h-4 w-4 text-gray-400" />
//                     <span>{booking.location}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="font-medium">{booking.title}</p>
//                   <div className="flex space-x-2 mt-2">
//                     {booking.participants.map((participant, i) => (
//                       <Avatar key={i}>
//                         <AvatarImage src={participant.src} alt="Avatar" />
//                         <AvatarFallback>{participant.fallback}</AvatarFallback>
//                       </Avatar>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Button variant="outline" className="ml-auto">
//               Edit
//               <ChevronDownIcon className="ml-2 h-4 w-4" />
//             </Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
