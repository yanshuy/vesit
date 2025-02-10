import type React from "react";
import { Star, UserRound } from "lucide-react";

interface Review {
  id: number;
  spotId: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

interface Props {
  spotId: number;
}

// Mock data for reviews
const reviews: Review[] = [
  {
    id: 1,
    spotId: 1,
    rating: 4,
    comment:
      "Clean and easy to access. Great location in the heart of downtown.",
    author: "John D.",
    date: "2023-05-15",
  },
  {
    id: 2,
    spotId: 1,
    rating: 5,
    comment:
      "Always available spots, even during peak hours. Highly recommend!",
    author: "Sarah M.",
    date: "2023-05-10",
  },
  {
    id: 3,
    spotId: 2,
    rating: 3,
    comment:
      "Convenient location, but a bit pricey for the area. Security could be improved.",
    author: "Mike R.",
    date: "2023-05-08",
  },
];

const ReviewList: React.FC<Props> = ({ spotId }) => {
  const spotReviews = reviews.filter((review) => review.spotId === spotId);

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-secondary-800 mb-4">Reviews</h4>
      {spotReviews.length === 0 ? (
        <p className="text-secondary-600">
          No reviews yet. Be the first to leave a review!
        </p>
      ) : (
        spotReviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <UserRound className="h-10 w-10 text-secondary-400 mr-3" />
              <div>
                <p className="font-semibold text-secondary-800">
                  {review.author}
                </p>
                <p className="text-sm text-secondary-500">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating ? "text-yellow-400" : "text-secondary-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-secondary-600">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
