import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EventPage from "./pages/events/page";
import CalendarPage from "./pages/calendar/page";
import ParkingSpotList from "./pages/parkingSpot/page";
import ParkingSpotProfile from "./pages/parkingProfile/page";
import SelectTimeSlot from "./pages/SelectTimeSlot";
import AuthForm from "./pages/auth-form/auth-form";
import { AuthProvider } from "./lib/auth";
import ParkingModel from "./pages/ParkingModel/page";
import Payment from "./FastBooking/Payments/page";
import GoogleCalendarIntegration from "./components/GoogleCalendarIntegration";
import ParkingSpotSearch from "./pages/search-parking-spot/ParkingSpotSearch";
import DemoPage from "./pages/demo-page/DemoPage";
import Home from "./pages/Home";


export const BASE_URL = "https://natural-ape-severely.ngrok-free.app";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="login"
                    element={
                        <AuthProvider>
                            <AuthForm />
                        </AuthProvider>
                    }
                />
                <Route path="pp" element={<ParkingModel />}></Route><Route path="gcal" element={<GoogleCalendarIntegration/>} /> 
                <Route path="pay" element={<Payment />} />
                <Route path="/" element={<MainLayout />}>
                    <Route path="events/:id" element={<EventPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route index element={<Home />} />
                    <Route path="parking-spots" element={<ParkingSpotList />} />
                    <Route
                        // index
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
                    
                    <Route path="parking-spots/:id/selecttime" element={<SelectTimeSlot />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
