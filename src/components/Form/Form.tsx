interface FormProps {
  action: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form = ({ action, onSubmit, children }: FormProps) => {
  return (
    <form action={action} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
