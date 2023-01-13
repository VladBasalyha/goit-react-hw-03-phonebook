import css from '../Phonebook/ContactsList.module.css';

export const Contact = ({ name, id, number, onDeleteContact }) => {
	return (
		<li className={css.contact} key={id}>
			{name}: {number}
			<button onClick={onDeleteContact}>Delete</button>
		</li>
	);
};
