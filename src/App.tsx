import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EventPage from "./pages/events/page";
import CalendarPage from "./pages/calendar/page";
import ParkingSpotList from "./pages/parkingSpot/page";
import ParkingSpotProfile from "./pages/parkingSpot/ParkingProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="events/:id" element={<EventPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="parking-spots" element={<ParkingSpotList />} />
          <Route path="parking-spots/:id" element={<ParkingSpotProfile />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
