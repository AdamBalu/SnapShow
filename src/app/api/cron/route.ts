import { getTicketmasterEvents } from './ticketmaster-api-service';

export const revalidate = 0;
export const GET = async () => getTicketmasterEvents();
