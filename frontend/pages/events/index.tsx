import DropdownList from "../../components/EventsComponets/DropdownFilter/DropdownList";
import SearchField from "../../components/EventsComponets/SearchField";
import EventsFilter from "../../components/Filter/Fliter";
import EventCalendar from "../../components/EventsComponets/Calendar/EventCalendar";
import { IBusiness, IEvents } from "../../types/interfaces";
import EventsCard, {
  dateFormat,
} from "../../components/EventsComponets/EventCard";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import useSWR from "swr";

const Events = ({ events }: { events: IEvents[] }) => {
  // Declared url link of business id
  const businessUrlId: string = `http://localhost:5050/businesses`;

  // Created a fetcher function for useSWR
  const fetcher = () => fetch(businessUrlId).then((res) => res.json());

  // Used hook useSWR with interface of IBusiness and paramater: url and fecther function
  const { data } = useSWR<IBusiness[]>(businessUrlId, fetcher);

  //useState to set state for filter by date
  const [isActive, setIsActive] = useState<boolean>(false);

  //function for changing state inside date filter
  const FilterByDate = () => {
    setIsActive(!isActive);
  };

  //state for jetzt geoffnet flter
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //function for jetzt geoffnet filter
  const isOpenNow = () => {
    setIsOpen(!isOpen);
  };

  //state for filtering events by category
  const [selectItem, setSelectItem] = useState<string>("");

  //function for filtering events by category
  const itemSelection = (item: string): void => {
    setSelectItem(item);
  };

  //*handling search field in search bar START
  const [searchInput, setSearchInput] = useState<string>("");

  //using useDebounce to debounce any fast changing value
  const [debounceResult] = useDebounce(searchInput, 500);

  //function for changing value inside input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //*handling search field in search bar END

  //useState for settings today's date and changing date in calendar component
  const [value, onChange] = useState<Date>(new Date());

  //date format for calendar "dd.mm.yyyy"
  const dateOnly: any = { dateStyle: "medium" };

  //date format for calndar "dd.mm.yyy hh:mm"
  const dateAndTime: any = { dateStyle: "medium", timeStyle: "short" };

  const timeOnly: any = { timeStyle: "short" };

  //filtering function
  const filteredEvents = events.filter((event) => {
    //filtering by name of event
    let isMatchedSearchByTittle =
      event.title.toLowerCase().includes(debounceResult.toLowerCase()) ||
      !searchInput;

    //filtering by date
    let isMatchedSearchByDate =
      dateFormat(event.startDate!, dateOnly) ===
      value.toLocaleDateString("de-DE", dateOnly);

    //TODO: compare event start and end Date to current date (value) using the type JS Date
    //TODO: comparing should find if the store is open
    //TODO: let isMatchedSearchByDateAndTime =
    //TODO:  dateFormat(event.startDate!, dateAndTime) <=
    //TODO:  new Intl.DateTimeFormat("de-DE", dateAndTime).format(value);
    //TODO: talk about it with Fynn

    let isMatchedSearchByDateAndTime =
      dateFormat(event.startDate!, dateOnly) <=
        new Intl.DateTimeFormat("de-DE", dateOnly).format(value) &&
      dateFormat(event.startDate!, timeOnly) <=
        new Intl.DateTimeFormat("de-DE", timeOnly).format(value) &&
      dateFormat(event.endDate!, dateOnly) >=
        new Intl.DateTimeFormat("de-DE", dateAndTime).format(value) &&
      dateFormat(event.endDate!, timeOnly) >=
        new Intl.DateTimeFormat("de-DE", timeOnly).format(value);

    //filtering by category of business.
    //Firstly filter "data" (businesses table) and matching itemID (inside business data)
    //and businessId (id fro business inside event card)
    let BusnessObject = data?.filter((business) => {
      return business.itemId === event.businessId;
    })[0];

    //Based on comparing id, we compare category and item in dropdown list
    let isMatchedCategory =
      BusnessObject?.category === selectItem || !selectItem;
    //compare if business is visible, if not then events and businees won't be displayed

    let isMatchedVisible = BusnessObject?.isVisible === true;

    return (
      isMatchedSearchByTittle &&
      isMatchedVisible &&
      (isActive ? isMatchedSearchByDate : isMatchedSearchByTittle) &&
      (selectItem === "Alle" ? isMatchedSearchByTittle : isMatchedCategory) &&
      (isOpen ? isMatchedSearchByDateAndTime : isMatchedSearchByTittle)
    );
  });

  return (
    <div className="w-full h-full bg-aachen-page flex flex-col lg:flex-row lg:justify-beetwen">
      <div className=" bg-aachen-search px-9 pb-9">
        <div className="mb-3 lg:mb-52 mt-10">
          <h1 className="text-white text-4xl font-bold mb-6">
            {filteredEvents.length} Events
          </h1>
          <EventsFilter
            name={"Nach Datum filtern"}
            handleChange={FilterByDate}
          />
          <EventsFilter name={"Findet jetzt statt"} handleChange={isOpenNow} />
        </div>
        <EventCalendar value={value} onChange={onChange} />
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center mx-5 lg:mx-0">
          <div className="w-full lg:w-890px mt-7 mb-3 flex flex-col items-center gap-y-3 lg:gap-y-0 lg:flex-row lg:justify-between ">
            <SearchField
              placeholder={"Events durchsuchen ..."}
              handleChange={handleChange}
              searchInput={searchInput}
            />
            <DropdownList
              selectItem={selectItem}
              itemSelection={itemSelection}
            />
          </div>
          <div>
            {filteredEvents.map((event: IEvents) => (
              <EventsCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//Using Server Side Rendering function
export async function getServerSideProps() {
  // Fetch data from  API
  const res = await fetch(`http://localhost:5050/events/`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { events: data } };
}

export default Events;
