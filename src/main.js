// main.js
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');

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
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
      });
      return;
    }

    renderGallery(data.hits);
    if (data.totalHits > perPage) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    console.error(error);
    iziToast.warning({
      title: 'Warning',
      message: 'Something went wrong. Please try again later.',
    });
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
      iziToast.warning({
        title: 'Success',
        message: "We're sorry, but you've, reached the end of search results.",
        position: 'topRight',
        titleColor: '#808080',
        messageColor: '#000000',
      });
    }
    scrollPage();
  } catch (error) {
    console.error(error);
    iziToast.warning({
      message: 'Something went wrong. Please try again later.',
    });
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
