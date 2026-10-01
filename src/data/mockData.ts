import type { Invoice, Client, CashFlowSettings, ActivityNotification } from '../types';

export const initialClients: Client[] = [
  {
    id: 'client-1',
    name: 'Sarah Jenkins',
    company: 'Apex Digital Labs',
    email: 'sarah@apexdigital.io',
    ratingGrade: 'A',
    avgPaymentDays: 2.4,
    totalBilled: 18500,
    totalPaid: 15500,
    totalPending: 3000,
    riskNotice: 'Fast Payer: Clears within 48h. Safe for Net 15.'
  },
  {
    id: 'client-2',
    name: 'David Vance',
    company: 'HyperGrowth Media',
    email: 'david@hypergrowth.co',
    ratingGrade: 'B',
    avgPaymentDays: 8.5,
    totalBilled: 12000,
    totalPaid: 8500,
    totalPending: 3500,
    riskNotice: 'Standard Payer: Moderate delays. Responds well to T-3 reminders.'
  },
  {
    id: 'client-3',
    name: 'Marcus Thorne',
    company: 'Veloce Motors Inc.',
    email: 'marcus@velocemotors.com',
    ratingGrade: 'D',
    avgPaymentDays: 28.2,
    totalBilled: 9400,
    totalPaid: 6200,
    totalPending: 3200,
    riskNotice: 'High Risk: 28 days avg delay. Always enforce 50% upfront deposit.'
  },
  {
    id: 'client-4',
    name: 'Elena Rostova',
    company: 'Aura Health App',
    email: 'elena@aurahealth.tech',
    ratingGrade: 'A',
    avgPaymentDays: 1.8,
    totalBilled: 14200,
    totalPaid: 14200,
    totalPending: 0,
    riskNotice: 'VIP Partner: Instant ACH clearance. Priority client.'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-089',
    clientName: 'Sarah Jenkins',
    clientCompany: 'Apex Digital Labs',
    clientEmail: 'sarah@apexdigital.io',
    issueDate: '2026-09-18',
    dueDate: '2026-10-02',
    amount: 3000,
    status: 'pending',
    reminderTone: 'friendly',
    items: [
      { id: 'item-1', description: 'Design System & Figma Component Library', quantity: 1, unitPrice: 2200, total: 2200 },
      { id: 'item-2', description: 'Interactive Prototyping (5 Mobile Screens)', quantity: 1, unitPrice: 800, total: 800 }
    ],
    notes: 'Net 14 payment terms. Wire transfer or Stripe direct.'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-088',
    clientName: 'David Vance',
    clientCompany: 'HyperGrowth Media',
    clientEmail: 'david@hypergrowth.co',
    issueDate: '2026-09-22',
    dueDate: '2026-10-06',
    amount: 3500,
    status: 'pending',
    reminderTone: 'professional',
    items: [
      { id: 'item-1', description: 'React Full-Stack Frontend Engineering (Sprint 1)', quantity: 35, unitPrice: 100, total: 3500 }
    ],
    notes: 'Sprint milestone deliverable.'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-085',
    clientName: 'Marcus Thorne',
    clientCompany: 'Veloce Motors Inc.',
    clientEmail: 'marcus@velocemotors.com',
    issueDate: '2026-09-01',
    dueDate: '2026-09-15',
    amount: 3200,
    status: 'overdue',
    reminderTone: 'strict',
    lastReminderSentAt: '2026-09-25T14:30:00Z',
    items: [
      { id: 'item-1', description: 'Mobile App API Integration & Auth Gateway', quantity: 1, unitPrice: 3200, total: 3200 }
    ],
    notes: 'Late fee of 1.5% applies for overdue invoices past 14 days.'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-082',
    clientName: 'Elena Rostova',
    clientCompany: 'Aura Health App',
    clientEmail: 'elena@aurahealth.tech',
    issueDate: '2026-09-10',
    dueDate: '2026-09-24',
    amount: 4800,
    status: 'paid',
    paidAt: '2026-09-23T11:15:00Z',
    reminderTone: 'friendly',
    items: [
      { id: 'item-1', description: 'Health Dashboard UI & Vitals Visualization', quantity: 1, unitPrice: 4800, total: 4800 }
    ],
    notes: 'Paid in full via Stripe direct deposit.'
  },
  {
    id: 'inv-105',
    invoiceNumber: 'INV-2026-080',
    clientName: 'Sarah Jenkins',
    clientCompany: 'Apex Digital Labs',
    clientEmail: 'sarah@apexdigital.io',
    issueDate: '2026-08-25',
    dueDate: '2026-09-08',
    amount: 5200,
    status: 'paid',
    paidAt: '2026-09-07T16:40:00Z',
    reminderTone: 'friendly',
    items: [
      { id: 'item-1', description: 'Brand Identity & Mobile UX Overhaul', quantity: 1, unitPrice: 5200, total: 5200 }
    ],
    notes: 'Paid within 24 hours.'
  }
];

export const initialCashFlowSettings: CashFlowSettings = {
  currentCashBalance: 12450,
  monthlyLivingExpenses: 3200,
  monthlyBusinessExpenses: 650,
  taxReserveRate: 25,
  currency: '$'
};

export const initialActivityNotifications: ActivityNotification[] = [
  {
    id: 'act-1',
    title: 'Automated Chaser Dispatched',
    message: 'Friendly reminder sent to Sarah Jenkins for INV-2026-089 ($3,000 due in 24 hours).',
    timestamp: '15 mins ago',
    type: 'chaser'
  },
  {
    id: 'act-2',
    title: 'Invoice Overdue Alert',
    message: 'INV-2026-085 for Veloce Motors is 16 days overdue. Strict reminder ready.',
    timestamp: '2 hours ago',
    type: 'alert'
  },
  {
    id: 'act-3',
    title: 'Payment Received',
    message: '$4,800 cleared from Aura Health App into primary account.',
    timestamp: 'Sep 23, 2026',
    type: 'paid'
  }
];
