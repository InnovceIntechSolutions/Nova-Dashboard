import { API_CONFIG } from '../Types/apiconfig';

export async function fetchDashboardData(type: string, title: string, param?: string ,  slotId?: string ) {
  const queryParams = new URLSearchParams({
    Type: type,
    Id: title,
  });
    if (slotId) {
    queryParams.append("slotId", slotId);
  }
  if (param) {
    queryParams.append("param", param);
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
  
  // ✅ Table type: API returns { props: [ {...scorecard object} ] }
  //    We unwrap props[0] so SupplierScorecardGrid receives the flat object
  //    e.g. { Title, Subtitle, Icon, label1..5, value1..5 }
  if (type === 'Table') {
    return data.props?.[0] ?? {};
  }

  return data.props;
} 