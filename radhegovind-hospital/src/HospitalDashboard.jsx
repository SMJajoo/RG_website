import { useState, useEffect } from 'react';

export default function HospitalDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  useEffect(() => {
    fetchAppointments();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchAppointments, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
        setError('');
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (err) {
      setError('Could not connect to server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteAppointment = async (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/appointments/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchAppointments();
        }
      } catch (err) {
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'Confirmed':
        return 'bg-green-50 border-green-200';
      case 'Completed':
        return 'bg-blue-50 border-blue-200';
      case 'Cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage patient appointments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-yellow-600">{appointments.filter(a => a.status === 'Pending').length}</div>
            <div className="text-gray-600 text-sm mt-2">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600">{appointments.filter(a => a.status === 'Confirmed').length}</div>
            <div className="text-gray-600 text-sm mt-2">Confirmed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600">{appointments.filter(a => a.status === 'Completed').length}</div>
            <div className="text-gray-600 text-sm mt-2">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-600">{appointments.length}</div>
            <div className="text-gray-600 text-sm mt-2">Total</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedStatus === status
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={fetchAppointments}
          className="mb-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          🔄 Refresh Now
        </button>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Loading appointments...</div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="bg-white p-8 rounded-lg text-center border border-gray-200">
              <div className="text-gray-500">No {selectedStatus.toLowerCase()} appointments</div>
            </div>
          ) : (
            filteredAppointments.map(apt => (
              <div key={apt.id} className={`${getStatusColor(apt.status)} border rounded-lg p-6 transition`}>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Patient Name</p>
                    <p className="text-lg font-semibold text-gray-900">{apt.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">{apt.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Treatment</p>
                    <p className="text-lg font-semibold text-gray-900">{apt.treatment}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Appointment Date & Time</p>
                    <p className="text-gray-900">
                      {new Date(apt.dateTime).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booked On</p>
                    <p className="text-gray-900">
                      {new Date(apt.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusBadgeColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>

                {apt.notes && (
                  <div className="mb-4 p-3 bg-white bg-opacity-50 rounded">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-gray-900">{apt.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <select
                    value={apt.status}
                    onChange={(e) => updateStatus(apt.id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => deleteAppointment(apt.id)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
