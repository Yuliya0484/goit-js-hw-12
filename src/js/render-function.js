import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
        <div class="gallery-list">
        <a class="gallery-item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width='360px' height='200px' loading="lazy" />
        </a>
        <div class="info">
          <p>Likes:<br /> ${likes}</p>
          <p>Views:<br /> ${views}</p>
          <p>Comments:<br /> ${comments}</p>
          <p>Downloads:<br /> ${downloads}</p>
          </div>
        </div>
        `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
