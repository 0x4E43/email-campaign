import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import LoggedIn from "./components/logged-in";
import LoggedOut from "./components/logged-out";
import Loading from "./components/loading";

export default function App() {
  const { isLoading, isAuthenticated } = useKindeAuth();
  if (isLoading) return <Loading/>;
  return isAuthenticated ? <LoggedIn /> : <LoggedOut />;

}