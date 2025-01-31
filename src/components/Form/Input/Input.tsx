interface InputProps {
  htmlFor: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

const Input = ({ htmlFor, label, value, onChange, ...props }: InputProps) => {
  return (
    <label htmlFor={htmlFor}>
      {label}
      <input {...props} value={value} onChange={onChange} className="input" />
    </label>
  );
};

export default Input;
