export declare interface IFeed {
    link: string;
    publisher: {
        name: string;
        subtitle: string;
        description: string;
        id: string;
        profilePictureUrl: string;
        redirect: boolean;
    };
  };                            
    
  export declare interface INewsItem {
    link: string;
    title: string;
    contentSnippet: string;
    pubDate: Date;
    enclosure?: {url?: string;}
  };
    
  export declare interface FeedIdProps {
    feed: IFeed;
    items: INewsItem[];
  };

  export declare interface IDataNachrichten {
    feedItem: IFeed ;
    item: INewsItem | any;
  }