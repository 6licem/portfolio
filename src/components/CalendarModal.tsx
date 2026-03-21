import { useEffect } from 'react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  useEffect(() => {
    if (isOpen) {
      window.open('https://calendar.app.google/Kfgx6ba44eoACr366', '_blank', 'noopener,noreferrer');
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};

export default CalendarModal;
