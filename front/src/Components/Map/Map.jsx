import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withGoogleMap(props => (
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
		{props.isMarkerShown && (
			<Marker position={{ lat: -34.397, lng: 150.644 }} />
		)}
	</GoogleMap>
));

const Map = () => (
	<MyMapComponent
		isMarkerShown
		containerElement={<div style={{ height: '100%', width: '100%' }} />}
		mapElement={<div style={{ height: '100%' }} />}
	/>
);

export default Map;
