import "../styles/globals.css";
import "../styles/tailwind.css";
import { UserProvider } from "../providers";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
