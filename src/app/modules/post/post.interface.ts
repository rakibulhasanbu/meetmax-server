interface TPost {
  postBy: {
    userId: number;
    name: string;
    image: string;
  };
  slug?: string;
  description: string;
  images: { url: string }[];
  isPublish?: boolean;
  liked?: number;
  comments?: any;
  visibleBy?: "Friends" | "Public";
}
