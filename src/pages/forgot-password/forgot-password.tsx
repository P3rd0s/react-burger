import { sendCodeToEmail } from '@services/auth/requests/auth.requests';
import { useAppDispatch } from '@services/hooks';
import s from '@shared/styles/auth.module.scss';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { FC, FormEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword: FC = () => {
	const [email, setEmail] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleForgot = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			const resultAction = await dispatch(sendCodeToEmail(email));
			if (sendCodeToEmail.fulfilled.match(resultAction)) {
				navigate('/reset-password');
			}
		},
		[dispatch, email, navigate]
	);

	return (
		<div className={s.wrapper}>
			<div className={s.form}>
				<h1 className={clsx('text text_type_main-medium mb-6', s.title)}>
					Восстановление пароля
				</h1>

				<form className={s.form} onSubmit={handleForgot}>
					<EmailInput
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						name={'email'}
						isIcon={false}
						extraClass='mb-6'
					/>

					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Восстановить
					</Button>
				</form>

				<p className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль? &nbsp;
					<Link to='/login' className='router-link'>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
