import React from "react";
import { IDataNachrichten } from "../types";

const ShortNewsList = ({ data }: { data: IDataNachrichten[] }) => {
  return (
    <div className="w-full h-full">
      {data
        .sort(
          (objA, objB) =>
            +new Date(objB.item.pubDate) - +new Date(objA.item.pubDate)
        )
        .slice(0, 10)
        .map((item) => (
          <div
            key={item.item.title}
            className="w-full f-full flex flex-col flex-grow justify-center my-2 items-start pr-2"
          >
            <a href={item.item.link}>
              <p className="text-white font-medium text-sm hover:text-aachen-yellow">
                {item.item.title}
              </p>
            </a>
            <p className="text-date-event text-xs font-thin my-1">
              {" "}
              {new Date(item.item.pubDate).toLocaleString("de-DE", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              uhr
            </p>
          </div>
        ))}
    </div>
  );
};

export default ShortNewsList;
