import { Invoice, Client, CashFlowSettings, ActivityNotification } from '../types';
import { initialInvoices, initialClients, initialCashFlowSettings, initialActivityNotifications } from '../data/mockData';

const STORAGE_KEYS = {
  INVOICES: 'gigpulse_invoices',
  CLIENTS: 'gigpulse_clients',
  SETTINGS: 'gigpulse_settings',
  NOTIFICATIONS: 'gigpulse_notifications'
};

export const loadInvoices = (): Invoice[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
    if (!raw) {
      saveInvoices(initialInvoices);
      return initialInvoices;
    }
    return JSON.parse(raw);
  } catch {
    return initialInvoices;
  }
};

export const saveInvoices = (invoices: Invoice[]) => {
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
};

export const loadClients = (): Client[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      saveClients(initialClients);
      return initialClients;
    }
    return JSON.parse(raw);
  } catch {
    return initialClients;
  }
};

export const saveClients = (clients: Client[]) => {
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
};

export const loadSettings = (): CashFlowSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      saveSettings(initialCashFlowSettings);
      return initialCashFlowSettings;
    }
    return JSON.parse(raw);
  } catch {
    return initialCashFlowSettings;
  }
};

export const saveSettings = (settings: CashFlowSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const loadNotifications = (): ActivityNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      saveNotifications(initialActivityNotifications);
      return initialActivityNotifications;
    }
    return JSON.parse(raw);
  } catch {
    return initialActivityNotifications;
  }
};

export const saveNotifications = (notifications: ActivityNotification[]) => {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const resetAllToDemo = () => {
  saveInvoices(initialInvoices);
  saveClients(initialClients);
  saveSettings(initialCashFlowSettings);
  saveNotifications(initialActivityNotifications);
};
