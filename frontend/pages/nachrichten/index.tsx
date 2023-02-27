import WeatherCard from "../../components/WeatherCard";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Nachrichten.module.css";
import { FEEDS, getFeed } from "../../lib/rss";
import { GetServerSideProps } from "next";
import { IDataNachrichten } from "../../types";
import NewsCard from "../../components/NewsCard";
import NewsPreview from "../../components/NewsPreview";

function NewsPage({ data }: { data: IDataNachrichten[] }) {
  return (
    <div>
      <Head>
        <title>Aachen nachrichten</title>
        <meta
          name="Aachen nachrichten heute"
          content="Aktuelle Aachen nachrichten und informationen"
        />
      </Head>
      <div className={styles.mainPage}>
        <h1 className="my-[2%] font-medium text-2xl tracking-[0.8px]">
          Nachrichten
        </h1>
        <div className={styles.Container}>
          <div className={styles.newsPreview}>
            <NewsPreview data={data} />
          </div>
          <div className="hidden md:block mt-0 lg:h-full lg:bg-aachen-back lg:rounded-xl">
            <WeatherCard />
          </div>
          <div className={styles.feedList}>
            {FEEDS.map((feed) => (
              <Link
                key={feed.publisher.id}
                href={`/nachrichten/${feed.publisher.id}`}
              >
                <div className={styles.logoContainer}>
                  <img
                    className={styles.publisherLogo}
                    src={feed.publisher.profilePictureUrl}
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.newsList}>
            {data
              .sort(
                (objA, objB) =>
                  +new Date(objB.item.pubDate) - +new Date(objA.item.pubDate)
              )
              .slice(0, 20)
              .map((item) => (
                <NewsCard key={item.feedItem.link} feed={item.feedItem} item={item.item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data: IDataNachrichten[] = [];

  await Promise.all(
    FEEDS.map(async (feedItem) => {
      const { items } = await getFeed(feedItem.link);
      items.forEach((item) => data.push({ item, feedItem }));
    })
  );

  return {
    props: {
      data,
    },
  };
};
