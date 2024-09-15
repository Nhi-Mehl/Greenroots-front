interface BannerContentProps {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

// Composant réutilisable pour le contenu de la bannière
function BannerContent({
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
}: BannerContentProps) {
  return (
    <section className="absolute inset-0 flex flex-col gap-10 items-center justify-center text-white">
      <h1 className="h1-title text-center mt-8">
        {title}
        {subtitle && <span className="block">{subtitle}</span>}
      </h1>
      {description && (
        <p className="text-lg text-center mt-6 max-w-2xl">{description}</p>
      )}
      {buttonText && (
        <button className="btn mt-6" type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </section>
  );
}

export default BannerContent;
