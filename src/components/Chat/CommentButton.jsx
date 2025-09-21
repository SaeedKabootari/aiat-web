import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { getActionAx, postActionAx } from "../../api";

const CommentButton = ({ messageId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setModalOpen(false));
  const sendCommentHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const postFeedback = async () => {
      let feedbackObj = {
        message_id: 18,
        rating: 0,
        feedback_text: comment,
      };
      await postActionAx("/api/chat/feedback", feedbackObj)
        .then((res) => {
          console.log(res.data);
          setSubmittedComment(comment.trim());
        })
        .catch((err) => {
          // errorHandler(err);
        })
        .finally(() => {
          setIsLoading(false);
          setModalOpen(false);
          setComment("");
        });
    };
    postFeedback();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="hover:bg-gray-100 p-1 rounded transition flex items-center gap-2"
      >
        <svg
          className="w-5 h-5 text-gray-500 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {submittedComment !== "" && (
          <span className="absolute -top-1 -right-1 bg-[#242752] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        )}
        {submittedComment !== "" && (
          <span className="= bg-[#242752] text-white text-xs rounded flex items-center justify-center p-1">
            {submittedComment}
          </span>
        )}
      </button>

      {modalOpen && (
        <div ref={modalRef} className="absolute right-0 top-full mt-1 z-10">
          <div className="bg-white border border-gray-500 rounded p-1 flex flex-col gap-1 shadow-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none p-1 border-none outline-none focus:ring-0 w-full"
              rows={2}
              style={{ minWidth: "200px" }}
              placeholder="نظر خود را بنویسید..."
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <button
                onClick={sendCommentHandler}
                disabled={isLoading || !comment.trim()}
                className="bg-[#242752] text-white py-1 px-2 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "در حال ثبت کردن..." : "ثبت"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentButton;
