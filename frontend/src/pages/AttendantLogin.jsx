import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { attendantLogin } from '../api/auth';

function AttendantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await attendantLogin({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/reports');
      window.location.reload(); // Refresh to update navbar
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Attendant Login</h1>
        
        <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-8 text-left space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold transition-colors">
            Login
          </button>
        </form>

        <p className="text-gray-400">
          Need a new attendant account? Contact the development team for onboarding.
        </p>
      </div>
    </div>
  );
}

export default AttendantLogin;