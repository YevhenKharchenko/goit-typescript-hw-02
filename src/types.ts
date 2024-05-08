export interface IImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
  likes: number;
  user: {
    name: string;
  };
}
