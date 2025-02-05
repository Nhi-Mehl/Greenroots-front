interface FormProps {
  action: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Form = ({ action, onSubmit, className, children }: FormProps) => {
  return (
    <form action={action} className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
