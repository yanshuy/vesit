import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Download, X, Car, User2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BASE_URL } from '../App';
import { log } from 'console';

interface BookedBy {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    vehicle_plate: string;
    vehicle_model: string;
    profile_picture: string | null;
  }
  
  interface Booking {
    id: number;
    parking_space: number;
    start_time: string;
    end_time: string;
    booked_by: BookedBy;
    booking_code: string;
    qr_code_url: string;
    status: 'BOOKED' | 'COMPLETED' | 'CANCELLED';
    actual_check_in: string | null;
    actual_check_out: string | null;
    final_charge: number | null;
  }

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/bookings/booking-slots/user-bookings/`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '444',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setBookings(data);
      console.log(data);
    } catch (error) {
      // Fallback to dummy data
      console.log(error);      
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async (booking: Booking) => {
    try {
      // Fetch the image
      const response = await fetch(`${BASE_URL}${booking.qr_code_url}`, {
        headers: {
          'ngrok-skip-browser-warning': '444',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch QR code');
      
      // Get the blob from response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-code-${booking.booking_code}.png`; // or .jpg depending on the image type
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // You might want to show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-violet-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

        <Tabs defaultValue="current">
          <TabsList className="w-full mb-6 bg-violet-50/50">
            <TabsTrigger 
              value="current"
              className="flex-1 py-3 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              Current Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className="flex-1 py-3 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              Past Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="focus-visible:ring-0">
            <div className="space-y-4">
              {bookings
                .filter(booking => booking.status === 'BOOKED')
                .map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onSelect={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    onDownload={() => handleDownloadReceipt(booking)}
                  />
                ))}
              {bookings.filter(booking => booking.status === 'BOOKED').length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                  <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No current bookings</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="focus-visible:ring-0">
            <div className="space-y-4">
              {bookings
                .filter(booking => booking.status === 'COMPLETED')
                .map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onSelect={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    onDownload={() => handleDownloadReceipt(booking)}
                  />
                ))}
              {bookings.filter(booking => booking.status === 'COMPLETED').length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                  <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No past bookings</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Details Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Booking Details</DialogTitle>
                </DialogHeader>
                {selectedBooking && (
                    <div className="mt-6 space-y-6">
                    <div className="bg-violet-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-violet-900">
                            Parking Space #{selectedBooking.parking_space}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedBooking.status === 'BOOKED' 
                            ? 'bg-violet-100 text-violet-800'
                            : selectedBooking.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                            {selectedBooking.status}
                        </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-medium">{new Date(selectedBooking.start_time).toLocaleString()}</p>
                            </div>
                            <div>
                            <p className="text-sm text-gray-500">Booked By</p>
                            <p className="font-medium">{selectedBooking.booked_by.username}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-medium">{new Date(selectedBooking.end_time).toLocaleString()}</p>
                            </div>
                            <div>
                            <p className="text-sm text-gray-500">Vehicle Details</p>
                            <p className="font-medium">{selectedBooking.booked_by.vehicle_plate} • {selectedBooking.booked_by.vehicle_model}</p>
                            </div>
                        </div>
                        </div>

                        {selectedBooking.qr_code_url && (
                        <div className="mt-6 pt-6 border-t">
                            <img 
                            src={`${BASE_URL}${selectedBooking.qr_code_url}`} 
                            alt="QR Code"
                            className="w-32 h-32 mx-auto"
                            />
                            <p className="text-center text-sm text-gray-500 mt-2">Booking Code: {selectedBooking.booking_code}</p>
                        </div>
                        )}
                    </div>
                    </div>
                )}
                </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const BookingCard: React.FC<{
    booking: Booking;
    onSelect: () => void;
    onDownload: () => void;
  }> = ({ booking, onSelect, onDownload }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 p-2 rounded-lg">
              <Car className="w-5 h-5 text-violet-800" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Parking Space #{booking.parking_space}</h3>
              <p className="text-sm text-gray-500">{booking.booking_code}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Check-in</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <time className="text-sm font-medium">
                  {new Date(booking.start_time).toLocaleString()}
                </time>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Check-out</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <time className="text-sm font-medium">
                  {new Date(booking.end_time).toLocaleString()}
                </time>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col items-end gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            booking.status === 'BOOKED' 
              ? 'bg-violet-100 text-violet-800'
              : booking.status === 'COMPLETED'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {booking.status}
          </span>
          {booking.final_charge && (
            <span className="font-semibold text-violet-800">₹{booking.final_charge}</span>
          )}
        </div>
      </div>
  
      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User2Icon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{booking.booked_by.username}</p>
            <p className="text-gray-500">{booking.booked_by.vehicle_plate}</p>
          </div>
        </div>
  
        <div className="flex items-center gap-3">
          <button
            onClick={onSelect}
            className="text-sm font-medium text-violet-800 hover:text-violet-800"
          >
            View Details
          </button>
          {booking.qr_code_url && (
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-800 rounded-lg hover:bg-violet-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              QR Code
            </button>
          )}
        </div>
      </div>
    </div>
  );

export default MyBookings;