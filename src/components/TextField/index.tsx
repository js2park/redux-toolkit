import React, { useId, useState } from 'react';
import classNames from 'classnames';

export type TextFieldProps = {
	label?: string;
	placeholder?: string;
	flexCol?: boolean;
};

const TextField = ({ label, placeholder, flexCol }: TextFieldProps) => {
	const [value, setValue] = useState('');
	const id = useId();

	const onChange = (event: any) => {
		setValue(event.target.value);

		console.log('value: ', event.target.value);
	};

	return (
		<div
			className={classNames('flex', {
				'flex-col items-start': flexCol,
				'flex-row items-center': !flexCol,
			})}
		>
			{label && (
				<label htmlFor={id} className="mb-1">
					{label}
				</label>
			)}
			<input id={id} type="text" onChange={onChange} value={value} placeholder={placeholder} className="border" />
		</div>
	);
};

export default TextField;
