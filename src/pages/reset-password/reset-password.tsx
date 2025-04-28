import { resetPassword } from '@services/auth/requests/auth.requests';
import { useAppDispatch } from '@services/hooks';
import s from '@shared/styles/auth.module.scss';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { FC, FormEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword: FC = () => {
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleReset = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			const resultAction = await dispatch(
				resetPassword({ token: code, password })
			);
			if (
				resetPassword.fulfilled.match(resultAction) &&
				resultAction.payload.success
			) {
				navigate('/login');
			}
		},
		[dispatch, code, password, navigate]
	);

	return (
		<div className={s.wrapper}>
			<div className={s.form}>
				<h1 className={clsx('text text_type_main-medium mb-6', s.title)}>
					Восстановление пароля
				</h1>

				<form className={s.form} onSubmit={handleReset}>
					<PasswordInput
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name={'password'}
						placeholder='Введите новый пароль'
						extraClass='mb-6'
					/>

					<Input
						onChange={(e) => setCode(e.target.value)}
						value={code}
						name={'code'}
						placeholder='Введите код из письма'
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

export default ResetPassword;
