export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_DASHBOARD_API_BASE,
  slotId : import.meta.env.VITE_SLOTID,
  endpoints: {
    getDashboardDetails: `${import.meta.env.VITE_DASHBOARD_API_BASE}/GetDashBoardDetails`,
  },
} as const;