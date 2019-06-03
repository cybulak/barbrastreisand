import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, Input } from 'semantic-ui-react';

export class SearchPlaces extends Component {
	constructor() {
		super();

		this.state = {
			search: '',
			list: null
		};

		this.service = new google.maps.places.AutocompleteService(); //eslint-disable-line no-undef
		this.geocoder = new google.maps.Geocoder(); //eslint-disable-line no-undef
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
						this.props.onSelect(results[0]);
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
	className: PropTypes.string
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
	className: ''
};
