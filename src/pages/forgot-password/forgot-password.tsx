import { FC, useCallback, useState } from 'react';
import { clsx } from 'clsx';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from '@shared/styles/auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@services/hooks';
import { sendCodeToEmail } from '@services/auth/requests/auth.requests';

const ForgotPassword: FC = () => {
	const [email, setEmail] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleForgotClick = useCallback(async () => {
		const resultAction = await dispatch(sendCodeToEmail(email));
		if (sendCodeToEmail.fulfilled.match(resultAction)) {
			navigate('/reset-password');
		}
	}, [dispatch, email, navigate]);

	return (
		<div className={s.wrapper}>
			<div className={s.form}>
				<h1 className={clsx('text text_type_main-medium mb-6', s.title)}>
					Восстановление пароля
				</h1>

				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'
					onClick={handleForgotClick}>
					Восстановить
				</Button>

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
