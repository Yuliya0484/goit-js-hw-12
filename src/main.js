import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loadMoreButton = document.querySelector('.load-more-btn');
const loader = document.querySelector('#loader');

let currentQuery = '';
let page = 1;

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}

async function onSearch(event) {
  event.preventDefault();
  currentQuery = input.value.trim();

  if (currentQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  hideLoadMoreButton();
  page = 1;
  await fetchAndRenderImages();
}
async function onLoadMore() {
  page += 1;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  try {
    showLoader();
    const data = await fetchImages(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    renderGallery(data.hits);

    if (page >= Math.ceil(data.totalHits / 15)) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
