export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export type ReminderTone = 'friendly' | 'professional' | 'strict';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  reminderTone: ReminderTone;
  lastReminderSentAt?: string;
  paidAt?: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  ratingGrade: 'A' | 'B' | 'C' | 'D';
  avgPaymentDays: number;
  totalBilled: number;
  totalPaid: number;
  totalPending: number;
  riskNotice: string;
}

export interface CashFlowSettings {
  currentCashBalance: number;
  monthlyLivingExpenses: number;
  monthlyBusinessExpenses: number;
  taxReserveRate: number; // percentage (e.g. 25)
  currency: string;
}

export interface ActivityNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'chaser' | 'paid' | 'alert' | 'invoice';
}
