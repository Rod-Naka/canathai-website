import "../styles/globals.css";
import Nav from "../components/nav";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="h-screen bg-gradient-to-b from-[#261B3E] to-[#3E764E]">
        <Nav />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
