import  { useEffect, useRef } from 'react';

// Define the Modal component with TypeScript-like prop types (or use PropTypes in JS)
const Modal = ({
  isOpen, // Boolean to control visibility
  onClose, // Function to handle closing
  children, // Dynamic content
  title, // Optional title
  footer, // Optional footer (e.g., buttons)
  className = '', // Custom class for styling
}) => {
  const modalRef = useRef(null); // Ref for focus trapping or DOM access

  // Handle Esc key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Optional: Trap focus inside the modal
      // You can add more logic here, e.g., using a focus-trap library
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Don't render if not open

  return (
    <div
      className={`fixed inset-0 bg-[rgba(36,39,82,0.5)] backdrop-blur-md z-50 flex items-center justify-center ${className}`}
      role="dialog" // Accessibility: Define the role
      aria-modal="true"
      aria-labelledby="modal-title" // Link to title for screen readers
      onClick={onClose} // Close on overlay click
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        className="bg-white p-4 rounded shadow-lg relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing on inner clicks
      >
        {/* Optional Title */}
        {/* {title && (
          <h2 id="modal-title" className="text-lg font-bold mb-4">
            {title}
          </h2>
        )} */}

        {/* Close button - Make it customizable if needed */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
          aria-label="Close modal" // Accessibility: Descriptive label
        >
          ✖
        </button>

        {/* Modal content */}
        <div className="mt-3 p-3 flex justify-center items-center gap-4">
          {children} {/* Dynamic content goes here */}
        </div>

        {/* Optional Footer */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;