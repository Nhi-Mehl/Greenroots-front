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
    <section className="absolute inset-0 flex flex-col gap-2 sm:gap-10 lg:gap-20 items-center justify-center text-white mt-10  px-4">
      <h1 className="h1-title text-center lg:text-h1 lg:mt-8">
        {title}
        {subtitle && <span className="block lg:mt-8">{subtitle}</span>}
      </h1>
      {description && (
        <p className="text-xs text-center sm:text-lg md:text-xl sm:px-6 md:px-8 lg:px-18 lg:text-3xl lg:mt-6">
          {description}
        </p>
      )}
      {buttonText && (
        <button
          className="btn lg:text-lg"
          type="button"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </section>
  );
}

export default BannerContent;
