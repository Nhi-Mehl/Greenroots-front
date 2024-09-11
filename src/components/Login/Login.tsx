function Login() {
  return (
    <main className="p-20">
      <section className="text-center mb-32 items-center border-2 border-solid border-greenRegular bg-emerald-50">
        <h1 className="text-3xl p-6">Connectez-vous</h1>
        <p className="w-1/2 p-6 mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad eveniet
          at totam perferendis, blanditiis minus maxime id architecto sapiente
          ut omnis aliquam nemo autem explicabo sequi libero adipisci aliquid
          maiores.
        </p>
      </section>
      <section className="flex justify-center">
        <form
          className="w-2/5 p-14 border-2 border-solid border-greenRegular bg-emerald-50 "
          action="/login"
        >
          <label className="mb-2" htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </label>

          <label className="mb-2" htmlFor="password">
            Mot de passe
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              className=" w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </label>

          <button
            className="w-full mt-8 text-slate-50 rounded-md border-0 p-2 bg-green-900"
            type="submit"
          >
            Connexion
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
