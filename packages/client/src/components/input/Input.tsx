interface InputProps {
	className: string;
	type: string;
	name: string;
	placeholder: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ className, type, name, value, onChange }) => {
  return (
		<input 
			className={ className }
			name={ name }
			type={ type }
			value={ value }
			placeholder={ `Введите ${name}` }
			onChange={ onChange }
		/>
  );
};
