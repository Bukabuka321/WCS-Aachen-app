import React from "react";
import styles from "../../styles/Nachrichten.module.css";
import { FEEDS, getFeed } from "../../lib/rss";
import { GetServerSideProps } from "next";
import NewsCard from "../../components/NewsCard";
import { FeedIdProps } from "../../types";

export default function FeedId({ feed, items }: FeedIdProps) {
  console.log(feed, items);
  return (
    <div className={styles.mainPage}>
      <h1 className={styles.publisherName}>{feed.publisher.name}</h1>
      <div>
        {items.slice(0, 10).map((item) => (
          <NewsCard feed={feed} item={item} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = FEEDS.find((feed) => feed.publisher.id === params?.fid);
  if (feed == null) return { notFound: true };
  const detailedFeed = await getFeed(feed.link);
  console.log(feed);

  return {
    props: {
      feed,
      items: detailedFeed.items,
    },
  };
};
