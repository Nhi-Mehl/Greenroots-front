function Contact() {
  return (
    <main className="px-4 py-10 sm:px-8 md:px-12 sm:py-12 md:py-28">
      <section className="p-8 mb-10 border-2 border-solid border-greenRegular rounded-lg bg-white shadow-md lg:max-w-[900px] lg:mx-auto">
        <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
          Contact
        </h1>
        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-xl">
          Vous avez un projet environnemental que vous souhaitez développer ?
          Nous serions ravis de collaborer avec vous ! Veuillez remplir le
          formulaire ci-dessous et nous fournir des informations sur votre
          projet. Notre équipe examinera attentivement votre proposition et vous
          contactera pour discuter des possibilités de partenariat. Merci de
          votre engagement en faveur d&apos;un avenir durable !
        </p>
      </section>
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
        <form action="/contact">
          <label htmlFor="prenom">
            Votre prénom
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Votre prénom"
              className="input"
            />
          </label>

          <label htmlFor="prenom">
            Votre nom
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Votre nom"
              className="input"
            />
          </label>

          <label htmlFor="email">
            Votre email
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              className="input"
            />
          </label>

          <label htmlFor="message">
            Votre message
            <textarea
              rows={4}
              cols={50}
              id="message"
              name="message"
              placeholder="Votre message"
              className="input "
            />
          </label>

          <button className="btn-form mt-4" type="submit">
            Envoyer
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
