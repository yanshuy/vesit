// ReviewSection.tsx
import { useState } from "react";
import { Star, UserCircle } from "lucide-react";

const ReviewSection = ({ spotId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

      {/* Review Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Write a review</h3>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-1 ${
                rating >= star ? "text-amber-500" : "text-gray-300"
              }`}
            >
              <Star className="w-8 h-8" />
            </button>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={4}
          placeholder="Share your experience..."
        />
        <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {[1, 2, 3].map((review) => (
          <div
            key={review}
            className="pb-6 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-start mb-4">
              <UserCircle className="w-10 h-10 text-gray-400 mr-4" />
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-500 mr-1" />
                  4.5 • March 15, 2024
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Excellent parking facility with great security measures. The
              location is very convenient and the prices are reasonable.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
