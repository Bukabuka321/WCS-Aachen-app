import EventsSwitchButton from "./FilterSwitchButton";

export interface ITitle {
  name: string;
  handleChange: () => void;
  amount?: number;
}

const EventsFilter = ({ name, handleChange }: ITitle) => {
  return (
    <div className="flex justify-between">
      <h2 className="text-white font-medium text-xl">{name}</h2>
      <button type="button" onClick={handleChange}>
        <EventsSwitchButton />
      </button>
    </div>
  );
};

export default EventsFilter;
