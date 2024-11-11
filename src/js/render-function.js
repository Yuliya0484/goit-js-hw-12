export function renderGallery(images) {
  const galleryEl = document.querySelector('.gallery');
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
      }) => `
    <a class="gallery__item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" width="360px" height="200px" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `
    )
    .join('');
  galleryEl.innerHTML = markup;
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
