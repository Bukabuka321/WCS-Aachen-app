import Image from "next/image";
import { BsThreeDots, BsFillCircleFill } from "react-icons/bs";
import Link from "next/link";
import { IBusiness, IEvents, ITimestamp } from "../../types/interfaces";
import useSWR from "swr";
import { useEffect, useState } from "react";
import MeldenWindow from "./MeldenWindow";
import useOutsideClick from "../../hooks/useClickOutside";
import MeldenAlert from "./MeldenAlert";

// Function for changing from Timestamp to JS Date
export function dateFormat(
  timeStamp: ITimestamp,
  options: any = { dateStyle: "medium", timeStyle: "short" }
) {
  const date = new Date(
    timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
  );
  return Intl.DateTimeFormat("de-DE", options).format(date);
}

const EventsCard = ({ event }: { event: IEvents }) => {
  // Declared url link of business id
  const businessUrlId: string = `http://localhost:5050/businesses/${event.businessId}`;

  // Created a fetcher function for useSWR
  const fetcher = () => fetch(businessUrlId).then((res) => res.json());

  // Used hook useSWR with interface of IBusiness and paramater: url and fecther function
  const { data } = useSWR<IBusiness>(businessUrlId, fetcher);

  //state for opening and closing "Melden" button
  const [windowOpen, setWindowOpen] = useState<boolean>(false);

  //function for closing and opening "Melden" button
  function handleClick() {
    setWindowOpen(!windowOpen);
  }

  //importing hook for closing "Melden" button by clicking outside
  const ref: any = useOutsideClick(handleClickOutside);

  //function for closing "Melden" button
  function handleClickOutside() {
    setWindowOpen(false);
  }

  //state for dispalying alert message
  const [alert, setAlert] = useState<boolean>(false);

  //function for dispalying alert message
  const openAlert = () => {
    setAlert(!alert);
  };

  //useEffect with timer for closing alert message wich react on "alert" state
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  //state for if id inside object exist
  const [likedItems, setLikedItems] = useState<{ [itemID: string]: boolean }>(
    {}
  );

  //fuction for storing id inside object
  const handleAddMerken = (itemID: string) => {
    const newLikedItems = { ...likedItems, [itemID]: !likedItems[itemID] };
    setLikedItems(newLikedItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("likedEvents", JSON.stringify(newLikedItems));
    }
  };

  //useEffect for displaying if id inside the object
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLikedItems(JSON.parse(localStorage.getItem("likedEvents") || "{}"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("likedEvents", JSON.stringify(likedItems));
    }
  }, [likedItems]);

  return (
    <div className="w-full h-96 lg:w-890px lg:h-52 bg-aachen-back rounded-2xl mb-4">
      <div className="flex flex-nowrap justify-between">
        <div className="flex flex-nowrap">
          <div className="ml-3.5 mr-3.5 mt-4 mb-6">
            {data?.logoImageUrl === "" ? (
              <BsFillCircleFill className="w-11 h-11 text-aachen-yellow" />
            ) : (
              <Image
                className="rounded-full"
                src={data?.logoImageUrl!}
                alt="logo"
                width={"44"}
                height={"44"}
              />
            )}
          </div>
          <div className="flex flex-wrap flex-col mt-4">
            <Link href={`/locals/${data?.itemId}`}>
              <h2 className="text-white hover:text-aachen-yellow">
                {data?.name}
              </h2>
            </Link>
            <p className="text-white text-sm font-light">
              {data?.category ?? "Category"}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            ref={ref}
            onClick={handleClick}
            className="mt-6 mr-3.5 text-2xl text-white"
          >
            <BsThreeDots />
          </button>
          {windowOpen ? (
            <MeldenWindow openAlertClick={openAlert} windowText={"Melden"} />
          ) : (
            ""
          )}
          {alert ? <MeldenAlert /> : ""}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:flex-nowrap ml-0 lg:ml-3 pl-3 lg:pl-0 mb-4 pr-3 lg:pr-0">
        <div className="mr-4">
          <Image
            className="rounded-xl"
            src={event.imageUrl}
            alt="image"
            width="220"
            height="110"
          />
        </div>
        <div className="w-full h-28 lg:w-496px lg:h-28 flex flex-col justify-center items-start">
          <Link href={`/events/${event.id}`}>
            <h1 className="text-white font-medium text-xl hover:text-aachen-yellow">
              {event.title}
            </h1>
          </Link>
          <p className="text-date-event text-sm font-thin">
            {dateFormat(event.startDate!)} - {dateFormat(event.endDate!)}
          </p>
          <p className="text-white font-light text-sm overflow-hidden text-ellipsis">
            {event.description}
          </p>
        </div>
        <div className="flex items-end">
          <button
            className={
              !!likedItems[event.id]
                ? "bg-[#353535] text-center py-2 w-40 rounded-xl border border-aachen-yellow-darker text-white lg:mx-8 mx-0 my-2 lg:my-0"
                : "bg-aachen-yellow text-center py-2 w-40 rounded-xl lg:mx-8 mx-0 my-2 lg:my-0"
            }
            onClick={() => handleAddMerken(event.id)}
          >
            {!!likedItems[event.id] ? "Gemerkt" : "Merken"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
