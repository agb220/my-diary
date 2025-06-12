import Form from "../Form";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-full max-w-sm text-center animate-fadeIn">
        <Form onClose={onClose} />
      </div>
    </div>
  );
};

export default ConfirmModal;
