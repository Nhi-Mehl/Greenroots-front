interface TextAreaProps {
  htmlFor: string;
  label: string;
  rows: number;
  cols: number;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

const TextArea = ({ htmlFor, label, rows, cols, ...props }: TextAreaProps) => {
  return (
    <label htmlFor={htmlFor}>
      {label}
      <textarea
        rows={rows}
        cols={cols}
        className="w-full border border-gray-300 rounded-md mb-2 px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-greenRegular md:mb-4"
        {...props}
      />
    </label>
  );
};

export default TextArea;
