import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
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
        `<a class='gallery_item' href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width='360px' height='200px' loading="lazy" />
        <div class='info'>
        <p><b>Likes:</b>${likes}</p>
        <p><b>Views:</b>${views}</p>
        <p><b>Comments:</b>${comments}</p>
        <p><b>DownLoads:</b>${downloads}</p>
        </div>
      </a>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
