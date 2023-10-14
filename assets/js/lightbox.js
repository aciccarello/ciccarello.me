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
	img.alt = '';

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
 * Name shared between a thumbnail and the lightbox image so the View
 * Transitions API can morph one into the other.
 */
const LIGHTBOX_VT_NAME = 'lightbox-image';

/**
 * Runs a DOM update inside a view transition (when the browser supports
 * it), morphing `fromEl` into `toEl` via a shared view-transition-name.
 * Falls back to applying the update immediately when unsupported. Any
 * pre-existing view-transition-name on the elements is restored afterward
 * so we don't clobber the names used for page-navigation transitions.
 * @param {HTMLElement | null} fromEl
 * @param {HTMLElement | null} toEl
 * @param {() => void} mutate
 */
function withImageTransition(fromEl, toEl, mutate) {
	if (typeof document.startViewTransition !== 'function') {
		mutate();
		return;
	}

	const fromPrev = fromEl?.style.viewTransitionName ?? '';
	const toPrev = toEl?.style.viewTransitionName ?? '';

	if (fromEl) fromEl.style.viewTransitionName = LIGHTBOX_VT_NAME;

	const transition = document.startViewTransition(() => {
		if (fromEl) fromEl.style.viewTransitionName = fromPrev;
		mutate();
		if (toEl) toEl.style.viewTransitionName = LIGHTBOX_VT_NAME;
	});

	transition.finished.finally(() => {
		if (toEl) toEl.style.viewTransitionName = toPrev;
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
		lightbox.img.alt = images[currentIndex].alt || '';

		// Update the caption text based on the associated figcaption
		const figure = images[currentIndex].closest('figure');
		lightbox.caption.textContent =
			figure?.querySelector('figcaption')?.textContent || '';
	}

	// Step through the set. No view transition here: a transition is always
	// document-wide, so the root cross-fade would briefly make the modal
	// backdrop translucent and reveal the page behind it. We only animate
	// opening and closing the lightbox.
	function showImage(index) {
		currentIndex = index;
		updateImage();
	}

	function closeLightbox() {
		// Morph the lightbox image back down into its thumbnail.
		withImageTransition(lightbox.img, images[currentIndex], () => {
			lightbox.dialog.close();
		});
		document.removeEventListener('keydown', handleKeydown);
	}

	function handleKeydown(event) {
		if (event.key === 'ArrowLeft') {
			showImage((currentIndex - 1 + images.length) % images.length);
		} else if (event.key === 'ArrowRight') {
			showImage((currentIndex + 1) % images.length);
		} else if (event.key === 'Escape') {
			closeLightbox();
		}
	}

	lightbox.prevButton.onclick = () =>
		showImage((currentIndex - 1 + images.length) % images.length);

	lightbox.nextButton.onclick = () =>
		showImage((currentIndex + 1) % images.length);

	lightbox.closeButton.onclick = closeLightbox;

	// Expand the clicked thumbnail into the lightbox.
	withImageTransition(images[startIndex], lightbox.img, () => {
		lightbox.dialog.showModal();
		updateImage();
	});
	document.addEventListener('keydown', handleKeydown);
}
