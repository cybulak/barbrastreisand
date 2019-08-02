import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

import { Map } from '../../Components';

export const ListPage = ({ searchResults }) => (
	<div className="list-page">
		<div className="list-page-left-panel">
			{searchResults.length && (
				<Card.Group>
					{searchResults.map(place => (
						<Card key={place.id} fluid header={place.name} />
					))}
				</Card.Group>
			)}
		</div>
		<div className="list-page-right-panel">
			<Map />
		</div>
	</div>
);

const mapStateToProps = ({ searchReducer: { searchResults } }) => ({
	searchResults
});

ListPage.propTypes = {
	searchResults: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	)
};

export default connect(mapStateToProps)(ListPage);
