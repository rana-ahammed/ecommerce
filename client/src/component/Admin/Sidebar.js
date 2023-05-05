import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Dashboard from "@mui/icons-material/Dashboard";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<Link to="/">
				<img src={logo} alt="Ecommerce" />
			</Link>
			<Link to="/admin/dashboard">
				<p>
					<Dashboard /> Dashboard
				</p>
			</Link>
			<div>
				<TreeView
					defaultCollapseIcon={<ExpandLessIcon />}
					defaultExpandIcon={<ExpandMoreIcon />}
				>
					<TreeItem nodeId="1" label="Products">
						<Link to="/admin/products">
							<TreeItem
								nodeId="2"
								label="All"
								icon={<PostAddIcon />}
							/>
						</Link>
						<Link to="/admin/product">
							<TreeItem
								nodeId="3"
								label="Create"
								icon={<AddIcon />}
							/>
						</Link>
					</TreeItem>
				</TreeView>
			</div>
			<Link to="/admin/orders">
				<p>
					<ListAltIcon />
					Orders
				</p>
			</Link>
			<Link to="/admin/users">
				<p>
					<PeopleIcon />
					Users
				</p>
			</Link>
			<Link to="/admin/reviews">
				<p>
					<RateReviewIcon />
					Reviews
				</p>
			</Link>
		</div>
	);
};

export default Sidebar;
