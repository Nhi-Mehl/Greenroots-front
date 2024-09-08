function Contact() {
  return (
    <div className="p-20">
      <div className="flex flex-col mb-32 items-center border-2 border-solid border-green-950 bg-emerald-50">
        <h1 className="text-3xl p-6">Contact</h1>
        <p className="w-1/2 p-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          dignissimos debitis adipisci error deserunt est modi velit quos,
          consequuntur suscipit aperiam magni, fugit quas reiciendis vero. Ad
          exercitationem in iste?
        </p>
      </div>
      <div className="flex justify-center">
        <form
          className="w-2/5 p-14 border-2 border-solid border-green-950 bg-emerald-50"
          action="/contact"
        >
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="prenom">
              Votre prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Votre prénom"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="prenom">
              Votre nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Votre nom"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              Votre email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="message">
              Votre message
            </label>
            <textarea
              rows={4}
              cols={50}
              id="message"
              name="message"
              placeholder="Votre message"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div>
            <button
              className="w-full text-slate-50 rounded-md border-0 p-2 mt-6 bg-green-900"
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
