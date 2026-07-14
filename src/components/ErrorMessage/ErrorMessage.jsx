import { XCircle, X } from "lucide-react";

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
      <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400 hover:text-red-600 transition-colors" aria-label="Dismiss error">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;