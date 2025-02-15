import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <div className="mx-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Your Calendar</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 - Upcoming Events */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="font-semibold text-lg">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">
              View and manage your scheduled events
            </p>
          </div>
          <div className="p-6">
            <Calendar mode="multiple" className="rounded-md border flex justify-center" />
          </div>
        </div>

        {/* Card 2 - Event List */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="font-semibold text-lg">Event List</h3>
            <p className="text-sm text-muted-foreground">
              Your upcoming events for the next 7 days
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Team Meeting",
                  date: "2023-05-15",
                  time: "10:00 AM",
                },
                {
                  id: 2,
                  name: "Client Presentation",
                  date: "2023-05-16",
                  time: "2:00 PM",
                },
                {
                  id: 3,
                  name: "Project Deadline",
                  date: "2023-05-18",
                  time: "5:00 PM",
                },
              ].map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{event.name}</h4>
                    <p className="text-sm text-gray-500">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <a
                    href={`/events/${event.id}`}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
