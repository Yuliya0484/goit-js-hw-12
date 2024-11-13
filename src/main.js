// main.js
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value.trim();

  if (!query) return;

  page = 1;
  clearGallery();
  loadMoreBtn.hidden = true;

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      alert('No images found. Please try again.');
      return;
    }

    renderGallery(data.hits);
    if (data.totalHits > perPage) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }

    scrollPage();
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery a')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// import { fetchImages } from './js/pixabay-api';
// import { renderGallery, clearGallery } from './js/render-function';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const formEl = document.querySelector('#search-form');
// const loaderEl = document.querySelector('.loader');
// let lightbox;

// formEl.addEventListener('submit', async event => {
//   event.preventDefault();

//   const query = event.target.elements.searchQuery.value.trim();
//   if (!query) {
//     iziToast.warning({
//       title: 'Warning',
//       message: 'Please enter a search query.',
//     });
//     return;
//   }

//   clearGallery();
//   loaderEl.style.display = 'block';

//   try {
//     const images = await fetchImages(query);

//     loaderEl.style.display = 'none';
//     if (images.length === 0) {
//       iziToast.info({
//         title: 'Info',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//     } else {
//       renderGallery(images);

//       // Ініціалізуємо або оновлюємо SimpleLightbox
//       if (lightbox) {
//         lightbox.refresh();
//       } else {
//         lightbox = new SimpleLightbox('.gallery a');
//       }
//     }
//   } catch (error) {
//     loaderEl.style.display = 'none';
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later.',
//     });
//   }
// });
