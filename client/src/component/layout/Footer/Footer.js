import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="left-footer">
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS Mobile Phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
            </div>

			<div className="mid-footer">
                <h1>Ecommerce.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights {new Date().getFullYear()} &copy; ranaahammed012</p>
            </div>

			<div className="right-footer">
                <h4>Follow Us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://youtube.com">YouTube</a>
                <a href="http://facebook.com">FaceBook</a>
            </div>
		</footer>
	);
};

export default Footer;
