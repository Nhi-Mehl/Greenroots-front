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
    <section className="absolute inset-0 flex flex-col gap-12 items-center justify-center text-white px-10 lg:px-80 lg:gap-20">
      <h1 className="h1-title text-center lg:text-h1 lg:mt-8">
        {title}
        {subtitle && <span className="block lg:mt-8">{subtitle}</span>}
      </h1>
      {description && (
        <p className="text-base text-center lg:text-3xl lg:mt-6">
          {description}
        </p>
      )}
      {buttonText && (
        <button className="btn" type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </section>
  );
}

export default BannerContent;
