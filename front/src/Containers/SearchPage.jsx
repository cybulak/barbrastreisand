import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon, Input } from 'semantic-ui-react';
import { ReactCustomGoogleAutocomplete } from 'react-google-autocomplete';
import { SearchPlaces } from '../Components';

import { Creators as SearchActions } from '../Reducer/searchReducer';

export class SearchPage extends Component {
	handlePlaceSelect = place => {
		const { lat, lng } = place.geometry.location;
		this.props.autocompleteSuccess(lat(), lng());
	};

	handleSearch = () => this.props.searchRequest();

	render() {
		return (
			<div className="search-page">
				<div className="search-page-container">
					<Card centered fluid>
						<Card.Content>
							<Card.Description>
								<div className="search-page-input-container">
									<SearchPlaces
										onSelect={this.handlePlaceSelect}
										className="search-page-input"
									/>
									<Button
										basic
										className="geocode-button"
										onClick={this.props.geocode}
									>
										<Icon name="compass outline" />
									</Button>
									<Button
										basic
										onClick={this.handleSearch}
										className="search-button"
									>
										Search
									</Button>
								</div>
							</Card.Description>
						</Card.Content>
					</Card>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { geocoding, lat, lng } = state.searchReducer;
	return {
		geocoding,
		lat,
		lng
	};
};

const mapDispatchToProps = dispatch => ({
	searchRequest: () => dispatch(SearchActions.searchRequest()),
	autocompleteSuccess: (lat, lng) =>
		dispatch(SearchActions.autocompleteSuccess(lat, lng)),
	geocode: () => dispatch(SearchActions.geocode())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchPage);
