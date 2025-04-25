import React, { FC, useCallback, useRef } from 'react';

import s from './modal-overlay.module.scss';

const ModalOverlay: FC<
	React.PropsWithChildren<{
		onClose: () => void;
	}>
> = ({ children, onClose }) => {
	const overlayRef = useRef(null);

	const handleOverlayClick = useCallback(
		(event: unknown) =>
			(event as KeyboardEvent).target ===
				(event as KeyboardEvent).currentTarget && onClose(),
		[onClose]
	);

	return (
		<div
			role='banner'
			ref={overlayRef}
			className={`${s.overlay}`}
			onClick={handleOverlayClick}>
			{children}
		</div>
	);
};

export default ModalOverlay;
