function Contact() {
  return (
    <div className="p-4">
      <div className="flex flex-col my-10 items-center border-2 border-solid border-green-950 bg-emerald-50 lg:max-w-[1024px] lg:m-auto lg:my-20">
        <h1 className="text-3xl p-4 lg:text-5xl">Contact</h1>
        <p className="w-5/6 p-4 text-sm text-center lg:text-lg">
          Vous avez un projet environnemental que vous souhaitez développer ?
          Nous serions ravis de collaborer avec vous ! Veuillez remplir le
          formulaire ci-dessous et nous fournir des informations sur votre
          projet. Notre équipe examinera attentivement votre proposition et vous
          contactera pour discuter des possibilités de partenariat. Merci de
          votre engagement en faveur d&apos;un avenir durable !
        </p>
      </div>
      <div className="flex justify-center ">
        <form
          className="p-6 border-2 border-solid my-10 border-green-950 bg-emerald-50"
          action="/contact"
        >
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-lg" htmlFor="prenom">
              Votre prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Votre prénom"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-lg" htmlFor="prenom">
              Votre nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Votre nom"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-lg" htmlFor="email">
              Votre email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-lg" htmlFor="message">
              Votre message
            </label>
            <textarea
              rows={4}
              cols={50}
              id="message"
              name="message"
              placeholder="Votre message"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div>
            <button
              className="w-full text-slate-50 rounded-md border-0 p-2 mt-6 bg-green-900 hover:bg-green-700"
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
