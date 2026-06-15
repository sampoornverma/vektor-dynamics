import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import getDecodedToken from '../lib/auth';
import { fetchReports, createReport, updateReport } from '../api/reports';
import { useNavigate } from 'react-router-dom';

const hostelChoices = ['All', 'ABH', 'NDPG', 'APJ', 'BCH', 'VMH', 'VVS', 'HJB', 'JCB', 'CVR', 'VLB'];

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredHostel, setFilteredHostel] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newReportText, setNewReportText] = useState('');
  const [newReportImage, setNewReportImage] = useState('');
  const [newReportFile, setNewReportFile] = useState(null);
  const [editingReportId, setEditingReportId] = useState('');
  const [editingReportText, setEditingReportText] = useState('');
  const [editingReportImage, setEditingReportImage] = useState('');
  const [editingReportFile, setEditingReportFile] = useState(null);
  const [myReportsOnly, setMyReportsOnly] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = getDecodedToken();
  const isAttendant = user?.role === 'attendant';

  // Attendants can only create/view for their OWN hostel. 
  // Students can see all technically (filtered) or maybe default to their own. 
  // Let's set default filter to their own hostel if we know it.

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadReports();
  }, [filteredHostel, myReportsOnly]);

  const loadReports = async () => {
    try {
      // If attendant, they should probably only see their hostel's reports, but server handles it 
      // or we pass it here. Let's pass the currently selected filter.
      const query = filteredHostel !== 'All' ? { hostelName: filteredHostel } : {};
      if (isAttendant && myReportsOnly) {
        query.mine = true;
      }
      const data = await fetchReports(query);
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newReportText) return;
    try {
      await createReport({
        text: newReportText,
        imageUrl: newReportImage,
        imageFile: newReportFile,
        hostelName: user.hostelName // Use attendant's hostel automatically
      });
      setShowModal(false);
      setNewReportText('');
      setNewReportImage('');
      setNewReportFile(null);
      loadReports();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (report) => {
    setEditingReportId(report._id);
    setEditingReportText(report.text || '');
    setEditingReportImage(report.imageUrl || '');
    setEditingReportFile(null);
    setError('');
    setShowEditModal(true);
  };

  const handleUpdateReport = async (e) => {
    e.preventDefault();
    if (!editingReportText.trim()) return;

    try {
      await updateReport(editingReportId, {
        text: editingReportText,
        imageUrl: editingReportImage,
        imageFile: editingReportFile,
      });
      setShowEditModal(false);
      setEditingReportId('');
      setEditingReportText('');
      setEditingReportImage('');
      setEditingReportFile(null);
      setError('');
      loadReports();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseReport = async (reportId) => {
    try {
      await updateReport(reportId, { status: 'Resolved' });
      setError('');
      loadReports();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Hostel Reports</h1>
          
          <div className="flex items-center gap-4">
            <select
              value={filteredHostel}
              onChange={(e) => setFilteredHostel(e.target.value)}
              className="bg-[#1f2937] border border-gray-600 text-white text-sm rounded-lg py-2 px-3"
            >
              {hostelChoices.map(h => <option key={h} value={h}>{h === 'All' ? 'All Hostels' : h}</option>)}
            </select>

            {isAttendant && (
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={myReportsOnly}
                  onChange={(e) => setMyReportsOnly(e.target.checked)}
                  className="accent-indigo-500"
                />
                My Reports
              </label>
            )}
            
            {isAttendant && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md font-semibold transition-colors"
              >
                Create Report
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          {reports.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No reports found.</p>
          ) : (
            reports.map((report) => (
              <div key={report._id} className="bg-[#111827] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded mb-2">
                      {report.hostelName}
                    </span>
                    <h3 className="text-lg font-medium text-gray-200">
                      Attendant: {report.attendantId?.name || 'Unknown'} 
                      <span className="text-gray-500 text-sm ml-2">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    report.status === 'Resolved' ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{report.text}</p>
                {report.imageUrl && (
                  <img src={report.imageUrl} alt="Report" className="mt-4 rounded-lg max-h-64 object-cover" />
                )}

                {isAttendant && String(report.attendantId?._id) === String(user?.userId) && (
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(report)}
                      className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    {report.status !== 'Resolved' && (
                      <button
                        type="button"
                        onClick={() => handleCloseReport(report._id)}
                        className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-sm font-medium transition-colors"
                      >
                        Close
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Report</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Issue Description</label>
                <textarea 
                  required 
                  value={newReportText} 
                  onChange={(e) => setNewReportText(e.target.value)} 
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white h-32"
                  placeholder="Describe the issue... (e.g. Bathroom pipeline leaking)"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Upload Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewReportFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white"
                />
              </div>
              {newReportFile && (
                <img
                  src={URL.createObjectURL(newReportFile)}
                  alt="Selected file preview"
                  className="rounded-lg max-h-40 object-cover"
                />
              )}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Image URL (Optional Fallback)</label>
                <input 
                  type="url" 
                  value={newReportImage} 
                  onChange={(e) => setNewReportImage(e.target.value)} 
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Report</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleUpdateReport} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Issue Description</label>
                <textarea
                  required
                  value={editingReportText}
                  onChange={(e) => setEditingReportText(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white h-32"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Upload New Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditingReportFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white"
                />
              </div>
              {editingReportFile && (
                <img
                  src={URL.createObjectURL(editingReportFile)}
                  alt="Selected new file preview"
                  className="rounded-lg max-h-40 object-cover"
                />
              )}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Image URL (Optional Fallback)</label>
                <input
                  type="url"
                  value={editingReportImage}
                  onChange={(e) => setEditingReportImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#1f2937] border border-gray-600 text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;