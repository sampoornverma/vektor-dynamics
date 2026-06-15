const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export async function googleLogin(credential, extra = {}) {
  if (!credential) throw new Error('No credential provided to googleLogin');

  const res = await fetch(`${API_BASE_URL}/user/google-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: credential, ...extra }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.msg || data?.message || 'Google login failed');
    console.log(err)
    err.code = data?.code;
    err.status = res.status;
    throw err;
  }

  return data;
}

export async function attendantLogin(credentials) {
  const res = await fetch(`${API_BASE_URL}/attendant/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.msg || data?.message || 'Login failed');
    throw err;
  }
  return data;
}

export async function attendantSignup(dataObj) {
  const { onboardingKey, ...payload } = dataObj;
  const res = await fetch(`${API_BASE_URL}/attendant/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(onboardingKey ? { 'x-onboarding-key': onboardingKey } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.msg || data?.message || 'Signup failed');
    throw err;
  }
  return data;
}


