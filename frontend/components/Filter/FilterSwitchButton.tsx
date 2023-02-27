import { FC, useState } from "react";
import classNames from "classnames";

const EventsSwitchButton: FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={classNames(
        "flex w-12 h-6 ml-9 mb-6 mr-4 rounded-full trasition-all duration-500",
        {
          "bg-aachen-yellow": isSelected,
        },
        {
          "bg-aachen-toggler": !isSelected,
        }
      )}
    >
      <span
        className={classNames(
          "w-6 h-6 bg-aachen-back rounded-full trasition-all duration-500 shadow-lg",
          {
            "ml-6": isSelected,
          }
        )}
      />
    </div>
  );
};

export default EventsSwitchButton;
