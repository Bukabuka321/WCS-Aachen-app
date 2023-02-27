import React, { FunctionComponent } from "react";
import { IFeed, INewsItem } from "../types";

type NewsCardProps = {
  feed: IFeed;
  item: INewsItem;
};
const NewsCard: FunctionComponent<NewsCardProps> = ({ feed, item }) => {
  return (
    <div>
      <div className="h-fit bg-aachen-back rounded-2xl mb-4">
        <div className="flex flex-nowrap justify-between">
          <div className="flex flex-nowrap">
            <div className="ml-3.5 mr-3.5 mt-4 mb-6">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={feed.publisher.profilePictureUrl}
                alt="publisher logo"
              />
            </div>
            <div className="flex flex-wrap flex-col mt-4">
              <p className="text-white">{feed.publisher.name}</p>
              <p className="text-white text-sm font-light">
                {feed.publisher.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="block sm:flex sm:flex-nowrap ml-3 mb-4">
          <a key={item.link} href={item.link} className="sm:hidden">
            <p className="text-white font-medium text-xl hover:text-aachen-yellow">
              {item.title}
            </p>
          </a>
          {item.enclosure?.url && (
            <div className="rounded-xl sm:overflow-hidden sm:h-[120px] mr-4 my-2">
              <img
                className="w-[90%] rounded-xl sm:w-[180px] m-auto"
                src={item.enclosure.url}
                alt="news image"
              />
            </div>
          )}
          <div className="w-496px h-fit flex flex-col flex-grow justify-center items-start pr-2">
            <a key={item.link} href={item.link} className="hidden sm:block">
              <p className="text-white font-medium text-xl hover:text-aachen-yellow">
                {item.title}
              </p>
            </a>
            <p className="text-white font-light text-sm overflow-hidden text-ellipsis mt-2 hidden sm:block">
              {item.contentSnippet.slice(0, 190)}...
            </p>
            <p className="text-date-event text-sm font-thin my-2">
              {" "}
              {new Date(item.pubDate).toLocaleString("de-DE", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              uhr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
