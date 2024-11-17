import axios, { Axios } from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47000249-41843abe91023242d8e7e2eb0';

const PER_PAGE = 15;
export async function fetchImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
}
