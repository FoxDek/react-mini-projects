import React, { useState } from "react";
import { baseButton } from "../styles/button";
import { cva } from "class-variance-authority";
import ModalWindow from "../components/ModalWindow";

const modalContent = cva(
  'modalWindow flex flex-col items-center justify-center gap-20 py-5'
)

const modalDescription = cva(
  'text-xl text-center'
)

const modalWindowOverlay = cva(
  "modalOverlay fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
);

const modalWindowContainer = cva(
  "modalContainer z-30 flex justify-center h-full w-full items-center p-5"
);

const modalWindowSubstrate = cva(
  "modalSubstrate relative border bg-white border-gray-800 rounded-2xl p-5 text-slate-600 text-center shadow-[0_4px_0_rgba(0,0,0,0.1)] motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
);

const modalWindowContent = cva(
  'modalWindowContent flex flex-col gap-6'
)

const modalWindowDescription = cva(
  'modalWindowDescription text-base font-bold'
);

const modalWindowCloseButton = cva(
  "modalCloseButton absolute right-5 top-4 border bg-white border-gray-800 rounded-sm text-slate-600 text-center shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none"
);

function Modal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleToggleModal = () => {
    const modalRoot = document.getElementById("modal-root");

    if (modalIsOpen) {
      setModalIsOpen(false);
      modalRoot.className = "";
    } else {
      setModalIsOpen(true);
      modalRoot.className = "fixed inset-0 z-50";
    }
  };

  return (
    <>
      <div className={modalContent()}>
        <p className={modalDescription()}>
          Click this button to open modal window
        </p>
        <button onClick={handleToggleModal} className={baseButton({className: 'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 text-white'})}>
          Open Modal ✨
        </button>
      </div>

      {modalIsOpen && (
        <ModalWindow>
          <div className={modalWindowOverlay()}>
            <div className={modalWindowContainer()}>
              <div className={modalWindowSubstrate()}>
                <div className={modalWindowContent()}>
                  <h3 className={modalWindowDescription()}>It`s modal</h3>
                  <img
                    className='rounded-2xl'
                    src='https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/df393f61366e8280393dd079fbf8e0e0e05c634c597c28a1bb22b2c3de153203.gif'
                    alt='Gif there'
                  />
                </div>
                <button
                  onClick={handleToggleModal}
                  className={modalWindowCloseButton()}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18 18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default Modal;
