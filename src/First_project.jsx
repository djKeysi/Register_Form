import { useRef, useState } from 'react';
import styles from './app.module.css';

const initialState = {
	email: '',
	password: '',
	passwordConfirm: '',
	loginError: null,
};
const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
const buttonFocus = (email, password, passwordConfirm, loginError, submitButtonRef) => {
	if (
		loginError === null &&
		email !== '' &&
		password !== '' &&
		passwordConfirm !== ''
	) {
		submitButtonRef.current.focus();
	}
};

export const App = () => {
	const { getState, updateState } = useStore();
	const submitButtonRef = useRef(null);

	let { email, password, passwordConfirm, loginError } = getState();
	const sendData = (formData) => {
		if (email !== '' && password !== '' && passwordConfirm !== '') {
			console.log(formData);
		} else {
			loginError = 'Поля не должны быть пустыми';
			updateState('loginError', loginError);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
		//buttonFocus(email, password, passwordConfirm, loginError, submitButtonRef);
	};

	const onBlur = ({ target }) => {
		if (target.name === 'email') {
			if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(target.value)) {
				loginError = 'Неверный формат почты';
			} else {
				loginError = null;
			}
		} else if (target.name === 'password' || target.name === 'passwordConfirm') {
			if (
				!/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!#$%&?].*).{8,}/.test(
					target.value,
				) &&
				target.value !== ''
			) {
				loginError =
					'Пароль должен содержать минимум 8 символов и содержать как минимум одну цифру, одну букву верхнего регистра и одну строчную букву.';
			} else if (password !== passwordConfirm && passwordConfirm !== '') {
				loginError = 'Пароли не совпадают';
			} else {
				loginError = null;
			}
		}
		updateState('loginError', loginError);

		buttonFocus(email, password, passwordConfirm, loginError, submitButtonRef);
	};

	return (
		<div className={styles.login}>
			<form onSubmit={onSubmit}>
				<label>Почта:</label>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<label>Пароль:</label>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<label>Подтвердите пароль:</label>
				<input
					type="password"
					name="passwordConfirm"
					value={passwordConfirm}
					placeholder="Пароль"
					onChange={onChange}
					onBlur={onBlur}
				/>
				{loginError && <div className={styles.loginError}>{loginError}</div>}
				<button
					ref={submitButtonRef}
					disabled={loginError !== null}
					type="submit"
					className={
						loginError !== null
							? styles.button + ' ' + styles.buttonRed
							: styles.button
					}
				>
					Зарегистрироватся
				</button>
			</form>
		</div>
	);
};
