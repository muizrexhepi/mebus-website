import { NextRequest, NextResponse } from 'next/server';
import { Ticket } from "@/models/ticket";
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const departureStation = searchParams.get('departureStation');
  const arrivalStation = searchParams.get('arrivalStation');
  const departureDate = searchParams.get('departureDate');
  const adults = searchParams.get('adult');
  const children = searchParams.get('children');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 6;


  if (!departureStation || !arrivalStation) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ticket/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&departureDate=${departureDate}&adults=${adults}&children=${children}`);
    const tickets: Ticket[] = res.data.data || [];
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTickets = tickets.slice(startIndex, endIndex);

    return NextResponse.json({
      tickets: paginatedTickets,
      nextPage: endIndex < tickets.length ? page + 1 : undefined,
      totalPages: Math.ceil(tickets.length / limit)
    });
    
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}