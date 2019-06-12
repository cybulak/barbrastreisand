import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';

export default class SearchPlaces extends Component {
	constructor() {
		super();

		this.state = {
			search: '',
			list: null
		};

		this.service = new google.maps.places.AutocompleteService(); //eslint-disable-line no-undef
		this.geocoder = new google.maps.Geocoder(); //eslint-disable-line no-undef
	}

	componentDidMount() {
		if (this.props.geolocate) {
			this.geolocateMe();
		}
	}

	formatGoogleAddress(address) {
		const { address_components } = address;
		const route = address_components.find(p => p.types.includes('route'));
		const streetNumber = address_components.find(p =>
			p.types.includes('street_number')
		);
		const locality = address_components.find(p => p.types.includes('locality'));
		return `${route && route.long_name} ${streetNumber &&
			streetNumber.long_name}, ${locality && locality.long_name}`;
	}

	geolocateMe() {
		const geolocation = navigator.geolocation;

		if (!geolocation) {
			throw new Error('Geolocation not supported');
		}

		geolocation.getCurrentPosition(location => {
			const {
				coords: { latitude, longitude }
			} = location;

			this.geocoder.geocode(
				{
					location: { lat: latitude, lng: longitude }
				},
				(results, status) => {
					if (status === 'OK') {
						const search = this.formatGoogleAddress(results[0]);
						this.setState({ search });
						this.props.onSelect(latitude, longitude);
					} else {
						throw new Error(status);
					}
				}
			);
		});
	}

	onChange = e => {
		this.setState({ search: e.target.value }, () => {
			const { search } = this.state;
			const { types, minCharacters } = this.props;
			if (search && search.length >= minCharacters) {
				this.service.getPlacePredictions(
					{ input: search, types },
					(predictions, status) => {
						if (status === 'OK' && predictions && predictions.length > 0) {
							this.setState({ list: this.mapPredictions(predictions) });
						} else {
							console.log('google maps predictions error', status);
							this.setState({ list: null });
						}
					}
				);
			} else {
				this.setState({ list: null });
			}
		});
	};

	mapPredictions = predictions =>
		predictions.map(item => ({ title: item.description, key: item.id }));

	onSelect = (e, data) => {
		this.setState({ search: data.result.title });
		if (this.props.onSelect) {
			this.geocoder.geocode(
				{ address: data.result.title },
				(results, status) => {
					if (status === 'OK') {
						const { lat, lng } = results[0].geometry.location;
						this.props.onSelect(lat(), lng());
					} else {
						console.log('geocoder error', status);
					}
				}
			);
		}
	};

	render() {
		const { search, list } = this.state;
		const { minCharacters, className } = this.props;
		return (
			<Search
				ref="search"
				value={search}
				onSearchChange={this.onChange}
				results={list}
				minCharacters={minCharacters}
				onResultSelect={this.onSelect}
				className={className}
				fluid
				icon={null}
			/>
		);
	}
}

SearchPlaces.propTypes = {
	types: PropTypes.array,
	fields: PropTypes.array,
	onSelect: PropTypes.func.isRequired,
	minCharacters: PropTypes.number,
	className: PropTypes.string,
	geolocate: PropTypes.bool
};

SearchPlaces.defaultProps = {
	types: ['address'],
	fields: [
		'address_components',
		'geometry.location',
		'place_id',
		'formatted_address'
	],
	minCharacters: 3,
	className: '',
	geolocate: false
};
