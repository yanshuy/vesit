import { Star } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Props {
  spotId: number;
}

const ReviewForm: React.FC<Props> = ({ spotId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log("Submitted review:", { spotId, rating, comment });
    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white p-6 rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold text-secondary-800 mb-4">
        Add a Review
      </h4>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-secondary-700 mb-2">
          Rating
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`h-8 w-8 ${
                star <= rating ? "text-yellow-400" : "text-secondary-300"
              } focus:outline-none`}
            >
              <Star />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-secondary-700 mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full px-3 py-2 text-secondary-700 border rounded-lg focus:outline-none focus:border-primary-500"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
