import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import axios from "axios";

const StripePayment = () => {
	const [stripeApiKey, setStripeApiKey] = useState("");

	async function getStripeApiKey() {
		const { data } = await axios.get("/api/v1/stripeapikey");
		setStripeApiKey(data.stripeApiKey);
	}
	useEffect(() => {
		getStripeApiKey();
	}, []);
	return (
		<Elements stripe={loadStripe(stripeApiKey)}>
			<Payment></Payment>
		</Elements>
	);
};

export default StripePayment;
