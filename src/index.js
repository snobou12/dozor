/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux/es/exports";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./app/App";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});
root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
		<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
	</QueryClientProvider>
);
