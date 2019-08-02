import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { SearchPlaces } from '../../Components';

import { Creators as SearchActions } from '../../Reducer/searchReducer';

export const SearchPage = ({ autocompleteSuccess, searchRequest }) => (
	<div className="search-page">
		<div className="search-page-container">
			<Card centered fluid>
				<Card.Content>
					<Card.Description>
						<div className="search-page-input-container">
							<SearchPlaces
								onSelect={autocompleteSuccess}
								className="search-page-input"
								geolocate
							/>
							<Button basic onClick={searchRequest} className="search-button">
								Search
							</Button>
						</div>
					</Card.Description>
				</Card.Content>
			</Card>
		</div>
	</div>
);

const mapDispatchToProps = dispatch => ({
	searchRequest: () => dispatch(SearchActions.searchRequest()),
	autocompleteSuccess: (lat, lng) =>
		dispatch(SearchActions.autocompleteSuccess(lat, lng))
});

SearchPage.propTypes = {
	autocompleteSuccess: PropTypes.func,
	searchRequest: PropTypes.func,
};

export default connect(
	null,
	mapDispatchToProps
)(SearchPage);
