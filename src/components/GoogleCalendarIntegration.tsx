import React, { useEffect, useState } from "react";
import { BASE_URL } from "../App"; // Adjust this as needed

const GoogleCalendarIntegration: React.FC = () => {
  const [linked, setLinked] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleLinkCalendar = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/api/calendar/google-calendar/init`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get authorization URL");
      }
      const data = await response.json();
      if (data.authorization_url) {
        // Open a popup window for Google OAuth
        window.open(
          data.authorization_url,
          "_blank",
          "width=500,height=600"
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/api/calendar/google-calendar/events`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch calendar events");
      }
      const eventsData = await response.json();
      setEvents(eventsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check URL parameters for calendar_linked flag on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar_linked") === "success") {
      setLinked(true);
      // Optionally remove the query parameter from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Google Calendar Integration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "1rem" }}>
        {!linked ? (
          <button
            onClick={handleLinkCalendar}
            disabled={loading}
            style={{ marginRight: "1rem" }}
          >
            {loading ? "Linking..." : "Link Google Calendar"}
          </button>
        ) : (
          <p>Calendar linked successfully!</p>
        )}
        <button onClick={fetchCalendarEvents} disabled={loading}>
          {loading ? "Loading events..." : "Fetch Calendar Events"}
        </button>
      </div>
      <h3>Events:</h3>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.summary || "No Title"}</strong> –{" "}
              {event.start?.dateTime || event.start?.date || "No start time"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleCalendarIntegration;
