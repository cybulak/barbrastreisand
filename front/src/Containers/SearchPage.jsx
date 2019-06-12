import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { SearchPlaces } from '../Components';

import { Creators as SearchActions } from '../Reducer/searchReducer';

export class SearchPage extends Component {
	handlePlaceSelect = (lat, lng) => this.props.autocompleteSuccess(lat, lng);

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
										geolocate
									/>
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
	const { lat, lng } = state.searchReducer;
	return {
		lat,
		lng
	};
};

const mapDispatchToProps = dispatch => ({
	searchRequest: () => dispatch(SearchActions.searchRequest()),
	autocompleteSuccess: (lat, lng) =>
		dispatch(SearchActions.autocompleteSuccess(lat, lng))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchPage);
