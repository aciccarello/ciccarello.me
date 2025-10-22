document.addEventListener('DOMContentLoaded', () => {
	const windowElement = document.querySelector('.window');
	const windowContents = document.querySelector('.window-contents');
	const closeButton = document.querySelector('[aria-label="Close"]');
	const minimizeButton = document.querySelector('[aria-label="Minimize"]');
	const maximizeButton = document.querySelector('[aria-label="Maximize"]');
	const restoreButton = document.querySelector('[aria-label="Restore"]');
	const zoomInButton = document.querySelector('.zoom-in button');
	const zoomOutButton = document.querySelector('.zoom-out button');
	const zoomResetButton = document.querySelector('.zoom-reset button');
	activateMenuButtons(windowElement);

	// Status bar
	const widthOutput = document.getElementById('width-output');
	widthOutput.textContent = window.innerWidth;

	new ResizeObserver(() => {
		widthOutput.textContent = windowElement.offsetWidth;
	}).observe(windowElement);

	function activateMenuButtons(windowEl) {
		closeButton.addEventListener('click', () => {
			location.href = '/';
		});
		minimizeButton.addEventListener('click', () => {
			windowEl.style.display = 'none';
			// TODO: add a way to restore the window
			// E.g. a desktop icon
		});
		maximizeButton.addEventListener('click', () => {
			windowEl.classList.add('fullscreen');
			windowEl.dataset.prevHeight = windowEl.style.height;
			windowEl.dataset.prevWidth = windowEl.style.width;
			windowEl.style.height = null;
			windowEl.style.width = null;
			updateMaximizeRestoreButtons(windowEl);
		});
		restoreButton.addEventListener('click', () => {
			windowEl.classList.remove('fullscreen');
			windowEl.style.height = windowEl.dataset.prevHeight;
			windowEl.style.width = windowEl.dataset.prevWidth;
			updateMaximizeRestoreButtons(windowEl);
		});
		updateMaximizeRestoreButtons(windowEl);

		function updateZoom(getNewValue) {
			const currentScale = windowContents.style.zoom
				? parseFloat(windowContents.style.zoom)
				: 1;
			windowContents.style.zoom = getNewValue(currentScale);
		}
		zoomInButton.addEventListener('click', () =>
			updateZoom((currentScale) => currentScale + 0.1),
		);
		zoomOutButton.addEventListener('click', () =>
			updateZoom((currentScale) => currentScale - 0.1),
		);
		zoomResetButton.addEventListener('click', () => updateZoom(() => 1));

		// TODO: make header draggable
		// See: https://www.w3schools.com/howto/howto_js_draggable.asp
	}

	function updateMaximizeRestoreButtons(windowEl) {
		if (windowEl.classList.contains('fullscreen')) {
			maximizeButton.style.display = 'none';
			restoreButton.style.display = '';
		} else {
			restoreButton.style.display = 'none';
			maximizeButton.style.display = '';
		}
	}
});
