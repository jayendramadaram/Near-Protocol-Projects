import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nearinit from "../utils/Nearinit";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
