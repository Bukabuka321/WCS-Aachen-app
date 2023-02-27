import React, { useEffect, useState } from "react";

type DropDownProps = {
  items: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  itemSelection: Function;
};

const Dropdown: React.FC<DropDownProps> = ({
  items,
  itemSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onClickHandler = (category: string): void => {
    itemSelection(category);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className="absolute top-14 w-full z-10 text-center bg-aachen-search text-aachen-placeholder rounded-xl">
        {items.map((item: string, index: number): JSX.Element => {
          return (
            <p
              className="mb-2 mt-2"
              key={index}
              onClick={(): void => {
                onClickHandler(item);
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Dropdown;
