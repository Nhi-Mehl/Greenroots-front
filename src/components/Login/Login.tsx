function Login() {
  return (
    <div className="p-20">
      <div className="flex flex-col mb-32 items-center border-2 border-solid border-green-950 bg-emerald-50">
        <h1 className="text-3xl p-6">Connectez-vous</h1>
        <p className="w-1/2 p-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad eveniet
          at totam perferendis, blanditiis minus maxime id architecto sapiente
          ut omnis aliquam nemo autem explicabo sequi libero adipisci aliquid
          maiores.
        </p>
      </div>
      <div className="flex justify-center">
        <form
          className="w-2/5 p-14 border-2 border-solid border-green-950 bg-emerald-50 "
          action="/login"
        >
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                className=" w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
            <div className="mt-8">
              <button
                className="w-full text-slate-50 rounded-md border-0 p-2 bg-green-900"
                type="submit"
              >
                Connexion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
