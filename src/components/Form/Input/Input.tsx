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
      <input
        {...props}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md mb-2 px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-greenRegular md:mb-4"
      />
    </label>
  );
};

export default Input;
