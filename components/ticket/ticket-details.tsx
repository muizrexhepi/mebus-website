import { Ticket } from "@/models/ticket";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  if (!ticket) return null;

  // Destructure the ticket details
  // const {
  //   departure_date,
  //   destination,
  //   from,
  //   to,
  //   stops,
  //   price,
  //   number_of_tickets,
  //   operator,
  //   metadata,
  // } = ticket;

  // const departureDate = new Date(departure_date);
  // const formattedDepartureDate = departureDate.toLocaleDateString();
  // const formattedDepartureTime = departureDate.toLocaleTimeString([], {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  return (
    <></>
    // <div className="p-4">
    //   <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>

    //   {/* Departure and Arrival */}
    //   <div className="mb-4">
    //     <div className="flex justify-between">
    //       <span className="font-bold">Departure:</span>
    //       <span>{from.name} ({from.city}, {from.country})</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Arrival:</span>
    //       <span>{to.name} ({to.city}, {to.country})</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Date:</span>
    //       <span>{formattedDepartureDate}</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Time:</span>
    //       <span>{formattedDepartureTime}</span>
    //     </div>
    //   </div>

    //   {/* Stops */}
    //   {stops.length > 0 && (
    //     <div className="mb-4">
    //       <h3 className="text-lg font-semibold mb-2">Stops:</h3>
    //       {stops.map((stop, index) => (
    //         <div key={index} className="flex justify-between">
    //           <span>{stop.from.name} ({stop.from.city}, {stop.from.country})</span>
    //           <span>{stop.arrival_time}</span>
    //         </div>
    //       ))}
    //     </div>
    //   )}

    //   {/* Other Details */}
    //   <div className="mb-4">
    //     <div className="flex justify-between">
    //       <span className="font-bold">Price:</span>
    //       <span>${price}</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Number of Tickets:</span>
    //       <span>{number_of_tickets}</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Operator:</span>
    //       <span>{metadata.operator_name} ({metadata.operator_company_name})</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span className="font-bold">Route Number:</span>
    //       <span>{ticket.route_number}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TicketDetails;
