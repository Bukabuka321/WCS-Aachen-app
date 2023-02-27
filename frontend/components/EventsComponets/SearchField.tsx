import { BiSearchAlt2 } from "react-icons/bi";
import { InputProps } from "../../types/interfaces";

const SearchField = (props: InputProps) => {
  const { placeholder, handleChange, searchInput } = props;
  //TODO: delete button
  return (
    <div className="w-80 h-12 flex bg-aachen-search text-aachen-placeholder rounded-xl items-center">
      <div className=" mr-5 ml-5 mt-5 mb-5 w-3 h-3">
        <BiSearchAlt2 />
      </div>
      <input
        className="w-full text-start  h-12 bg-aachen-search rounded-xl border-transparent"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default SearchField;
