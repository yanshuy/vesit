import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import MainLayout from "./layouts/MainLayout";
import EventPage from "./pages/events/page";
import CalendarPage from "./pages/calendar/page";
import ParkingSpotList from "./pages/parkingSpot/page";
import ParkingSpotProfile from "./pages/parkingProfile/page";
import SelectTimeSlot from "./pages/SelectTimeSlot";
import AuthForm from "./pages/auth-form/auth-form";
import { AuthProvider } from "./lib/auth";
import ParkingModel from "./pages/ParkingModel/page";
import GoogleCalendarIntegration from "./components/GoogleCalendarIntegration";
import ParkingSpotSearch from "./pages/search-parking-spot/ParkingSpotSearch";
import DemoPage from "./pages/demo-page/DemoPage";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import PaymentForm from "./components/PaymentForm";
import MyPaymentOptions from "./pages/MyPaymentOptions";
import ParkingLotMap from "./GUI/ParkingLotMap/page";
import GUI from "./GUI/page";

export const BASE_URL =
    "https://vesit-asb3b4e7dye8d0ck.canadacentral-01.azurewebsites.net/";

function App() {
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route
                    path="login"
                    element={
                        <AuthProvider>
                            <AuthForm />
                        </AuthProvider>
                    }
                />
                <Route path="gui">
                    <Route index element={<GUI />}></Route>
                    <Route path="map/1" element={<ParkingLotMap />}></Route>
                    <Route path="payment" element={<PaymentForm />}></Route>
                </Route>
                <Route path="pp" element={<ParkingModel />}></Route>
                <Route path="gcal" element={<GoogleCalendarIntegration />} />
                <Route path="pay" element={<PaymentForm />} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="map" element={<Map onlyMap={false} />} />
                    <Route path="events/:id" element={<EventPage />} />
                    <Route
                        path="searchparkingspot"
                        element={<ParkingSpotSearch />}
                    />
                    <Route path="parking-spots" element={<ParkingSpotList />} />
                    <Route
                        /* index */ path="parking-spots/:id"
                        element={<ParkingSpotProfile />}
                    />
                    <Route
                        path="parking-spots/:id/selecttime"
                        element={<SelectTimeSlot />}
                    />
                    <Route path="my-bookings" element={<SelectTimeSlot />} />
                    <Route
                        path="my-payment-options"
                        element={<MyPaymentOptions />}
                    />
                    <Route path="demopage" element={<DemoPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
