import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  id: string;
  open: boolean;
  allowBackdropClose?: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const backdropClose = props.allowBackdropClose === undefined ? true : props.allowBackdropClose;

  const onBackdropClose = () => {
    if (!backdropClose) return;
    props.onClose && props.onClose();
  };

  const onClose = () => {
    props.onClose && props.onClose();
  };

  if (!props.open) return null;

  return (
    <>
      <div id={props.id} data-dialog={props.id} onClick={onBackdropClose} className="fixed inset-0 bg-black/70 bg-opacity-50" />
      <div className="absolute fixed inset-0 flex items-center justify-center">
        <div className="bg-[#1A1D23] rounded-xl p-6 min-w-[450px] max-h-[90vh] z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">{props.title}</h2>
            <button className="text-gray-400 hover:text-white" onClick={onClose}>
              <FaTimes className="text-xl" />
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};
