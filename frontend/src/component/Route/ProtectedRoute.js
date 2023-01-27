import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ adminRoute, children }) => {
	const { loading, isAuthenticated, user } = useSelector(
		(state) => state.user
	);

	return (
		<Fragment>
			{loading === false && isAuthenticated === false ? (
				<Navigate to={"/login"} />
			) : (
				children
			)}
			{(loading === false) & (adminRoute === true) &&
			user.role !== "admin" ? (
				<Navigate to={"/"} />
			) : (
				children
			)}
		</Fragment>
	);
};

export default ProtectedRoute;
