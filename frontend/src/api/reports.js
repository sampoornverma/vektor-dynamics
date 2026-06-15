const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export async function fetchReports({ hostelName, mine } = {}) {
  const query = new URLSearchParams();
  if (hostelName) query.append('hostelName', hostelName);
  if (mine) query.append('mine', 'true');

  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/report?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.msg || 'Failed to fetch reports');
  return data;
}

export async function createReport(reportData) {
  const token = localStorage.getItem('token');
  const hasImageFile = reportData?.imageFile instanceof File;

  let res;
  if (hasImageFile) {
    const formData = new FormData();
    formData.append('text', reportData.text);
    formData.append('hostelName', reportData.hostelName);
    if (reportData.imageUrl) formData.append('imageUrl', reportData.imageUrl);
    formData.append('image', reportData.imageFile);

    res = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } else {
    res = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.msg || 'Failed to create report');
  return data;
}

export async function updateReport(reportId, updates) {
  const token = localStorage.getItem('token');
  const hasImageFile = updates?.imageFile instanceof File;

  let res;
  if (hasImageFile) {
    const formData = new FormData();
    if (updates.text !== undefined) formData.append('text', updates.text);
    if (updates.imageUrl !== undefined) formData.append('imageUrl', updates.imageUrl);
    if (updates.status !== undefined) formData.append('status', updates.status);
    formData.append('image', updates.imageFile);

    res = await fetch(`${API_BASE_URL}/report/${reportId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } else {
    res = await fetch(`${API_BASE_URL}/report/${reportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.msg || 'Failed to update report');
  return data;
}