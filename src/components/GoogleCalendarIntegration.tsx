import React, { useState } from "react";

const GoogleCalendarIntegration: React.FC = () => {
    const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(
        null,
    );
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to retrieve authentication headers (adjust this as needed)
    const getAuthHeaders = (): HeadersInit => {
        const token = localStorage.getItem("token"); // e.g., JWT token
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Initiate OAuth flow by fetching the authorization URL from the backend.
    const handleLinkCalendar = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                "/integrations/google-calendar/init/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                },
            );
            if (!response.ok) {
                throw new Error("Failed to get authorization URL");
            }
            const data = await response.json();
            setAuthorizationUrl(data.authorization_url);
            // Open a new window for Google OAuth
            if (data.authorization_url) {
                window.open(
                    data.authorization_url,
                    "_blank",
                    "width=500,height=600",
                );
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch calendar events from the backend.
    const fetchCalendarEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                "/integrations/google-calendar/events/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                },
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

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Google Calendar Integration</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginBottom: "1rem" }}>
                <button
                    onClick={handleLinkCalendar}
                    disabled={loading}
                    style={{ marginRight: "1rem" }}
                >
                    {loading ? "Linking..." : "Link Google Calendar"}
                </button>
                <button onClick={fetchCalendarEvents} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Calendar Events"}
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
                            {event.start?.dateTime ||
                                event.start?.date ||
                                "No start time"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GoogleCalendarIntegration;
