import styled from "styled-components";
import theme from "./theme";
const { colors, fonts, fontSizes } = theme;

const StyledButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	user-select: none;
	color: ${(props) => props.textColor || colors.white};
	background: ${(props) => props.color || "transparent"};
	font-family: ${fonts.Montserrat};
	font-weight: ${(props) => props.weight || "normal"};
	font-size: ${(props) => props.fontSize || fontSizes.xl};
	text-decoration: none;
	outline: none;
	border: ${(props) =>
		props.borderColor ? `2px solid ${props.borderColor}` : "none"};
	border-radius: 5px;
	cursor: pointer;
	min-width: 7rem;
	width: ${(props) => props.setWidth};
	margin: 0;
	padding: 0.5rem 0.75rem;
	transition: all 200ms;
	&:hover {
		background: ${(props) => props.hoverColor};
		color: ${(props) => props.hoverText} !important;
		border-color: ${(props) => props.hoverColor};
		> * {
			color: ${(props) => props.hoverText} !important;
		}
	}
	pointer-events: ${(props) => (props.disable ? "none !important" : "")};
	background: ${(props) => (props.disable ? colors.unattempted : props.color)};
	border-color: ${(props) =>
		props.disable ? colors.unattempted : props.borderColor};
`;

export default StyledButton;
