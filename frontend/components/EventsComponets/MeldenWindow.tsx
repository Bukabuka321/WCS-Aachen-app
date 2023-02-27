import { TbMessageReport } from "react-icons/tb";

const MeldenWindow = ({ openAlertClick, windowText }: { openAlertClick: () => void, windowText: string }) => {
  return (
    <div className="absolute right-12 bg-aachen-search rounded-xl px-9 py-3 flex justify-center items-center">
      <button type="button" onClick={openAlertClick}>
        <div className="flex flex-nowrap">
          <TbMessageReport className="text-white w-6 h-6 mr-2" />
          <p className="text-white">{windowText}</p>
        </div>
      </button>
    </div>
  );
};

export default MeldenWindow;
