import React from "react";
import styled from "styled-components";
import Button from "../../../../styles/Button";
import config from "../../../../config";
import theme from "../../../../styles/theme";
import axios from "axios";
const { colors, fontSizes } = theme;

const StyledProgressBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	border-radius: 5px;
	background: ${colors.cultured};
	padding: 0;
`;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0;
	margin: 0;
`;

const StyledText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: ${colors.blueMunsell};
	color: white;
	height: 40px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	font-size: ${fontSizes.xl};
	font-weight: 500;
	box-shadow: 0 8px 4px -7px lightgray;
	user-select: none;
`;

const StyledBox = styled.div`
	display: grid;
	padding: 2rem 1rem;
	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
`;

const StyledDiv = styled.div`
	display: flex;
	user-select: none;
	cursor: pointer;
	font-weight: 700;
	font-size: ${fontSizes.xl};
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	transition: border, background 100ms linear;
	border: 2px solid ${colors.blueMunsell};

	border-color: ${(props) => {
		if (props.selected && !props.reviewed) {
			return colors.blueMunsell;
		}
		switch (props.state) {
			case config.questionState.review:
				return colors.review;
			case config.questionState.submit:
				return colors.submit;
			case config.questionState.unvisited:
				return colors.blueMunsell;
			case config.questionState.visited_unattempted:
				return colors.unattempted;
			default:
				return "transparent";
		}
	}};

	background: ${(props) => {
		if (props.selected && !props.reviewed) {
			return colors.blueMunsell;
		}
		switch (props.state) {
			case config.questionState.review:
				return colors.review;
			case config.questionState.submit:
				return colors.submit;
			case config.questionState.visited_unattempted:
				return colors.unattempted;
			case config.questionState.unvisited:
				return "transparent";
			default:
				return colors.blueMunsell;
		}
	}};
	color: ${(props) =>
		props.selected || props.state !== config.questionState.unvisited
			? "white"
			: colors.blueMunsell};

	:hover {
		/* background: ${(props) =>
			props.selected ? colors.indigo : colors.blueMunsell};
		border-color: ${(props) =>
			props.selected ? colors.indigo : colors.blueMunsell}; */
		background: ${colors.blueMunsell};
		border: ${colors.blueMunsell};
		color: ${colors.white};
	}
`;

const ButtonBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1rem;

	> div {
		display: flex;
		justify-content: space-around;
		margin-bottom: 1rem;
	}
`;

const StyledLegend = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	div:first-child {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		background: ${(props) => props.backColor};
		margin: 0;
		padding: 0;
	}
	div:last-child {
		font-size: ${fontSizes.sm};
		font-weight: 700;
		grid-area: ${(props) => props.area};
		margin: 0 0 0 5px;
		padding: 8px 0;
	}
`;

const ProgressBox = ({
	examId,
	user,
	uid,
	setIsSubmitting,
	setIsSubmittedSuccessfully,
	setUserResponseId,
	isReviewed,
	setIsReviewed,
	questionState,
	selectedOptions,
	setSelectedOptions,
	selectedSectionName,
	selectedSectionIndex,
	selectedQuestionIndex,
	setSelectedQuestionIndex,
	numOfQuestionsInSec,
	autoSubmit,
}) => {
	// const setQuestionStateHandler = (value) => {
	// 	questionState[selectedSectionName][selectedQuestionIndex] = value;
	// };

	const onClickHandler = (event) => {
		if (selectedQuestionIndex !== +event.target.innerText - 1) {
			setSelectedQuestionIndex(+event.target.innerText - 1);
			setIsReviewed(false);
			// if (
			// 	questionState[selectedSectionName][selectedQuestionIndex] ===
			// 	config.questionState.unvisited
			// ) {
			// 	setQuestionStateHandler(config.questionState.visited_unattempted);
			// }
		}
	};

	const onExamSubmitHandler = () => {
		let postData = {
			examId: examId,
			userId: uid,
			response: { ...selectedOptions },
		};
		axios
			.post(`${config.firebase.databaseURL}/userResponses.json`, {
				...postData,
			})
			.then((res) => {
				console.log(res);
				setUserResponseId(res.data.name);
				setIsSubmittedSuccessfully(true);
			})
			.catch((err) => {
				console.log(err);
			});
		setIsSubmitting(true);
	};

	if (autoSubmit) {
		document.getElementById("autoSubmit").click();
	}
	
	return (
		<StyledProgressBox>
			<StyledContainer>
				<StyledText>Question Panel</StyledText>
				<StyledBox>
					{[...Array(numOfQuestionsInSec[selectedSectionIndex])].map((_, i) => {
						return (
							<StyledDiv
								key={`${selectedSectionIndex}${i}`}
								selected={selectedQuestionIndex === i}
								reviewed={isReviewed}
								state={questionState[selectedSectionName][i]}
								onClick={(event) => onClickHandler(event)}>
								{i + 1}
							</StyledDiv>
						);
					})}
				</StyledBox>
			</StyledContainer>

			<ButtonBox>
				<div>
					<StyledLegend backColor={colors.submit} area="submitted">
						<div></div>
						<div>Submitted</div>
					</StyledLegend>
					<StyledLegend backColor={colors.review} area="reviewed">
						<div></div>
						<div>Marked</div>
					</StyledLegend>
					{/* <StyledLegend backColor={colors.unattempted} area="visited">
						<div></div>
						<div>Visited</div>
					</StyledLegend> */}
				</div>
				<div>
					<Button
						color={colors.darkRoyalBlue}
						textColor={colors.white}
						fontSize={fontSizes.sm}
						borderColor={colors.darkRoyalBlue}
						hoverColor={colors.royalBlue}
						weight="600"
						style={{ flexGrow: "1", marginRight: "4px" }}>
						INSTRUCTIONS
					</Button>
					<Button
						color={colors.darkRoyalBlue}
						textColor={colors.white}
						fontSize={fontSizes.sm}
						borderColor={colors.darkRoyalBlue}
						hoverColor={colors.royalBlue}
						weight="600"
						style={{ flexGrow: "1", marginLeft: "4px" }}>
						ASK A DOUBT
					</Button>
				</div>
				<Button
					id="autoSubmit"
					color={colors.buttonGreen}
					textColor={colors.white}
					fontSize={fontSizes.md}
					borderColor={colors.buttonGreen}
					hoverColor={colors.buttonGreenDark}
					hoverText={colors.white}
					weight="600"
					onClick={() => onExamSubmitHandler()}>
					SUBMIT
				</Button>
			</ButtonBox>
		</StyledProgressBox>
	);
};

export default React.memo(ProgressBox);
