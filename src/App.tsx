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
import GoogleCalendarIntegration from "./components/GoogleCalendarIntegration";
import ParkingSpotSearch from "./pages/search-parking-spot/ParkingSpotSearch";
import DemoPage from "./pages/demo-page/DemoPage";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import PaymentForm from "./components/PaymentForm";
import MyPaymentOptions from "./pages/MyPaymentOptions";
import ParkingLotMap from "./GUI/ParkingLotMap/page";
import GUI from "./GUI/page";
import MyBookings from "./pages/MyBookings";
import UserProfile from "./pages/UserProfile";
import MyCurrentBooking from "./pages/MyCurrentBooking";
import QRScanner from "./components/QRScanner";
import QRCodePage from "./components/GeneratedQr";
import ParkingAnalysis from "./pages/ParkingAnalysis";
import ExtendParkingForm from "./components/ExtendParkingForm";

export const BASE_URL =
    // "https://vesit-asb3b4e7dye8d0ck.canadacentral-01.azurewebsites.net";
    "https://natural-ape-severely.ngrok-free.app";

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
                <Route path="/gen_qr" element={<QRCodePage />}></Route>
                <Route path="/gui">
                    <Route index element={<GUI />}></Route>
                    <Route
                        path="/gui/map/1"
                        element={<ParkingLotMap />}
                    ></Route>
                    <Route
                        path="/gui/payment"
                        element={<PaymentForm />}
                    ></Route>
                    <Route
                        path="/gui/qr-reader"
                        element={<QRScanner />}
                    ></Route>
                </Route>
                <Route path="/pp" element={<ParkingModel />}></Route>
                <Route path="/extend/:id" element={<ExtendParkingForm />}></Route>
                <Route path="/gcal" element={<GoogleCalendarIntegration />} />
                <Route path="/pay" element={<PaymentForm />} />
                <Route path="/analysis" element={<ParkingAnalysis />} />
                <Route
                    path="/searchparkingspot"
                    element={<ParkingSpotSearch />}
                />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/map" element={<ParkingSpotSearch />} />
                    <Route path="/events/:id" element={<EventPage />} />
                    <Route
                        path="/parking-spots"
                        element={<ParkingSpotList />}
                    />
                    <Route
                        /* index */ path="/parking-spots/:id"
                        element={<ParkingSpotProfile />}
                    />
                    <Route
                        path="/parking-spots/:id/selecttime"
                        element={<SelectTimeSlot />}
                    />
                    <Route
                        path="/parking-spots/:id/slotmap"
                        element={<ParkingLotMap />}
                    ></Route>
                    <Route path="/my-profile" element={<UserProfile />} />
                    <Route
                        path="/my-current-booking"
                        element={<MyCurrentBooking />}
                    />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route
                        path="/my-payment-options"
                        element={<MyPaymentOptions />}
                    />
                    <Route path="/demopage" element={<DemoPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
