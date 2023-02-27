import Link from "next/link";
import LandingPageEvent from "../components/LandingPageEvents";
import LandingPageLocal from "../components/LandingPageLocal";
import {ILocalCompany} from "../types/interfaces";
import {GetServerSideProps} from "next";
import NewsPreview from "../components/NewsPreview";
import ShortNewsList from "../components/ShortNewsList";
import WeatherCard from "../components/WeatherCard";
import {FEEDS, getFeed} from "../lib/rss";
import {IDataNachrichten} from "../types";

export const getServerSideProps: GetServerSideProps = async () => {
    const data: IDataNachrichten[] = [];
    // getting locals info
    const res = await fetch(`http://localhost:5050/businesses`);
    const localsData = await res.json();

    await Promise.all(
        FEEDS.map(async (feedItem) => {
            const {items} = await getFeed(feedItem.link);
            items.forEach((item) => data.push({item, feedItem}));
        })
    );

    // Pass data to the page via props
    return {
        props: {
            data,
            localsData,
        },
    };
};

export default function Home({
                                 data,
                                 localsData,
                             }: {
    data: IDataNachrichten[];
    localsData: ILocalCompany[];
}) {
    const localsOnLanding = localsData
        .filter((company) => company.isVisible)
        .slice(0, 3);

    return (
        <div className="px-8 py-6">
            <div className="w-full pl-14 py-36 my-5 bg-aachen-yellow rounded-xl"
                 style={{
                     backgroundImage: "url('https://images.unsplash.com/photo-1606819788285-5e709f0c798f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
                     width: 'full',
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "bottom",
                 }}>
                <h1 className="text-4xl font-bold text-aachen-yellow">Aachen app</h1>
            </div>
            <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-around lg:gap-x-14">
                <div className="w-full">
                    <Link href={"https://serviceportal.aachen.de/home"}>
                        <h2 className="text-white text-xl font-bold lg:mb-5 hover:text-aachen-yellow">
                            Serviceportal
                        </h2>
                    </Link>
                    <div className="bg-aachen-green rounded-xl py-36 px-28"
                         style={{
                             backgroundImage: "url('https://images.unsplash.com/photo-1606819788625-8cb0d6953f02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
                             width: 'full',
                             backgroundSize: "cover",
                             backgroundRepeat: "no-repeat",
                             backgroundPosition: "center",
                         }}>
                    </div>
                </div>
                <div className="w-full">
                    <Link href={"/events"}>
                        {" "}
                        <h2 className="text-white text-xl font-bold lg:mb-5 hover:text-aachen-yellow">
                            Events
                        </h2>
                    </Link>
                    <LandingPageEvent/>
                </div>
                <div className="w-full">
                    <h2 className="text-white text-xl font-bold lg:mb-5">Coupons</h2>
                    <div className="bg-aachen-green rounded-xl py-36 px-28"
                         style={{
                             backgroundImage: "url('https://img.freepik.com/free-photo/beautiful-gift-voucher-with-decoration_23-2149243852.jpg?w=1800&t=st=1675944001~exp=1675944601~hmac=d01c074e1ead92ce557a6adc90bc35514e1f0de66c6d673144c929639d110fa9')",
                             width: 'full',
                             backgroundSize: "cover",
                             backgroundRepeat: "no-repeat",
                             backgroundPosition: "center",
                         }}>
                        {/* paste your code */}
                    </div>
                </div>
            </div>
            <Link href={"/locals"}>
                <h2 className="w-full text-white text-xl font-bold hover:text-aachen-yellow">
                    Locals
                </h2>
            </Link>
            <div className="flex flex-col gap-y-6 mb-6 mt-6 lg:flex-row  lg:justify-around lg:gap-x-14">
                {localsOnLanding.map((local, index) => (
                    <LandingPageLocal
                        key={index}
                        name={local.name}
                        location={local.location}
                        bigPhotoURL={local.bigPhotoURL}
                        logoImageUrl={local.logoImageUrl}
                        category={local.category}
                        itemId={local.itemId}
                        id={""}
                        workingHours={""}
                        isFavourite={false}
                        longitude={0}
                        latitude={0}
                        description={""}
                        website={""}
                        instagram={""}
                        openingHours={[] as any}
                        couponList={[] as any}
                        isVisible={false}
                    />
                ))}
            </div>
            <Link href="/nachrichten">
                <h2 className="text-white text-xl font-bold lg:mb-5 hover:text-aachen-yellow">
                    Aktuelles
                </h2>
            </Link>
            <div className="flex flex-col lg:h-[406px] lg:flex-nowrap lg:flex-row gap-y-6 w-full lg:justify-around">
                <div
                    className="bg-aachen-back w-full mx-auto lg:w-[23%] lg:overflow-auto lg:scrollbar-hide rounded-xl my-6 md:my-0 p-2 text-white">
                    <ShortNewsList data={data}/>
                </div>
                <div className="w-full lg:w-[48%] mx-auto">
                    <div className=" lg:h-full rounded-xl overflow-hidden mb-6">
                        <NewsPreview data={data}/>
                    </div>
                </div>
                <div
                    className=" bg-aachen-back w-full lg:w-[23%] object-scale-down rounded-xl my-6 lg:my-0 max-w-[360px] text-white mx-auto mt-0 ">
                    <WeatherCard/>
                </div>
            </div>
        </div>
    );
}
