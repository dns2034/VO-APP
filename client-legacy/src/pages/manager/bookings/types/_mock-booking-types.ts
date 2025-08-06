import { ColumnDef } from '@tanstack/react-table';

export interface Booking {
  id: string;
  clientName: string;
  organization: string;
  date: string;
  time: string;
  status: 'pending' | 'active' | 'completed' | 'canceled';
}

export type BookingTableColumn = ColumnDef<Booking> & {
  sortable?: boolean;
  className?: string;
};