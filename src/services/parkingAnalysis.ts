import { BASE_URL } from "../App";

interface Analysis {
  occupancy: number
  availableSpots: number
  totalSpots: number
  summary : string
}

export const analyzeParking = async (formData: FormData): Promise<Analysis> => {
  try {
    const response = await fetch(`${BASE_URL}/api/bookings/analysis/`, {
      method: 'POST',
      body: formData, 
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      occupancy: data.occupancy,
      availableSpots: data.availableSpots,
      totalSpots: data.totalSpots,
      summary: data.summary,
    };
  } catch (error) {
    console.error('Parking analysis error:', error);
    throw new Error('Failed to analyze parking image');
  }
};