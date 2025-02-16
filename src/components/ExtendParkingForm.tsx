import { useState } from "react";
import { BASE_URL } from "../App";

const IncreaseParkingDuration = ({ parkingId } = {parkingId: 3}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes <= 0) {
      setError("Please enter a valid duration.");
      return;
    }
    const data = await response.json();
    const currentEndTime = new Date(data.end_time); // Assuming API returns ISO 8601 format

    // Add the new duration
    const updatedEndTime = new Date(currentEndTime.getTime() + totalMinutes * 60000).toISOString();


    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/api/bookings/booking-slots/${parkingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ end_time: updatedEndTime }),
      });

      if (!response.ok) {
        throw new Error("Failed to update parking duration");
      }
      alert("Parking duration updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid  place-items-center">
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-80">
      <h2 className="text-lg font-semibold mb-4">Increase Parking Duration</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-2">
        <label className="block font-medium">Hours:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          min="0"
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          min="0"
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Increase Duration"}
      </button>
    </form>
    </div>
  );
};

export default IncreaseParkingDuration;
