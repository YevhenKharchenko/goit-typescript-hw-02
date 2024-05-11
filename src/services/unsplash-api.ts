import { IImage } from '../types';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

interface Response {
  total_pages: number;
  results: IImage[];
}

export const requestImages = async (
  value: string,
  page: number
): Promise<Response> => {
  const response = await axios.get<Response>(
    `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${page}&per_page=12&orientation=landscape&query=${value}`
  );

  return response.data;
};
