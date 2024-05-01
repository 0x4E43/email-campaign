import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedIn() {
  const { user, logout } = useKindeAuth();

  return (
    <>
      {/* SideBar */}
      <div className="navbar bg-base-300 px-20">
        <div className="flex-1">
          <a className="text-2xl font-mono">Email App</a>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-circle btn-outline"
            title="logout"
            onClick={() => logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <main>
        <div className="container justify-center items-center my-10 mx-10 px-10">
          <p className="my-2">Hello, {user?.given_name}!</p>
          <h1 className="text-xl font-sans">Lets start Sending E-Mail</h1>
          {/* Forms starts here */}
          <form action="">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">
                  Pick the template name you created on{" "}
                  <strong>Elastic Email</strong>
                </span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Pick a file with email list</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-md"
              />
            </label>
            <div className="form-control w-full max-w-md my-2">
                <button className="btn btn-outline">Send Emails</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
