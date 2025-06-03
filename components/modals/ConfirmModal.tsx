import Button from "../common/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message?: string;
  title?: string;
}

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onClose,
  message = "Are you sure you want to log out of your account?",
  title = "Log out",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onConfirm}
            classname="bg-red-400 hover:bg-red-500 hover:text-gray-100 duration-300"
            title="Yes"
          ></Button>
          <Button
            onClick={onClose}
            classname="bg-purple-300 hover:bg-purple-400 hover:text-grey-100 duration-300"
            title="Cancel"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
