import { API_CONFIG } from '../Types/apiconfig';

export async function fetchDashboardData(type: string, title: string,  slotId?: string) {
  const queryParams = new URLSearchParams({
    Type: type,
    Id: title,
    param: 'Vertiv India - Pune Plant',
  });
    if (slotId) {
    queryParams.append("slotId", slotId);
  }

  const url = `${API_CONFIG.endpoints.getDashboardDetails}?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();

  return data.props;
} 