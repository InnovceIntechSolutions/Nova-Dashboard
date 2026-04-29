// services/dashboardapi.ts
import { API_CONFIG } from '../Types/apiconfig';

export interface SearchFilters {
  invoiceNumber?: string;
  poNumber?: string;
  fromDate?: string;
  toDate?: string;
  month?: string;
}

export async function fetchDashboardData(
  type: string,
  title: string,
  param?: string,
  slotId?: string,
  filters?: SearchFilters
) {
  const queryParams = new URLSearchParams({
    Type: type,
    Id: title,
    invoiceNumber: filters?.invoiceNumber ?? '',
    poNumber:      filters?.poNumber      ?? '',
    fromDate:      filters?.fromDate      ?? '',
    toDate:        filters?.toDate        ?? '',
    month:         filters?.month         ?? '',
  });

  if (slotId) queryParams.append('slotId', slotId);
  if (param)  queryParams.append('param', param);

  const url = `${API_CONFIG.endpoints.getDashboardDetails}?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // ✅ Guard: handle empty response body
  const text = await res.text();
  if (!text || text.trim() === '') {
    console.warn(`Empty response for: ${title}`);
    return null;
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.warn(`Invalid JSON for: ${title}`, text);
    return null;
  }

  if (type === 'Table') {
    return data.props?.[0] ?? {};
  }

  return data.props;
}