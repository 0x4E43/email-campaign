import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedOut() {
  const { login } = useKindeAuth();
  return (
    <>
        <div>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">
                "Master your inbox with our streamlined email app. Effortlessly prioritize, organize, and stay on top of your messages, whether for personal or professional use. Experience email management made simple."
                </p>
                <button className="btn btn-primary" onClick={() => login()}>Login</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
