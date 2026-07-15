import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm, userName, isLoading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <div>
        <p className="text-gray-800 font-medium">
          Are you sure you want to delete{" "}
          <span className="text-red-600 font-semibold">{userName}</span>?
        </p>
        <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3 w-full pt-2">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
          Cancel
        </button>
        <button onClick={onConfirm} disabled={isLoading} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all disabled:opacity-60">
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;