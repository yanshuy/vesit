import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Loader2, Plus, X, Camera, Check } from 'lucide-react';
import { BASE_URL } from '../App';
import { Toast } from '@/components/ui/Toast';

interface Vehicle {
  plate: string;
  model: string;
  type: 'car' | 'bike' | 'other';
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  password: string;
  is_parking_owner: boolean;
  company_name: string;
  contact_number: string;
  vehicle_plate: string;
  vehicle_model: string;
  vehicle_type: string;
}

const UserProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    username: '',
    email: '',
    phone_number: '',
    profile_picture: '',
    password: '',
    is_parking_owner: false,
    company_name: '',
    contact_number: '',
    vehicle_plate: '',
    vehicle_model: '',
    vehicle_type: 'car'
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([{ plate: '', model: '', type: 'car' }]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded = jwtDecode(token) as { user_id: number };
      const userId = decoded.user_id;

      const response = await fetch(`${BASE_URL}/api/auth/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '444'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      setProfile(data);
      // Set initial vehicle from profile data
      if (data.vehicle_plate && data.vehicle_model) {
        setVehicles([{
          plate: data.vehicle_plate,
          model: data.vehicle_model,
          type: data.vehicle_type || 'car'
        }]);
      }
      if (data.profile_picture) {
        setProfilePreview(`${BASE_URL}${data.profile_picture}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        Toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleAddVehicle = () => {
    if (vehicles.length < 3) {
      setVehicles([...vehicles, { plate: '', model: '', type: 'car' }]);
    } else {
      Toast({
        title: "Maximum limit reached",
        description: "You can add up to 3 vehicles",
        variant: "destructive"
      });
    }
  };

  const handleRemoveVehicle = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded = jwtDecode(token) as { user_id: number };
      const userId = decoded.user_id;

      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'profile_picture' && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Only send first vehicle details
      if (vehicles[0]) {
        formData.append('vehicle_plate', vehicles[0].plate);
        formData.append('vehicle_model', vehicles[0].model);
        formData.append('vehicle_type', vehicles[0].type);
      }

      if (profileImage) {
        formData.append('profile_picture', profileImage);
      }

      const response = await fetch(`${BASE_URL}/api/auth/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '444'
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update profile');

      Toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        variant: "default"
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      Toast({
        title: "Update failed",
        description: err instanceof Error ? err.message : 'Failed to update profile',
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-violet-600 rounded-full text-white hover:bg-violet-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to update profile picture</p>
            </div>

            {/* User Details Section */}
            <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone_number}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    phone_number: e.target.value
                  }))}
                />
              </div>

              {profile.is_parking_owner && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={profile.company_name}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        company_name: e.target.value
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_number">Contact Number</Label>
                    <Input
                      id="contact_number"
                      value={profile.contact_number}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        contact_number: e.target.value
                      }))}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Vehicles Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Vehicles</h2>
                <Button
                  type="button"
                  onClick={handleAddVehicle}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </Button>
              </div>

              {vehicles.map((vehicle, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg space-y-4 ${
                    index === 0 ? 'border-violet-200 bg-violet-50/50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Vehicle {index + 1}</h3>
                      {index === 0 && (
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveVehicle(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`vehicle-plate-${index}`}>Plate Number</Label>
                      <Input
                        id={`vehicle-plate-${index}`}
                        value={vehicle.plate}
                        onChange={(e) => {
                          const newVehicles = [...vehicles];
                          newVehicles[index].plate = e.target.value;
                          setVehicles(newVehicles);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`vehicle-model-${index}`}>Model</Label>
                      <Input
                        id={`vehicle-model-${index}`}
                        value={vehicle.model}
                        onChange={(e) => {
                          const newVehicles = [...vehicles];
                          newVehicles[index].model = e.target.value;
                          setVehicles(newVehicles);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`vehicle-type-${index}`}>Type</Label>
                      <Select
                        value={vehicle.type}
                        onValueChange={(value: 'car' | 'bike' | 'other') => {
                          const newVehicles = [...vehicles];
                          newVehicles[index].type = value;
                          setVehicles(newVehicles);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Update Button */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleUpdate}
                disabled={updating}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6"
              >
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;