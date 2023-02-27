import React, { createRef, useMemo, RefObject } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "../styles/Nachrichten.module.css";
import { IDataNachrichten } from "../types";

const NewsPreview = ({ data }: { data: IDataNachrichten[] }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const numSlides = useMemo(() => Math.min(5, data.length), [data]);

  const slides = useMemo(() => {
    return data
      .sort(
        (objA, objB) =>
          +new Date(objB.item.pubDate) - +new Date(objA.item.pubDate)
      )
      .filter((item) => item.item.enclosure !== undefined)
      .slice(0, numSlides);
  }, [data, numSlides]);

  const refs: RefObject<HTMLDivElement>[] = useMemo(() => {
    const _refs = [];
    for (let i = 0; i < numSlides; i++) {
      _refs.push(createRef<HTMLDivElement>());
    }
    return _refs;
  }, [numSlides]);

  React.useEffect(() => {
    // console.log("Trying to scroll into view slide number", currentSlide);

    // console.log(refs, refs[currentSlide]);

    if (refs[currentSlide] == null || refs[currentSlide].current == null)
      return;

    refs[currentSlide].current!.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start",
    });
  }, [refs, currentSlide]);

  const scrollToSlide = (i: number) => {
    setCurrentSlide(i);
  };

  const next = () => {
    if (currentSlide >= numSlides - 1) {
      scrollToSlide(0);
    } else {
      scrollToSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if (currentSlide === 0) {
      scrollToSlide(numSlides - 1);
    } else {
      scrollToSlide(currentSlide - 1);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="flex overflow-x-hidden shrink-0 snap-x snap-mandatory">
          {slides.map((item, i) => (
            <div
              key={item.item.title}
              ref={refs[i]}
              className="flex shrink-0 snap-center w-full"
            >
              <a className={styles.newsPreviewSlide} href={item.item.link}>
                <img
                  className={styles.imgPrew}
                  src={item.item.enclosure?.url}
                  alt="news foto"
                />
                <div className={styles.publisherPrew}>
                  <p>{item.feedItem.publisher.name}</p>
                </div>
                <div className={styles.titlePrew}>
                  <p className="text-xl hover:text-aachen-yellow">
                    {item.item.title}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
          <MdChevronLeft
            className="opacity-100  font-thin absolute flex items-center bg-[#404040] bg-opacity-75 rounded-full text-[#e0e0e0] justify-center p-0 m-4 text-center border-1 hover:outline-none hover:no-underline focus:outline-none focus:no-underline cursor-pointer hover:scale-110 hover:text-aachen-yellow ease-in-out duration-300 left-0"
            onClick={prev}
            size={40}
          />
          <MdChevronRight
            className="opacity-100  font-thin absolute flex items-center bg-[#404040] bg-opacity-75 rounded-full text-[#e0e0e0] justify-center p-0 m-4 text-center border-1 hover:outline-none hover:no-underline focus:outline-none focus:no-underline  cursor-pointer hover:scale-110 hover:text-aachen-yellow ease-in-out duration-300 right-0"
            onClick={next}
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPreview;
