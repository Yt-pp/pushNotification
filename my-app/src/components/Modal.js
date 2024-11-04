export const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-lg font-bold mb-4">Message Details</h2>
          <p>{message.content}</p>
          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  