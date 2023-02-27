import {ILocalCompany} from "../types/interfaces";
import Image from "next/image";
import Link from "next/link";

const LandingPageLocal = (props: ILocalCompany) => {
    const {name, location, logoImageUrl, bigPhotoURL, category, itemId} = props;
    return (
        <div className="relative lg:w-full ">
            <div className="bg-none rounded-t-xl py-32 px-28"
                 style={{
                     backgroundImage: `url(${bigPhotoURL})`,
                     width: 'full',
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                 }}></div>
            <div className="absolute  top-52 left-3">
                <div className="rounded-full bg-none w-20 h-20"
                     style={{
                         backgroundImage: `url(${logoImageUrl})`,
                         width: 'full',
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                     }}>
                </div>
            </div>
            <div className="bg-aachen-back rounded-b-xl">
                <div className="flex flex-col gap-y-4 pl-3 pb-3 pt-10">
                    <Link href={`/locals/${itemId}`}>
                        <h3 className="text-white text-lg font-medium text-center hover:text-aachen-yellow">{name}</h3>
                    </Link>
                    <p className="text-white text-base font-light">· {category} · {location}</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPageLocal;
