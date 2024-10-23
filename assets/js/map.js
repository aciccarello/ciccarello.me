import {
	Map as LeafletMap,
	TileLayer,
	Icon,
	Marker,
	Polyline,
} from '/assets/js/leaflet/leaflet-src.esm.js';

(function loadMaps() {
	const map = new LeafletMap('dynamicMap');
	new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	/*
	const ICON_SIZE = 32;
	const DefaultIcon = Icon.extend({
		options: {
			iconUrl: '/assets/img/map-icons/blank.png',
			iconSize: [ICON_SIZE, ICON_SIZE],
			iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
			popupAnchor: [ICON_SIZE / 2, -10],
			tooltipAnchor: [ICON_SIZE / 2, -10],
		},
	});
	const iconMap = new Map([
		[
			'default',
			new DefaultIcon({
				iconUrl: '/assets/img/map-icons/blank.png',
			}),
		],
	]);
	function getOrSetIcon(iconName) {
		if (!iconMap.has(iconName)) {
			iconMap.set(
				iconName,
				new DefaultIcon({
					iconUrl: `/assets/img/map-icons/${iconName}.png`,
				}),
			);
		}
		return iconMap.get(iconName || 'default');
	}
	*/

	const waypoints = globalThis.ciccarelloMapPoints;
	const markers = waypoints.map(({ location, icon, ...attributes }) =>
		new Marker(location, {
			riseOnHover: true,
			// icon: getOrSetIcon(icon),
			...attributes,
		})
			.addTo(map)
			.bindTooltip(attributes.title),
	);
	// Show a line between dated elements
	const line = new Polyline(
		waypoints
			.filter(({ date }) => Boolean(date))
			.map(({ location }) => location),
		{ color: 'var(--color-accent)' },
	).addTo(map);
	// Zoom to key points. Disable with zoom: ignore
	map.fitBounds(
		waypoints
			.filter(({ zoom }) => zoom !== 'ignore')
			.map(({ location }) => location),
		{ padding: [1, 1] },
	);
	if (waypoints.length == 1) {
		// Want to zoom out a little if only one point for context
		map.setZoom(12);
	}

	// Add event listener to location list if available
	document
		.getElementById('trip-location-list')
		?.addEventListener('click', (e) => {
			const markerIndex = e.target.getAttribute('data-map-link');
			if (markerIndex) {
				const clickedMarker = markers[Number(markerIndex)];
				clickedMarker.openTooltip();
				map.flyTo(clickedMarker.getLatLng());
				/** @type {HTMLElement} */
				const markerElement = clickedMarker.getPane();
				markerElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			}
		});
})();
