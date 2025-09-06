// Row shape used by the dashboard data table
export type Transaction = {
  id: string;
  gymName: string;
  eventDate: string;
  eventType: string;
  trackingId: string; // truncated for display
  trackingIdFull?: string; // full id for tooltip/copy
  amount: string;
  paymentDate: string;
  channel: "Card" | "Transfer" | string;
};

// API response shapes for /admin/transactions
export interface ApiTransaction {
  transactionId: string;
  bookingDate: string;
  amountPaid: number;
  status: string;
  eventType: string;
  gym: {
    id?: string;
    name?: string;
  };
}

export interface TransactionsPagination {
  total: number;
  page: unknown;
  limit: number;
  totalPages: number;
}

export interface TransactionsResponse {
  success: boolean;
  message?: string;
  pagination: TransactionsPagination;
  count: number;
  data: ApiTransaction[];
}
