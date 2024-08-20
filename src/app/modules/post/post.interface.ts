interface TPost {
  name: string;
  slug?: string;
  description: string;
  images: {url:string}[];
  isPublish?: boolean;
  liked?: number;
  comments?: any;
  visibleBy?: "Friends"|"Public";
}
