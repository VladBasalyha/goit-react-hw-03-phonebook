import PropTypes from 'prop-types';

export const FilterContacts = ({ filterContacts, value }) => {
	return (
		<label>
			Find contacts by name
			<input onChange={filterContacts} type="text" name="filter" value={value} />
			<br />
		</label>
	);
};
FilterContacts.propTypes = {
	filterContacts: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};
