import { Component } from 'react';
import { ContactsList } from './Phonebook/ContactsList';
import { FilterContacts } from './Phonebook/FilterContacts';
import { ContactForm } from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import css from './Phonebook/Form/Form.module.css';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
	static defaultProps = {
		CONTACTS_KEY: 'CONTACTS',
	};
	constructor(props) {
		super(props);
		this.state = {
			contacts: [],

			filter: '',
		};
	}

	componentDidMount() {
		const contactsFromLocaleStorage = localStorage.getItem(this.props.CONTACTS_KEY);
		const parsedContacts = JSON.parse(contactsFromLocaleStorage);
		if (parsedContacts) {
			this.setState({ contacts: parsedContacts });
		}
	}
	componentDidUpdate(prevstate, prevprops) {
		const { contacts } = this.state;
		if (prevstate !== contacts) {
			localStorage.setItem(this.props.CONTACTS_KEY, JSON.stringify(contacts));
		}
	}

	// filtering our contacts on input
	changeFilter = e => {
		this.setState({ filter: e.currentTarget.value });
	};
	deleteContact = contactId => {
		this.setState(({ contacts }) => ({
			contacts: contacts.filter(contact => contact.id !== contactId),
		}));
	};

	formSubmitHandler = newContact => {
		const contacts = this.state.contacts;
		contacts.find(
			contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
		) ??
			this.setState(prevstate => ({
				contacts: [
					...prevstate.contacts,
					{
						name: newContact.name,
						id: nanoid(),
						number: newContact.number,
					},
				],
			}));
	};

	render() {
		const { contacts, filter } = this.state;
		const visibleTodos = contacts.filter(({ name }) =>
			name.toLowerCase().includes(filter.toLowerCase())
		);
		return (
			<>
				<div className={css.phonebook}>
					<div className={css.form}>
						<h1>Phonebook</h1>
						<ContactForm
							contacts={contacts}
							onSubmit={this.formSubmitHandler}
						></ContactForm>
					</div>
					<h2>Contacts</h2>
					<FilterContacts
						filterContacts={this.changeFilter}
						value={filter}
					></FilterContacts>
					<ContactsList
						contacts={visibleTodos}
						onDeleteContact={this.deleteContact}
					></ContactsList>
					<ToastContainer />
				</div>
			</>
		);
	}
}
