import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
	// ArrowPathIcon,
	// CheckIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";
import "react-toastify/dist/ReactToastify.css";

// This should be in an environment variable on a real world app if private
const API_ENDPOINT = "https://dummyjson.com/products";
const RESULTS_LIMIT = 12;
const ERROR_MESSAGE =
	"No products found or there has been an error, please again try later.";
const LOADING_MESSAGE = "Loading products...";
// const PRODUCTS_LOADED_MESSAGE = "Products loaded correctly!";

export default function Home() {
	const [storeData, setStoreData] = useState(null);
	const [productsOffset, setProductsOffset] = useState(0);
	const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

	const fetchData = () => {
		if (moreProductsAvailable) {
			toast.promise(
				fetch(`${API_ENDPOINT}?skip=${productsOffset}&limit=${RESULTS_LIMIT}`)
					.then((res) => {
						if (!res.ok) {
							throw new Error(ERROR_MESSAGE);
						}

						return res.json();
					})
					.then((data) => {
						setStoreData((prevState) =>
							// If offset !== 0 means that we are already paginating the results
							productsOffset !== 0
								? {
										...prevState,
										products: [...prevState.products, ...data.products],
								  }
								: data,
						);
						if (data.products.length === 0) {
							setMoreProductsAvailable(false);
						}
						return { data };
					})
					.catch((error) => {
						throw new Error(`${error}`);
					}),
				{
					pending: {
						render() {
							return LOADING_MESSAGE;
						},
						// These settings will also apply to 'success' and 'error' toasts
						toastId: "product-fetching-toast",
						position: "bottom-right",
						theme: "colored",
					},
					// success: {
					// 	render() {
					// 		return PRODUCTS_LOADED_MESSAGE;
					// 	},
					// 	icon: <CheckIcon />,
					// },
					error: {
						render({ data }) {
							return data.message;
						},
						icon: <ExclamationTriangleIcon />,
						autoClose: false,
					},
				},
			);
		}
	};

	// Using useCallback() to always send the same function as callback to the Button component,
	// in this way we prevent creating a new loadMoreItems() function on each render
	const loadMoreItems = useCallback(() => {
		// By updating the state, we are triggering the useEffect callback
		setProductsOffset((prevState) => prevState + RESULTS_LIMIT);
	}, []);

	useEffect(fetchData, [productsOffset, moreProductsAvailable]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-6 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{!!storeData &&
					storeData?.products?.map(
						({ id, category, images, price, title, description }) => (
							<Card
								key={id}
								id={id}
								images={images}
								price={price}
								category={category}
								title={title}
								description={description}
							/>
						),
					)}
			</div>
			{!!moreProductsAvailable && (
				<Button
					text="Load More Products"
					type="button"
					className="my-5 px-4 py-2"
					onClick={loadMoreItems}
				/>
			)}
			<ProductDetail />
			<CartMenu />
		</>
	);
}
