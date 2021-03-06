import React from "react";
import styled from "styled-components";
import theme from "../../../../styles/theme";
import config from "../../../../config";
import AnswerOption from "./AnswerOption";
import BottomBar from "./BottomBar";
const { colors, fontSizes } = theme;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0;
	padding: 0 0 1rem 0;
	height: 100%;
`;

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	box-shadow: 0 0 12px lightgray;
	border-radius: 5px;
	padding: 0 0 12px 0;
	margin-bottom: 1rem;
	flex: 1;
	height: 100%;
	width: 100%;
	overflow-y: auto;
`;

const StyledBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	width: 100%;
	padding: 0;
	box-shadow: 0 8px 6px -7px lightgray;
	background: ${colors.blueMunsell};
	color: white;
`;

const StyledQNum = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${fontSizes.xl};
	font-weight: 500;
	padding: 0 1rem;
	user-select: none;
`;

const StyledQDetails = styled(StyledQNum)`
	justify-content: space-between;
`;

const StyledMarking = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 8px 0rem 8px 2rem;
	padding: 0;
	border-radius: 4px;
	background: white;
	color: ${colors.blueMunsell};
	p {
		width: 80px;
		padding: 2px 0;
		margin: 0;
		:first-child {
			border-right: 1.25px solid ${colors.blueMunsell};
		}
		:last-child {
			border-left: 1.25px solid ${colors.blueMunsell};
		}
	}
`;

const StyledQuestion = styled.div`
	font-size: ${fontSizes.lg};
	font-weight: bold;
	padding: 1rem;
	text-align: left;
`;

const StyledOptionBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1rem;
`;

const StyledOption = styled.div`
	padding: 0;
	margin: 0;
`;

const QuestionBox = ({
	questions,
	questionState,
	selectedOptions,
	setSelectedOptions,
	selectedQuestionIndex,
	setSelectedQuestionIndex,
	numOfQuestionsInSec,
	selectedSectionName,
	selectedSectionIndex,
	setSelectedSectionIndex,
	numOfSections,
	marking,
	isReviewed,
	setIsReviewed,
}) => {
	// const currentQuestion = questions[selectedSectionName][selectedQuestionIndex];
	const currentQuestion =
		questions[selectedSectionName]["questions"][selectedQuestionIndex];

	const onClickOptionHandler = (alphabet) => {
		setSelectedOptions((prevState) => {
			if (
				prevState[selectedSectionName][selectedQuestionIndex].includes(alphabet)
			) {
				let newState = JSON.parse(JSON.stringify(prevState));
				newState[selectedSectionName][selectedQuestionIndex] = newState[
					selectedSectionName
				][selectedQuestionIndex].filter((i) => i !== alphabet);
				return newState;
			}
			if (
				currentQuestion.type === "multi" ||
				(currentQuestion.type === "single" &&
					selectedOptions[selectedSectionName][selectedQuestionIndex].length ===
						0)
			) {
				let newState = JSON.parse(JSON.stringify(prevState));
				newState[selectedSectionName][selectedQuestionIndex].push(alphabet);
				return newState;
			}
			return prevState;
		});
		questionState[selectedSectionName][selectedQuestionIndex] =
			config.questionState.visited_unattempted;
	};

	const getAlphabet = (index) => String.fromCharCode(65 + index);

	return (
		<StyledContainer>
			<StyledBox>
				<StyledBar>
					<StyledQNum>{`QUESTION ${selectedQuestionIndex + 1}`}</StyledQNum>
					<StyledQDetails>
						<p>{`${currentQuestion.type.toUpperCase()} CORRECT`}</p>
						<StyledMarking>
							<p>{`+${questions[selectedSectionName]["marking"]["positive"]}`}</p>
							<p>{`${questions[selectedSectionName]["marking"]["negative"]}`}</p>
						</StyledMarking>
					</StyledQDetails>
				</StyledBar>
				<StyledQuestion>{currentQuestion.question}</StyledQuestion>

				<StyledOptionBox>
					{currentQuestion.options.map((option, index) => {
						const alphabet = getAlphabet(index);
						return (
							<StyledOption
								key={`${selectedSectionName}${selectedQuestionIndex}${index}`}
								onClick={() => onClickOptionHandler(alphabet)}>
								<AnswerOption
									type={currentQuestion.type}
									selectedOptions={
										selectedOptions[selectedSectionName][selectedQuestionIndex]
									}
									alphabet={alphabet}
									option={option}
								/>
							</StyledOption>
						);
					})}
				</StyledOptionBox>
			</StyledBox>
			<BottomBar
				questionState={questionState}
				selectedOptions={selectedOptions}
				setSelectedOptions={setSelectedOptions}
				selectedQuestionIndex={selectedQuestionIndex}
				setSelectedQuestionIndex={setSelectedQuestionIndex}
				numOfQuestionsInSec={numOfQuestionsInSec}
				selectedSectionName={selectedSectionName}
				selectedSectionIndex={selectedSectionIndex}
				setSelectedSectionIndex={setSelectedSectionIndex}
				numOfSections={numOfSections}
				isReviewed={isReviewed}
				setIsReviewed={setIsReviewed}
			/>
		</StyledContainer>
	);
};
export default React.memo(QuestionBox);
