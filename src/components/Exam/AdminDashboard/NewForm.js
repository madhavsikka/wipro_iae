import React from "react";
import styled from "styled-components";
import InputBox, { StyledDateTime, StyledTime } from "../../../styles/Input";
import { CSSTransition } from "react-transition-group";
import Button from "../../../styles/Button";
import "react-datepicker/dist/react-datepicker.css";
import mixins from "../../../styles/mixins";
import theme from "../../../styles/theme";
const { colors, fontSizes } = theme;

const StyledFormFlex = styled.div`
	${mixins.styledFormFlex};
	:before {
		content: "New Exam";
	}
`;

const StyledForm = styled.div`
	${mixins.styledForm};
	align-items: center;
`;

const NewForm = ({
	setStep,
	examDetails,
	setExamDetails,
	examName,
	setExamName,
	startDate,
	setStartDate,
	startTime,
	setStartTime,
	endTime,
	setEndTime,
}) => {
	const onClickNextHandler = () => {
		setExamDetails({
			name: examName,
			date: startDate,
			startTime: startTime,
			endTime: endTime,
		});
		setStep((prevState) => prevState + 1);
	};

	return (
		<CSSTransition in timeout={300} classNames="page" appear>
			<StyledFormFlex>
				<StyledForm>
					<InputBox
						tag="Name"
						place="Name of Exam"
						background={colors.blueMunsell}
						textColor="white"
						setMinWidth="25rem"
						setMargin="1rem"
						inputState={examName}
						setInputState={setExamName}
					/>
					<StyledDateTime
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						tag="Date"
						place="Date of Exam"
						background={colors.blueMunsell}
						textColor="white"
						setMinWidth="25rem"
						setMargin="1rem"
					/>
					<StyledTime
						selected={startTime}
						onChange={(time) => setStartTime(time)}
						tag="Time"
						place="Exam Starts At"
						background={colors.blueMunsell}
						textColor="white"
						setMinWidth="25rem"
						setMargin="1rem"
					/>
					<StyledTime
						selected={endTime}
						onChange={(time) => setEndTime(time)}
						tag="Time"
						place="Exam Ends At"
						background={colors.blueMunsell}
						textColor="white"
						setMinWidth="25rem"
						setMargin="5rem"
					/>
					<Button
						color={colors.buttonGreen}
						textColor={colors.white}
						fontSize={fontSizes.md}
						borderColor={colors.buttonGreen}
						hoverColor={colors.buttonGreenDark}
						hoverText={colors.white}
						weight="600"
						setWidth="9rem"
						disable={!examName || !startDate || !startTime || !endTime}
						onClick={() => onClickNextHandler()}>
						NEXT
					</Button>
				</StyledForm>
			</StyledFormFlex>
		</CSSTransition>
	);
};

export default NewForm;
