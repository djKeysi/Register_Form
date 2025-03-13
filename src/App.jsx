import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [loginError, setLoginError] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	// if (password !== passwordConfirm) {
	// 	setLoginError('пароли не совпадают');
	// }

	const onChangePassword = ({ target }) => {
		setPassword(target.value);
		//console.log(password);
		// if (target.value !== '') {
		// 	setLoginError('пароли не совпадают');
		// }
	};

	const onChangePasswordConfirm = ({ target }) => {
		setPasswordConfirm(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(email);
	};

	const OnEquallyPassword = () => {
		if (password !== passwordConfirm) {
			setLoginError('пароли не совпадают');
		} else {
			setLoginError('');
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
						value={email}
					/>
					<label>Пароль:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChangePassword}
					/>
					<label>Подтверждение пароля:</label>
					<input
						type="password"
						name="passwordConfirm"
						value={passwordConfirm}
						onChange={onChangePasswordConfirm}
						onBlur={OnEquallyPassword}
					/>
					{loginError && <div className={styles.loginError}>{loginError}</div>}
					<button
						type="submit"
						disabled={!!loginError}
						className={styles.button}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>

			{/* <div className={styles.login}>
				<h1>login</h1>
				<form></form>
				<div>
					<label>E-mail address</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="mail@address.com"
					/>
				</div>
			</div> */}
		</>
	);
};
