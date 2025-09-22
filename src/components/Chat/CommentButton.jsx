import { useState, useRef, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { postActionAx } from "../../api";
import useErrorHandler from "../../hooks/useErrorHandler";
import { createPortal } from "react-dom";

const CommentButton = (props) => {
  const errorHandler = useErrorHandler();

  const [leaveCmModal, setLeaveCmModal] = useState(false);
  const [viewCmModal, setViewCmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const leaveCmModalRef = useRef(null);
  const buttonRef = useRef(null);
  const viewCmModalRef = useRef(null); 
  const submittedCommentRef = useRef(null); 

  useClickOutside(leaveCmModalRef, () => setLeaveCmModal(false));
  useClickOutside(viewCmModalRef, () => setViewCmModal(false));

  // close modal on scroll
  useEffect(() => {
    if (!leaveCmModal) return;
    const handleScroll = () => {
      setLeaveCmModal(false);
    };
    const chatContainer = document.querySelector("#chat-container");
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [leaveCmModal]);

  // close modal on scroll
  useEffect(() => {
    if (!viewCmModal) return;
    const handleScroll = () => {
      setViewCmModal(false);
    };
    const chatContainer = document.querySelector("#chat-container");
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [viewCmModal]);

  useEffect(() => {
    if (props.feedback?.feedbackText) {
      setSubmittedComment(props.feedback.feedbackText);
    }
  }, [props.feedback?.feedbackText]);

  const sendCommentHandler = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const postFeedback = async () => {
      let feedbackObj = {
        message_id: props.messageId,
        rating: props.feedback.rating,
        feedback_text: comment,
      };
      await postActionAx("/api/chat/feedback", feedbackObj)
        .then((res) => {
          setSubmittedComment(comment.trim());
        })
        .catch((err) => {
          errorHandler(err);
        })
        .finally(() => {
          setIsLoading(false);
          setLeaveCmModal(false);
          setComment("");
        });
    };
    postFeedback();
  };

  return (
    <div>
      <div className="flex p-1">
        {/* submittedComment */}
        {submittedComment !== "" && (
          <span
            onClick={() => setViewCmModal(true)}
            title={submittedComment}
            ref={submittedCommentRef}
            className="bg-[#242752] text-white text-xs rounded flex items-center p-1 w-[250px] truncate cursor-pointer"
            dir="rtl"
          >
            {submittedComment}
          </span>
        )}
        {/* button */}
        <button
          ref={buttonRef}
          onClick={() => setLeaveCmModal(!leaveCmModal)}
          className="hover:bg-gray-100 p-1 rounded transition flex items-center gap-2 relative"
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
            <span className="absolute top-[5px] right-[4px] bg-[#242752] text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
          )}
        </button>
      </div>
      {/* leaveCmModal */}
      {leaveCmModal &&
        createPortal(
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div
              ref={leaveCmModalRef}
              className="absolute pointer-events-auto"
              style={{
                top:
                  buttonRef.current?.getBoundingClientRect().bottom +
                  window.scrollY +
                  5,
                left:
                  buttonRef.current?.getBoundingClientRect().left +
                  window.scrollX,
                width: "250px",
              }}
            >
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
          </div>,
          document.body
        )}
      {/* viewCmModal */}
      {viewCmModal &&
        createPortal(
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div
              ref={viewCmModalRef}
              className="absolute pointer-events-auto"
              style={{
                top:
                  submittedCommentRef.current?.getBoundingClientRect().bottom +
                  window.scrollY +
                  5,
                left:
                  submittedCommentRef.current?.getBoundingClientRect().left +
                  window.scrollX,
                width: "250px",
              }}
            >
              <div className="bg-white border border-gray-500 rounded p-2 shadow-lg">
                <p className="text-sm text-gray-800 break-words">
                  {submittedComment}
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setViewCmModal(false)}
                    className="bg-[#242752] text-white py-1 px-2 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CommentButton;
