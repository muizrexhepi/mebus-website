import { QrCode, MapPin, Calendar, Clock, User, Ticket } from "lucide-react";

export default function BusTicket() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-green-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BusGo</h1>
        <span className="text-sm">E-Ticket</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">From</span>
            </div>
            <p className="font-semibold">New York</p>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-center space-x-2 justify-end">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">To</span>
            </div>
            <p className="font-semibold">Washington D.C.</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Date</span>
            </div>
            <p className="font-semibold">15 Jul 2023</p>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-center space-x-2 justify-end">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Departure</span>
            </div>
            <p className="font-semibold">09:30 AM</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Passenger</span>
          </div>
          <p className="font-semibold">John Doe</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Ticket className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Ticket No.</span>
          </div>
          <p className="font-semibold">BG12345678</p>
        </div>

        <div className="flex justify-center">
          <QrCode className="w-32 h-32 text-gray-800" />
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>Please arrive at least 15 minutes before departure.</p>
          <p>This ticket is non-refundable and non-transferable.</p>
        </div>
      </div>
    </div>
  );
}
