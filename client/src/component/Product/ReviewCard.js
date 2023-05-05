import React from "react";
import profilePng from "../../images/Profile.png";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
	const options = {
		size: "medium",
		value: review.rating,
		readOnly: true,
		precision: 0.5,
	};
	return (
		<div className="review-card">
			<img src={profilePng} alt="User" />
			<p>{review.name}</p>
			<Rating {...options} />
			<span className="review-card-comment">{review.comment}</span>
		</div>
	);
};

export default ReviewCard;
