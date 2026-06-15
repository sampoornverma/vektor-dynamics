import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { attendantSignup } from '../api/auth';

const hostelChoices = ['ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'];

function AttendantSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', hostelName: '', onboardingKey: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await attendantSignup(formData);
      localStorage.setItem('token', data.token);
      navigate('/reports');
      window.location.reload(); // Refresh navbar
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Attendant Signup</h1>
        <p className="text-gray-300 mb-6">
          Developer-only onboarding. This form requires a private onboarding key.
        </p>
        
        <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-8 text-left space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Hostel Name</label>
            <select required value={formData.hostelName} onChange={(e) => setFormData({...formData, hostelName: e.target.value})} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white">
              <option value="">Select hostel</option>
              {hostelChoices.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Onboarding Key</label>
            <input type="password" required value={formData.onboardingKey} onChange={(e) => setFormData({...formData, onboardingKey: e.target.value})} className="w-full px-3 py-2 rounded-md bg-[#111827] border border-gray-600 text-white placeholder-gray-400" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold transition-colors">
            Signup
          </button>
        </form>

        <p className="text-gray-400">
          Already have an account? <Link to="/attendant/login" className="text-indigo-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default AttendantSignup;