import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EventPage from "./pages/events/page";
import CalendarPage from "./pages/calendar/page";
import ParkingSpotList from "./pages/parkingSpot/page";
import ParkingSpotProfile from "./pages/parkingProfile/page";

export const BASE_URL = "https://natural-ape-severely.ngrok-free.app";
import AuthForm from "./pages/auth-form/auth-form";
import { AuthProvider } from "./lib/auth";
import ParkingSpotSearch from "./pages/search-parking-spot/ParkingSpotSearch";
import DemoPage from "./pages/demo-page/DemoPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
        <Route path="login" element={<AuthProvider><AuthForm/></AuthProvider>} />
        
        
        <Route path="/" element={<MainLayout />}>
                    <Route path="events/:id" element={<EventPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="parking-spots" element={<ParkingSpotList />} />
                    <Route
                        path="parking-spots/:id"
                        element={<ParkingSpotProfile />}
                    />
                    <Route
                        path="searchparkingspot"
                        element={<ParkingSpotSearch/>}
                    />
                    <Route
                        path="demopage"
                        element={<DemoPage/>}
                    />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
