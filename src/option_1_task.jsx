import { useRef, useState } from 'react';
import styles from './app.module.css';

const nameForm = {
	email: '',
	password: '',
	passwordConfirm: '',
};

export const App = () => {
	const [formData, setFormData] = useState(nameForm);
	const [loginError, setLoginError] = useState(null);
	const submitButtonRef = useRef(null);

	const OnChange = ({ target }) => {
		let error = null;
		if (target.name === 'email') {
			setFormData({
				...formData,
				email: target.value,
			});
		} else if (target.name === 'password') {
			setFormData({
				...formData,
				password: target.value,
			});
		} else if (target.name === 'passwordConfirm') {
			setFormData({
				...formData,
				passwordConfirm: target.value,
			});
		}
		if (target.name !== 'email') {
			if (
				!/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!#$%&?].*).{8,}/.test(
					target.value,
				)
			) {
				error =
					'Подсказка:Пароль должен состоять из маленьких и больших анлийских букв, цифр,спецсимволов и не менее чем из 8 символов и не должен быть пустым';
			}
		}
		setLoginError(error);
	};

	const OnEquallyPassword = () => {
		if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formData.email)) {
			setLoginError('Вводите почту правильно');
		} else if (
			formData.password !== formData.passwordConfirm &&
			formData.passwordConfirm !== ''
		) {
			setLoginError('Пароли не совпадают');
		}

		if (
			loginError === null &&
			formData.password !== '' &&
			formData.email !== '' &&
			formData.passwordConfirm !== ''
		) {
			submitButtonRef.current.focus();
		}
	};
	const onSubmit = (event) => {
		event.preventDefault();

		if (
			formData.email !== '' &&
			formData.password !== '' &&
			formData.passwordConfirm !== ''
		) {
			console.log(formData);
		} else {
			setLoginError('Заполните все поля');
		}
	};

	return (
		<>
			<div className={styles.login}>
				<h1>1. Register New User</h1>
				<form onSubmit={onSubmit}>
					<label>Почта:</label>
					<input
						type="email"
						name="email"
						placeholder="mail@address.com"
						value={formData.email}
						// onChange={({ target }) => {
						// 	setFormData({
						// 		...formData,
						// 		email: target.value,
						// 	});
						// }}
						onChange={OnChange}
						onBlur={OnEquallyPassword}
					/>
					<label>Пароль:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						// onChange={({ target }) => {
						// 	setFormData({
						// 		...formData,
						// 		password: target.value,
						// 	});
						// }}
						onChange={OnChange}
						onBlur={OnEquallyPassword}
					/>
					<label>Подтверждение пароля:</label>
					<input
						type="password"
						name="passwordConfirm"
						value={formData.passwordConfirm}
						// onChange={({ target }) => {
						// 	setFormData({
						// 		...formData,
						// 		passwordConfirm: target.value,
						// 	});
						// }}
						onChange={OnChange}
						onBlur={OnEquallyPassword}
					/>
					{loginError && <div className={styles.loginError}>{loginError}</div>}
					<button
						type="submit"
						ref={submitButtonRef}
						disabled={loginError !== null}
						className={
							loginError !== null
								? styles.button + ' ' + styles.buttonRed
								: styles.button
						}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
