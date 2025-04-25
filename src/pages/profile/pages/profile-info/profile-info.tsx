import { FC, useCallback, useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { shallowEqual } from 'react-redux';
import { patchUser } from '@services/auth/requests/auth.requests';

const ProfileInfo: FC = () => {
	const { initName, initEmail } = useAppSelector<
		RootState,
		{ initName: string; initEmail: string }
	>(
		(state) => ({
			initName: state.auth.name,
			initEmail: state.auth.email,
		}),
		shallowEqual
	);

	const [username, setUsername] = useState(initName);
	const [email, setEmail] = useState(initEmail);
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSaveClick = useCallback(() => {
		dispatch(patchUser({ name: username, email, password }));
	}, [dispatch, email, password, username]);

	const handleCancelClick = useCallback(() => {
		setEmail(initEmail);
		setUsername(initName);
		setPassword('');
	}, [initEmail, initName]);

	return (
		<>
			<Input
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				placeholder='Имя'
				name={'username'}
				icon='EditIcon'
				extraClass='mb-6'
			/>

			<EmailInput
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name={'email'}
				isIcon={true}
				extraClass='mb-6'
			/>

			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name={'password'}
				extraClass='mb-6'
			/>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row-reverse',
					width: '100%',
				}}>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='ml-10'
					onClick={handleSaveClick}>
					Сохранить
				</Button>

				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					onClick={handleCancelClick}>
					Отмена
				</Button>
			</div>
		</>
	);
};

export default ProfileInfo;
