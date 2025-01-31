interface FormProps {
  action: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form = ({ action, onSubmit, children }: FormProps) => {
  return (
    <form
      action={action}
      className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
