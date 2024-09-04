function Register() {
  return (
    <div className="p-20">
      <div className="flex flex-col mb-32 items-center border-2 border-solid border-green-950 bg-emerald-50">
        <h1 className="text-3xl p-16">Inscrivez-vous</h1>
        <p className="w-1/2 p-12">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          laboriosam sunt quibusdam quo nostrum voluptas excepturi eos culpa,
          quos est repellendus consectetur odit soluta saepe iusto labore modi
          perspiciatis neque?
        </p>
      </div>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 w-full p-14 border-2 border-solid border-green-950 bg-emerald-50"
          action="/register"
        >
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="first_name">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Votre prénom"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="last_name">
              Nom
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Votre nom"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="address">
              Adresse
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Votre adresse"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="zip_code">
              Code postal
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              placeholder="Votre code postal"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="city">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Votre ville"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="country">
              Pays
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Votre pays"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="phone_number">
              Téléphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Votre téléphone"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-100 ring-1 ring-inset bg-green-900"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
