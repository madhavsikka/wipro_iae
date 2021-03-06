import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { NavLink } from "react-router-dom";
const { colors, fonts, fontSizes } = theme;

const StyledMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${colors.white};
	height: 100vh;
	min-height: 400px;
	width: 100%;
	margin: 0;
	padding: 2rem;
	position: absolute;
	z-index: 10;
	transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	transform: translateY(-100%);
	transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

	a {
		font-size: ${fontSizes.xxl};
		font-family: ${fonts.Nexa};
		margin: 2rem 0;
		padding: 2px 8px;
		color: ${colors.blue};
		text-decoration: none;
	}
`;

const Menu = ({ open }) => {
	return (
		<StyledMenu open={open}>
			<NavLink to="/exams" activeClassName="menulink-active">DASHBOARD</NavLink>
			<NavLink to="/login" activeClassName="menulink-active">LOGIN</NavLink>
			<NavLink to="/register" activeClassName="menulink-active">REGISTER</NavLink>
			<NavLink to="/contact" activeClassName="menulink-active">CONTACT</NavLink>
			<NavLink to="/about" activeClassName="menulink-active">ABOUT</NavLink>
		</StyledMenu>
	);
};

export default Menu;
