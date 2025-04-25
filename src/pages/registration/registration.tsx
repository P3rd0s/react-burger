import { register } from '@services/auth/requests/auth.requests';
import { useAppDispatch } from '@services/hooks';
import s from '@shared/styles/auth.module.scss';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration: FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegisterClick = useCallback(async () => {
		const resultAction = await dispatch(register({ email, password, name }));
		if (register.fulfilled.match(resultAction)) {
			navigate('/');
		}
	}, [dispatch, email, name, navigate, password]);

	return (
		<div className={s.wrapper}>
			<div className={s.form}>
				<h1 className={clsx('text text_type_main-medium mb-6', s.title)}>
					Регистрация
				</h1>

				<Input
					onChange={(e) => setName(e.target.value)}
					value={name}
					placeholder='Имя'
					name={'username'}
					extraClass='mb-6'
				/>

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
					onClick={handleRegisterClick}>
					Зарегестрироваться
				</Button>

				<p className='text text_type_main-default text_color_inactive'>
					Уже зарегистрированы? &nbsp;
					<Link to='/login' className='router-link'>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;
