import css from '../Phonebook/ContactsList.module.css';
import PropTypes from 'prop-types';
import { Contact } from './Contact';
export const ContactsList = ({ contacts, onDeleteContact }) => {
	return (
		<ul className={css.contactsList}>
			{contacts.map(({ name, id, number }) => {
				return (
					<Contact
						key={id}
						name={name}
						number={number}
						onDeleteContact={() => onDeleteContact(id)}
					></Contact>
				);
			})}
		</ul>
	);
};
ContactsList.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired,
};
