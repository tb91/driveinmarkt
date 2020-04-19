import "../styles/global.css";
import { useRouter } from "next/router";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <Component {...pageProps} />;
}
