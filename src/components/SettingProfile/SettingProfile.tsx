function SettingProfile() {
  return (
    <div className="p-20">
      <div className="flex flex-col mb-32 items-center border-2 border-solid border-green-950 bg-emerald-50">
        <h1 className="text-3xl p-6">Gerer mon profil</h1>
      </div>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 w-full p-14 border-2 border-solid border-green-950 bg-emerald-50"
          action="/"
        >
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="first_name">
              Prénom
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="first_name"
              name="first_name"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="last_name">
              Nom
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="last_name"
              name="last_name"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="address">
              Adresse
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="address"
              name="address"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="zip_code">
              Code postal
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="zip_code"
              name="zip_code"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="city">
              Ville
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="city"
              name="city"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="country">
              Pays
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="country"
              name="country"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="phone">
              Téléphone
            </label>
            <input
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="phone"
              name="phone"
            />
          </div>
          <div className="flex flex-col">
            <button
              className="w-1/2 m-auto mt-5 rounded-md border-0 p-1.5  text-gray-100 ring-1 ring-inset bg-violet-900"
              type="submit"
            >
              Enregistrer les modification
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className="w-1/2 m-auto mt-5 rounded-md border-0 p-1.5  text-gray-100 ring-1 ring-inset bg-red-800"
              type="submit"
            >
              Supprimer mon profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingProfile;
