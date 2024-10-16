import CustomLoader from "@/components/loader/loader";
import { Toaster } from "@/components/ui/toaster";
import { persistor, store } from "@/redux/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kahf Link Sharing App</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={<CustomLoader />} persistor={persistor}>
          <Component {...pageProps} />
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  )
}
