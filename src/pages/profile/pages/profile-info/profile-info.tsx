import { patchUser } from '@services/auth/requests/auth.requests';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';

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

	const handleSave = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			dispatch(patchUser({ name: username, email, password }));
		},
		[dispatch, email, password, username]
	);

	const handleCancel = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setEmail(initEmail);
			setUsername(initName);
			setPassword('');
		},
		[initEmail, initName]
	);

	return (
		<form onSubmit={handleSave} onReset={handleCancel}>
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
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='ml-10'>
					Сохранить
				</Button>

				<Button htmlType='reset' type='secondary' size='medium'>
					Отмена
				</Button>
			</div>
		</form>
	);
};

export default ProfileInfo;
