import { useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import { getActionAx } from "../../api";
import FeedbackButtons from "./FeedbackButtons";

const MessageFeedback = (props) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    feedbackText: "",
    messageId: null,
  });

  const getFeedback = async () => {
    await getActionAx(`/api/chat/feedback/${props.messageId}`)
      .then((res) => {
        console.log("get feedBack", res.data);

        const feedbackData = res.data?.feedback || {};
        console.log("ZZZfeedback", feedbackData);

        setFeedback({
          rating: feedbackData.rating || 0,
          feedbackText: feedbackData.feedback_text || "",
          messageId: props.messageId,
        });
      })
      .catch((err) => {
        // errorHandler(err);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFF", feedback);
  }, [feedback]);

  return (
    <div className="bg-white rounded overflow-hidden w-fit">
      <div className="flex items-center">
        <CommentButton feedback={feedback} messageId={props.messageId} />
        <FeedbackButtons feedback={feedback} messageId={props.messageId} />
      </div>
    </div>
  );
};

export default MessageFeedback;
