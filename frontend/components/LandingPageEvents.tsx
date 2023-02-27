import { IEvents } from "../types/interfaces";
import useSWR from "swr";
import Image from "next/image";
import { dateFormat } from "../pages/events/[id]";
import Link from "next/link";
import { BsFillCircleFill } from "react-icons/bs";

const LandingPageEvent = () => {
  //    Declared url link of business id
  const eventsUrlId: string = `http://localhost:5050/events`;

  //    Created a fetcher function for useSWR
  const fetcher = () => fetch(eventsUrlId).then((res) => res.json());

  // Used hook useSWR with interface of IBusiness and paramater: url and fecther function
  const { data } = useSWR<IEvents[]>(eventsUrlId, fetcher);

  // set item as undefined, then check if data, that we fetching exists and if true we set random number and use this number as index of array
  let item = undefined;
  if (data != null) {
    const random: number = Math.floor(Math.random() * data?.length);
    item = data[random];
  }

  return (
    <div>
      {item != undefined && (
        <>
          <div className="rounded-t-xl">
            <Link href={`/events/${item.id}`}>
              <Image
                className="rounded-t-xl"
                src={item.imageUrl}
                alt="event_image"
                width={418}
                height={200}
              />
            </Link>
          </div>
          <div className="bg-aachen-back rounded-b-xl">
            <div className="flex flex-col gap-y-4 pl-6 py-3 ">
              <Link href={`/events/${item.id}`}>
                <h3 className="text-white text-lg font-medium hover:text-aachen-yellow">
                  {item.title}
                </h3>
              </Link>
              <div className="flex gap-x-4">
                <BsFillCircleFill className="w-4 h-4 text-aachen-yellow" />
                <p className="font-normal text-sm text-[#E0E0E0]">
                  {item.location || item.timeFrames[0].location}
                </p>
              </div>
              <div className="flex gap-x-4">
                <BsFillCircleFill className="w-4 h-4 text-aachen-yellow" />
                <p className="font-normal text-sm text-[#E0E0E0]">
                  Ab {dateFormat(item.startDate!)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPageEvent;
