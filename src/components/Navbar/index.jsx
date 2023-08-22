import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { StoreContext } from "../../context";

function Navbar() {
	const { cartCount, openCartMenu } = useContext(StoreContext);

	const activeStyle = "underline underline-offset-4";

	return (
		<nav className="flex justify-between items-center fixed w-full py-6 px-8 font-light top-0 bg-slate-50 z-30 h-20">
			<ul className="flex justify-center items-center gap-3">
				<li className="font-semibold text-xl">
					<NavLink to="/">Shopi</NavLink>
				</li>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						All
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/clothes"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Clothes
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/electronics"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Electronics
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/furnitures"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Furnitures
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/toys"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Toys
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/others"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Others
					</NavLink>
				</li>
			</ul>
			<ul className="flex justify-center items-center gap-3">
				<li className="text-black/60">store@gmail.com</li>
				<li>
					<NavLink
						to="/my-orders"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						My Orders
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/my-account"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						My Account
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sing-in"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Sign In
					</NavLink>
				</li>
				<li>
					{/* // Added this semantically interactive div wrapper to preserve accessibility */}
					<div
						role="button"
						tabIndex="0"
						onKeyDown={(event) => event.key === "Enter" && openCartMenu}
						className="flex hover:scale-105 transition-all"
						onClick={openCartMenu}
						aria-label="Open Cart Menu"
						title="Open Cart Menu"
					>
						<ShoppingBagIcon className="w-h h-6" />
						<span>{cartCount}</span>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
