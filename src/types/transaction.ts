export type Transaction = {
  id: string; // or number, depending on your data
  gymName: string;
  eventDate: string; // you can use Date if it’s an actual Date object
  eventType: string;
  trackingId: string;
  amount: string;
  paymentDate: string; // same as above: Date if parsed
  channel: "Card" | "Transfer" | string; // adjust to match your data
};
