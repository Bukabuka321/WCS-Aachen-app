import { BsFillCircleFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/EventsComponets/Button";
import EventMap from "../../components/EventsComponets/Map";
import { IBusiness, IEvents, ITimestamp } from "../../types/interfaces";
import useSWR from "swr";

// Function for changing from Timestamp to JS Date
export function dateFormat(timeStamp: ITimestamp) {
  const date = new Date(
    timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
  );
  return Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

const Details = ({ event }: { event: IEvents }) => {
  // Declared url link of business id
  const businessUrlId: string = `http://localhost:5050/businesses/${event.businessId}`;

  // Created a fetcher function for useSWR
  const fetcher = () => fetch(businessUrlId).then((res) => res.json());

  // Used hook useSWR with interface of IBusiness and paramater: url and fecther function
  const { data, error, isLoading } = useSWR<IBusiness>(businessUrlId, fetcher);

  // Displayed in case "no data" and "loading data"
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="bg-aachen-page w-full h-full lg:px-72 py-8 px-3 flex flex-col">
      <div className="w-full flex justify-center">
        <Image
          className="rounded-3xl w-full"
          width={"400"}
          height={"300"}
          src={event.imageUrl}
          alt="image"
        />
      </div>
      <div className="flex flex-wrap justify-center lg:flex-row lg:justify-around lg:items-center mt-4 mb-4">
        <Link
          href={`https://maps.google.com/?q=${event.timeFrames[0].latitude},${event.timeFrames[0].longitude}`}
        >
          <Button text="Route planen" />
        </Link>

        <Button text="Beiträge" />
        <div>
          {data?.logoImageUrl === "" ? (
            <BsFillCircleFill className="w-11 h-11 text-aachen-yellow hidden lg:block" />
          ) : (
            <Image
              className="rounded-full hidden lg:block"
              src={data?.logoImageUrl!}
              alt="logo"
              width={"112"}
              height={"112"}
            />
          )}
        </div>
        <Link href={`/locals/${data?.itemId}`}>
          <Button text="Geschäft" />
        </Link>

        <Button text="Weiteres" />
      </div>
      <div className="flex flex-col items-center gap-y-3 lg:gap-y-0 lg:flex-row lg:justify-between mb-4">
        <div className="w-full h-full lg:h-56 lg:w-8/12 text-white  rounded-2xl bg-aachen-back p-4">
          <h1 className="font-bold text-xl">{event.title}</h1>
          <p>{event.description}</p>
        </div>
        <div className="w-full lg:w-fit flex flex-col gap-y-3 ml-0 lg:ml-6">
          <div className="w-full text-white  rounded-2xl bg-aachen-back p-4">
            <h1 className="font-bold text-xl">Öffnungszeiten</h1>
            <h2>
              {dateFormat(event.startDate!)} - {dateFormat(event.endDate!)}
            </h2>
          </div>
          <div className="w-full text-white  rounded-2xl bg-aachen-back p-4">
            <h1 className="font-bold text-xl">Soziale Medien</h1>
            <div>
              {event.website == "" ? (
                "Keine Medien"
              ) : (
                <button
                  className="bg-aachen-yellow rounded-2xl w-32 h-10 text-black"
                  type="button"
                >
                  <Link href={event.website!}>Visit website!</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-aachen-back p-4 rounded-xl">
        <h1 className="font-bold text-xl text-white mb-3">Standort</h1>
        <h1 className="font-medium text-lg text-white mb-3">
          Adresse: {event.timeFrames[0].location}
        </h1>
        <EventMap
          latitude={event.timeFrames[0].latitude}
          longitude={event.timeFrames[0].longitude}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  // Fetch data from  API
  const id = context.params.id;

  // Declared url of events id
  const eventsUrlId: string = `http://localhost:5050/events/${id}`;

  // Fetching data
  const res = await fetch(`${eventsUrlId}`);

  // Store in "data" as json file
  const data = await res.json();

  // Pass data to the page via props
  return { props: { event: data } };
}

export default Details;
