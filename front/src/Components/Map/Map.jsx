import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withGoogleMap(props => (
	<GoogleMap
		defaultZoom={12}
		defaultCenter={{ lat: props.lat, lng: props.lng }}
	>
		{props.searchResults.length &&
			props.searchResults.map(({ lat, lng, id }) => (
				<Marker position={{ lat, lng }} key={id} />
			))}
	</GoogleMap>
));

const Map = props => (
	<MyMapComponent
		isMarkerShown
		containerElement={<div style={{ height: '100%', width: '100%' }} />}
		mapElement={<div style={{ height: '100%' }} />}
		{...props}
	/>
);

const mapStateToProps = ({ searchReducer: { searchResults, lat, lng } }) => ({
	searchResults,
	lat,
	lng
});

Map.propTypes = {
	searchResults: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	)
};

export default connect(mapStateToProps)(Map);
