// Creates a popup to show images

/**
 * @typedef {Object} Lightbox
 * @property {HTMLDialogElement} dialog
 * @property {HTMLImageElement} img
 * @property {HTMLParagraphElement} caption
 * @property {HTMLButtonElement} prevButton
 * @property {HTMLButtonElement} nextButton
 * @property {HTMLButtonElement} closeButton
 */

/**
 * Initializes the elements for the lightbox
 * @returns {Lightbox}
 */
export function createLightbox() {
	// Dynamically load the CSS file
	const cssLink = document.createElement('link');
	cssLink.rel = 'stylesheet';
	cssLink.href = '/assets/css/lightbox.css';
	document.head.appendChild(cssLink);

	const dialog = document.createElement('dialog');
	dialog.className = 'lightbox-dialog';

	const wrapper = document.createElement('div');
	wrapper.className = 'lightbox-wrapper';

	const img = document.createElement('img');
	img.className = 'lightbox-img';

	const caption = document.createElement('p');
	caption.className = 'lightbox-caption';

	const prevButton = document.createElement('button');
	prevButton.className = 'lightbox-prev-button';
	prevButton.textContent = '❮';

	const nextButton = document.createElement('button');
	nextButton.className = 'lightbox-next-button';
	nextButton.textContent = '❯';

	const closeButton = document.createElement('button');
	closeButton.className = 'lightbox-close-button';
	closeButton.textContent = '✕';

	wrapper.appendChild(img);
	wrapper.appendChild(caption);
	wrapper.appendChild(prevButton);
	wrapper.appendChild(nextButton);
	wrapper.appendChild(closeButton);
	dialog.appendChild(wrapper);

	document.body.appendChild(dialog);

	return { dialog, img, caption, prevButton, nextButton, closeButton };
}

/**
 * Registers the event listeners of the images to open the lightbox
 * @param {Lightbox} lightbox
 * @param {HTMLImageElement[]} images
 */
export function addEventListeners(lightbox, images) {
	images.forEach((img, index) => {
		img.addEventListener('click', () => {
			openLightbox(lightbox, images, index);
		});
	});
}

/**
 * Opens the lightbox with the selected image
 * @param {Lightbox} lightbox
 * @param {HTMLImageElement[]} images
 * @param {number} startIndex
 */
export function openLightbox(lightbox, images, startIndex) {
	let currentIndex = startIndex;

	function updateImage() {
		lightbox.img.src = images[currentIndex].src;

		// Update the caption text based on the associated figcaption
		const figure = images[currentIndex].closest('figure');
		lightbox.caption.textContent =
			figure?.querySelector('figcaption')?.textContent || '';
	}

	function closeLightbox() {
		lightbox.dialog.close();
		document.removeEventListener('keydown', handleKeydown);
	}

	function handleKeydown(event) {
		if (event.key === 'ArrowLeft') {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
			updateImage();
		} else if (event.key === 'ArrowRight') {
			currentIndex = (currentIndex + 1) % images.length;
			updateImage();
		} else if (event.key === 'Escape') {
			closeLightbox();
		}
	}

	lightbox.prevButton.onclick = () => {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		updateImage();
	};

	lightbox.nextButton.onclick = () => {
		currentIndex = (currentIndex + 1) % images.length;
		updateImage();
	};

	lightbox.closeButton.onclick = closeLightbox;

	lightbox.dialog.showModal();
	updateImage();
	document.addEventListener('keydown', handleKeydown);
}
