import Calendar from "react-calendar";

const EventCalendar = ({ onChange, value }: any) => {
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default EventCalendar;
