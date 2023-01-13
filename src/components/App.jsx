import { Component } from 'react';
import { ContactsList } from './Phonebook/ContactsList';
import { FilterContacts } from './Phonebook/FilterContacts';
import { ContactForm } from './Phonebook/ContactForm';
import { nanoid } from 'nanoid';
import css from './Phonebook/Form/Form.module.css';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],

		filter: '',
	};
	// filtering our contacts on input
	changeFilter = e => {
		this.setState({ filter: e.currentTarget.value });
	};
	deleteContact = contactId => {
		this.setState(prevstate => ({
			contacts: prevstate.contacts.filter(contact => contact.id !== contactId),
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
			name.toLowerCase().includes(this.state.filter.toLowerCase())
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
