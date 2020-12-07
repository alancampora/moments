export function Login({onLogin}) {
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <img src="https://cottagesatsanmarcos.com/wp-content/uploads/2017/12/Friends-Party.png"></img>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Moments
          </h1>
          <p className="leading-relaxed mt-4">
            The place to share your moments with friends
          </p>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={onLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}
