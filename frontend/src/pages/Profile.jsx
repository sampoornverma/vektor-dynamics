import Navbar from '../components/Navbar';

function Profile() {
  const token = localStorage.getItem('token') || '';
  let user = null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1] || ''));
    if (decoded && decoded.exp * 1000 > Date.now()) {
      user = decoded;
    }
  } catch {
    user = null;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8">Profile</h1>

        {!user ? (
          <div className="rounded-xl border border-white/10 bg-[#111827] p-6 text-gray-300">
            You are not logged in. Please sign in to view your profile.
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#111827] p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-lg font-semibold">{user.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-semibold">{user.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="text-lg font-semibold">{user.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Hostel</p>
              <p className="text-lg font-semibold">{user.hostelName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Room Number</p>
              <p className="text-lg font-semibold">{user.roomNumber || 'N/A'}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
