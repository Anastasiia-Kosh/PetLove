
"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";
import AuthInitializer from "./AuthInitializer";

const store = makeStore();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
