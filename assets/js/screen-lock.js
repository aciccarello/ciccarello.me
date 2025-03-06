/**
 * Web component to show a screen lock toggle checkbox.
 * This allows keeping the screen on while looking at recipes.
 *
 * At the moment, this is only intended to be used once on the page.
 */
class ScreenLock extends HTMLElement {
	/** Local storage key (sufficiently unique) */
	static storageKey = 'ciccarello-screen-lock-enabled';

	constructor() {
		super();
		this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
		this.toggleWakeLock = this.toggleWakeLock.bind(this);

		try {
			this.innerHTML = this.render();
			this.checkbox = document.getElementById('screenLockToggle');
			this.statusElem = document.getElementById('screenLockStatus');
			if (this.wakeLockSupported()) {
				if (this.wakeLockEnabled()) {
					this.requestLock();
				}
				this.checkbox.addEventListener('change', this.toggleWakeLock);
				document.addEventListener(
					'visibilitychange',
					this.handleVisibilityChange,
				);
			}
		} catch (err) {
			this.setErrorStatus(err);
		}
	}

	/**
	 * Runs when the element is removed from the DOM
	 */
	disconnectedCallback() {
		document.removeEventListener(
			'visibilitychange',
			this.handleVisibilityChange,
		);
	}

	render() {
		if (this.wakeLockSupported()) {
			const checked = this.wakeLockEnabled() ? 'checked' : '';
			return `<label>
				<input id="screenLockToggle" type="checkbox" ${checked} />
				Keep screen awake
			</label><span id="screenLockStatus"></span>`;
		}

		return `<span id="screenLockStatus"></span>`;
	}

	async handleVisibilityChange() {
		try {
			if (
				this.wakeLock !== null &&
				document.visibilityState === 'visible'
			) {
				this.requestLock();
			}
		} catch (err) {
			this.setErrorStatus(err);
		}
	}

	async requestLock() {
		try {
			this.wakeLock = await navigator.wakeLock.request('screen');
		} catch (err) {
			this.setErrorStatus(err);
		}
	}

	async releaseLock() {
		try {
			await this.wakeLock.release();
			this.wakeLock = null;
		} catch (err) {
			this.setErrorStatus(err);
		}
	}

	wakeLockSupported() {
		return 'wakeLock' in navigator && 'request' in navigator.wakeLock;
	}

	wakeLockEnabled() {
		return localStorage.getItem(ScreenLock.storageKey);
	}

	/**
	 *
	 * @param {Event} event Change event
	 */
	toggleWakeLock(event) {
		this.setStatusText('');
		if (event.target.checked) {
			localStorage.setItem(ScreenLock.storageKey, 'true');
			this.requestLock();
		} else {
			localStorage.removeItem(ScreenLock.storageKey);
			this.releaseLock();
		}
	}

	setStatusText(text) {
		this.statusElem.textContent = text;
	}

	setErrorStatus(err) {
		console.error('Problem in screen-lock', err);
		this.setStatusText(`${err.name}, ${err.message}`);
	}
}

if ('customElements' in window) {
	customElements.define('screen-lock', ScreenLock);
}
