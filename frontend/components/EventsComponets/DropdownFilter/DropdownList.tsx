import React, { useState } from "react";
import DropDown from "./Dropdown";
import { IoIosArrowDown } from "react-icons/io";

const DropdownList = ({ selectItem, itemSelection }: any): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const items = () => {
    return [
      "Alle",
      "Cafe",
      "Bäckerei",
      "Kiosk",
      "Bar",
      "Mode-Geschäft",
      "Barbershop",
      "Bildung",
      "Frisuersalon",
    ];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  return (
    <div>
      <button
        className="w-80 h-12 relative flex flex-col justify-center  bg-aachen-search text-aachen-placeholder rounded-xl"
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div className="w-full flex justify-between items-center">
          <p className="ml-5">{selectItem ? selectItem : "Select filter"}</p>
          <IoIosArrowDown className="mr-5" />
        </div>
        {showDropDown && (
          <DropDown
            items={items()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            itemSelection={itemSelection}
          />
        )}
      </button>
    </div>
  );
};

export default DropdownList;
