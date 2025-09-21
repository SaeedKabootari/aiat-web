import { useState, useEffect } from "react";
import { getActionAx, postActionAx } from "../../api";

const FeedbackButtons = ({ messageId }) => {
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const buttonClickHandler = async (clickedButton) => {
    if (isLoading) return;

    const newRating = rating === clickedButton ? null : clickedButton;
    setRating(newRating);
    setIsLoading(true);

    const postFeedback = async () => {
      let feedbackObj = {
        message_id: 18,
        rating: newRating,
        feedback_text: "very nice!!",
      };
      await postActionAx("/api/chat/feedback", feedbackObj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          setRating(rating);
          // errorHandler(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    postFeedback();
  };

  return (
    <div className="bg-white">
      {/* dislike */}
      <button
        onClick={() => buttonClickHandler(0)}
        className={` hover:bg-gray-100 p-1 rounded transition ${
          rating === 0 ? "bg-red-100" : ""
        }`}
      >
        <svg
          className="w-5 h-5 text-gray-500  cursor-pointer transform rotate-180"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* like */}
      <button
        onClick={() => buttonClickHandler(1)}
        className={` hover:bg-gray-100 p-1 rounded transition ${
          rating === 1 ? "bg-red-100" : ""
        }`}
      >
        <svg
          className="w-5 h-5 text-gray-500 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default FeedbackButtons;
