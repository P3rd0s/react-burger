import React, { FC } from 'react';
import s from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '@shared/components/modal-overlay/modal-overlay';
import { clsx } from 'clsx';

const Modal: FC<
	React.PropsWithChildren<{
		onClose: () => void;
		className?: string;
		header?: string;
	}>
> = ({ children, onClose, className, header }) => {
	return (
		<ModalOverlay onClose={onClose}>
			<div className={clsx(s.modal, className)}>
				<CloseIcon className={s.close} type='primary' onClick={onClose} />
				{header && (
					<h1 className={clsx('text text_type_main-large', s.header)}>
						{header}
					</h1>
				)}

				{children}
			</div>
		</ModalOverlay>
	);
};

export default Modal;
