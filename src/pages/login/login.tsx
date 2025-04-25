import { login } from '@services/auth/requests/auth.requests';
import { useAppDispatch } from '@services/hooks';
import s from '@shared/styles/auth.module.scss';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLoginClick = useCallback(async () => {
		const resultAction = await dispatch(login({ email, password }));
		if (login.fulfilled.match(resultAction)) {
			navigate('/');
		}
	}, [dispatch, email, navigate, password]);

	return (
		<div className={s.wrapper}>
			<div className={s.form}>
				<h1 className={clsx('text text_type_main-medium mb-6', s.title)}>
					Вход
				</h1>

				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
				/>

				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass='mb-6'
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'
					onClick={handleLoginClick}>
					Войти
				</Button>

				<p className='text text_type_main-default text_color_inactive mb-4'>
					Вы — новый пользователь? &nbsp;
					<Link to='/register' className='router-link'>
						Зарегистрироваться
					</Link>
				</p>

				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль? &nbsp;
					<Link to='/forgot-password' className='router-link'>
						Восстановить пароль
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
