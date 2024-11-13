import axios from 'axios';
const API_KEY = '47000249-41843abe91023242d8e7e2eb0';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

// export async function fetchImages(query, page = 1, perPage = 200) {
//   const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
//     query
//   )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Error fetching images');
//   }

//   const data = await response.json();
//   return data.hits;
// }
// pixabay-api.js
