import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Form/Form.module.css';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

export class ContactForm extends Component {
	state = {
		name: '',
		number: '',
	};
	formReset = () => {
		this.setState({ name: '', number: '' });
	};

	onHandleChange = e => {
		const { name, value } = e.currentTarget;
		this.setState({ [name]: value });
	};
	onHandleSubmit = e => {
		const { name } = this.state;
		e.preventDefault();

		this.props.onSubmit(this.state);
		const { contacts } = this.props;
		if (
			contacts.find(
				contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
			)
		) {
			return toast.error(`Contact "${name}" already exists!`, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2500,
				theme: 'light',
				pauseOnHover: false,
			});
		} else {
			toast.success(`Contact "${name}" was added to your phonebook`, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2500,
				theme: 'light',
				pauseOnHover: false,
			});
		}
		this.formReset();
	};
	render() {
		const NAMEID = nanoid();
		const NUMBERID = nanoid();
		const { name, number } = this.state;

		return (
			<form className={css.form} onSubmit={this.onHandleSubmit}>
				<label htmlFor={NAMEID}>
					Name
					<input
						className={css.name}
						value={name}
						onChange={this.onHandleChange}
						id={NAMEID}
						type="text"
						name="name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
					/>
					<br />
				</label>
				<label htmlFor={NUMBERID}>
					Number
					<input
						className={css.input}
						value={number}
						id={NUMBERID}
						onChange={this.onHandleChange}
						type="tel"
						name="number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
				</label>
				<br />
				<button type="submit">Add contact</button>
			</form>
		);
	}
}
ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	contact: PropTypes.array.isRequired,
};
