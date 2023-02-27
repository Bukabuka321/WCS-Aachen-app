import { FC } from "react";

interface IButton {
  text: string;
}

const Button: FC<IButton> = ({ text }) => {
  return (
    <button className="px-4 py-1 h-12 w-36  text-white  bg-aachen-back border-solid border border-button-border rounded-xl m-3 lg:m-0">
      {text}
    </button>
  );
};

export default Button;
