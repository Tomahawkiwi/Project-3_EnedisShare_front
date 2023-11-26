import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IProps {
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
}

function Modal({ isShowing, hide, ...props }: IProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="top-0 left-0  w-full h-full overflow-x-hidden overflow-y-auto outline-none">
          <div className="absolute right-3 top-20 rounded-b-app-bloc w-[168px] bg-blue-enedis p-5 font-enedis shadow-xl ">
            <div className="flex justify-between  " />
            <div>{props.children}</div>
          </div>
        </div>,

        document.body
      )
    : null;
}

export default Modal;
