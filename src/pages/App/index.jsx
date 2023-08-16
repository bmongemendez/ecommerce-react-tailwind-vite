import { useRoutes, BrowserRouter } from "react-router-dom";

import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import SignIn from "../SignIn";
import NotFound from "../NotFound";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import StoreContextProvider from "../../context";

import "./App.css";

const AppRoutes = () => {
	const routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/my-account",
			element: <MyAccount />,
		},
		{
			path: "/my-order",
			element: <MyOrder />,
		},
		{
			path: "/my-orders",
			element: <MyOrders />,
		},
		{
			path: "/sign-in",
			element: <SignIn />,
		},
		{
			path: "/*",
			element: <NotFound />,
		},
	]);

	return routes;
};

export default function App() {
	return (
		<StoreContextProvider>
			<BrowserRouter>
				<Navbar />
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</StoreContextProvider>
	);
}
