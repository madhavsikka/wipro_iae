import React from "react";
import styled from "styled-components";
import theme from "../../../../styles/theme";
const { colors, fontSizes } = theme;

const StyledOption = styled.div`
	display: flex;
	width: 100%;
	justify-content: stretch;
	font-size: ${fontSizes.md};
	margin: 0;
	padding: 0;
	cursor: ${(props) =>
		props.type === "multi"
			? "pointer"
			: props.isSelected
			? "pointer"
			: props.length === 0
			? "pointer"
			: "not-allowed"};

	> div {
		padding: 12px 0;
		margin: 12px 12px 12px 0;
		border-radius: 5px;
		flex-grow: 0;
		user-select: none;

		:last-child {
			flex: 1 0 12rem;
			font-weight: 500;
			text-align: left;
			padding: 12px;
			margin: 12px 0;
			background: ${(props) =>
				props.isSelected ? colors.blueMunsell : colors.cultured};
			color: ${(props) => (props.isSelected ? "white" : "black")};
			border: ${(props) =>
				props.isSelected
					? `2px solid ${colors.blueMunsell}`
					: "2px solid transparent"};
			transition: border 0.1s linear;
			transition: background 0.1s linear;
		}
	}

	:hover div:last-child {
		border: 2px solid ${colors.blueMunsell};
	}
`;

const AnswerOption = ({ type, selectedOptions, alphabet, option }) => {
	return (
		<StyledOption
			isSelected={selectedOptions.includes(alphabet)}
			type={type}
			length={selectedOptions.length}>
			<div>{alphabet}</div>
			<div>{option}</div>
		</StyledOption>
	);
};

export default AnswerOption;
