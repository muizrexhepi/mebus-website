'use client'

import React, { useEffect, useState } from 'react'
import { CalendarIcon, MapPinIcon, UsersIcon, CreditCardIcon, CheckCircleIcon } from 'lucide-react'
import { Booking, Flex } from '@/models/booking'
import { getBookingByIdWithChargeData } from '@/actions/bookings'
import { useSearchParams } from 'next/navigation'
import { Passenger } from '@/models/passenger'
import moment from 'moment-timezone'

const Card = ({ className, children }: any) => (
    <div className={`bg-white shadow-lg rounded-lg ${className}`}>{children}</div>
)
const CardHeader = ({ children }: any) => <div className="px-6 py-4 border-b">{children}</div>
const CardContent = ({ className, children }: any) => <div className={`px-6 py-4 ${className}`}>{children}</div>
const CardTitle = ({ className, children }: any) => <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>
const Badge = ({ className, children }: any) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>
)



export default function BookingConfirmationPage() {
    const [booking, setBooking] = useState<Booking>()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [isRefunded, setIsRefunded] = useState(false);

    useEffect(() => {
        getBookingByIdWithChargeData(id!).then((data) => {
            console.log({ data })
            if (data?.metadata?.refund_action?.is_refunded) {
                setIsRefunded(true);
            }
            setBooking(data);
        });
    }, [id]);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getFlexBadgeColor = (flex: Flex) => {
        switch (flex) {
            case Flex.PREMIUM:
                return 'bg-green-500 text-white'
            case Flex.BASIC:
                return 'bg-blue-500 text-white'
            case Flex.NO_FLEX:
                return 'bg-gray-500 text-white'
            default:
                return 'bg-gray-500 text-white'
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {isRefunded ? (
                <div className="text-red-600 font-bold text-center text-2xl mb-6 p-4 border border-red-600 bg-red-100 rounded-lg shadow-lg">
                    Refunded or canceled
                </div>

            ) :
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>Booking Confirmation</CardTitle>
                        <Badge className="mt-2 bg-gray-200 text-gray-700">
                            {booking?.platform}
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="text-green-500" />
                            <p className="text-lg font-semibold">This confirms that your booking is legitimate and authorized.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">From: {booking?.labels.from_city}</p>
                            </div>
                            <div>
                                <p className="font-semibold">To: {booking?.labels.to_city}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="text-gray-500" />
                            <p>{moment.utc(booking?.departure_date!).format("dddd, DD-MM-YYYY / HH:mm")}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="text-gray-500" />
                            <p><span className='font-bold'>{booking?.destinations.departure_station_label}</span> to <span className='font-bold'>{booking?.destinations.arrival_station_label}</span></p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <UsersIcon className="text-gray-500" />
                            <p>{booking?.passengers.length} Passenger(s)</p>
                        </div>
                        <div>
                            {
                                booking?.passengers?.map((psg: Passenger) => (
                                    <p>{psg.full_name}</p>
                                ))
                            }
                        </div>

                        <div className="flex items-center space-x-2">
                            <CreditCardIcon className="text-gray-500" />
                            <p>Price: ${booking?.price.toFixed(2)}</p>

                        </div>

                        <div>
                            <p className="font-semibold">Travel Flex:</p>
                            <Badge className={`mt-1 ${getFlexBadgeColor(booking?.metadata?.travel_flex!)}`}>
                                {booking?.metadata.travel_flex}
                            </Badge>
                        </div>

                        {booking?.metadata.transaction_id && (
                            <div>
                                <p className="font-semibold">Transaction ID:</p>
                                <p>{booking?.metadata.transaction_id}</p>
                            </div>
                        )}

                        {booking?.metadata.download_url && (
                            <div>
                                <a
                                    href={booking?.metadata.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Download Ticket
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>}
        </div>
    )
}