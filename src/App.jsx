import styles from './app.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
//npm i yup
//npm i react-hook-form
//npm install @hookform/resolvers yup

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Неверный логин формат почты')
		.required(),
	password: yup
		.string()
		.matches(
			/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!#$%&?].*).{8,}/,
			'Пароль должен содержать минимум 8 символов и содержать как минимум одну цифру, одну букву верхнего регистра и одну строчную букву.',
		)
		.required(),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Поле не должно быть пустым'),
});

export const App = () => {
	const submitButtonRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// defaultValues: {
		// 	email: '',
		// 	password: '',
		// 	passwordConfirm: '',
		// },
		resolver: yupResolver(fieldsSchema),
	});

	//const loginError = errors.email.password?.message;

	const sendFormData = (formData) => {
		console.log(formData);
	};

	const onBlurPasswordConfirm = () => {
		if (
			!errors.passwordConfirm?.message &&
			!errors.password?.message &&
			!errors.email?.message
		) {
			submitButtonRef.current.focus();
		}
	};

	return (
		<div className={styles.login}>
			<form onSubmit={handleSubmit(sendFormData)}>
				<label>Почта:</label>
				<input
					type="email"
					name="email"
					{...register('email')}
					placeholder="Почта"
				/>
				{errors.email?.message && (
					<div className={styles.loginError}>{errors.email?.message}</div>
				)}
				<label>Пароль:</label>
				<input
					type="password"
					name="password"
					{...register('password')}
					placeholder="Пароль"
				/>
				{errors.password?.message && (
					<div className={styles.loginError}>{errors.password?.message}</div>
				)}
				<label>Подтвердите пароль:</label>
				<input
					type="password"
					name="passwordConfirm"
					{...register('passwordConfirm')}
					placeholder="Пароль"
					onBlur={onBlurPasswordConfirm}
				/>
				{errors.passwordConfirm?.message && (
					<div className={styles.loginError}>
						{errors.passwordConfirm?.message}
					</div>
				)}
				<button
					ref={submitButtonRef}
					disabled={
						errors.passwordConfirm?.message ||
						errors.email?.message ||
						errors.password?.message
					}
					type="submit"
					className={
						errors.passwordConfirm?.message &&
						errors.password?.message &&
						errors.email?.message
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
