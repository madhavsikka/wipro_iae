import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import axios from "axios";
import { Redirect } from "react-router-dom";
import config from "../../../config";
import "react-dropdown/style.css";
import { CSSTransition } from "react-transition-group";
import { IconContext } from "react-icons";
import { MdDone, MdAddCircleOutline, MdClear } from "react-icons/md";
import Loader from "../../Loader";
import Button from "../../../styles/Button";
import mixins from "../../../styles/mixins";
import theme from "../../../styles/theme";
const { colors, fontSizes } = theme;

const StyledFormFlex = styled.div`
	${mixins.styledFormFlex};
	:before {
		content: "Add Questions";
		display: ${(props) => (props.isPosting ? "none" : "block")};
	}
`;

const StyledForm = styled.div`
	${mixins.styledForm};
	align-items: stretch;
`;

const StyledSectionBar = styled.div`
	${mixins.flexBar};
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0;
	margin: 0 0 12px;
	max-height: 8rem;
	max-width: 480px;
	overflow-y: auto;
	height: 110px;
	transition: all 100ms;
	flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
	padding: 0.25rem;
	margin-bottom: 10px;
	background: ${(props) => (props.active ? colors.blueMunsell : "transparent")};
	color: ${(props) => (props.active ? "white" : colors.blueMunsell)};
`;

const StyledAddButton = styled(Button)`
	margin: 0;
	min-width: auto;
	padding: 0.18rem 1rem;
	background: ${(props) => (props.active ? colors.blueMunsell : "transparent")};
	color: ${(props) => (props.disable ? "lightgray" : "white")};
	svg {
		color: ${(props) => (props.disable ? "lightgray !important" : "white")};
	}
`;

const StyledAddOptionButton = styled(StyledAddButton)`
	background: white;
	color: ${colors.blueMunsell};
	border: 2px solid white;
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 0.25rem 1rem;
	box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.05);
	:hover {
		border: 2px solid ${colors.blueMunsell};
	}
`;

const StyledInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 1rem 0;
	padding: 0;
	box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.05);
	> div:first-child {
		padding: 0 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		background: ${colors.blueMunsell};
		color: white;
		font-size: ${fontSizes.xl};
		font-weight: 500;
		span {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
	textarea {
		padding: 5px;
		width: 480px;
		height: 120px;
		border: 2px solid transparent;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		transition: all 100ms;
		font-size: ${fontSizes.md};
		font-family: inherit;
		font-weight: 500;
		overflow-y: auto;
		:focus {
			border: 2px solid ${colors.blueMunsell};
			outline: none;
		}
	}
	> div:last-child {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		height: 30px;
		font-size: ${fontSizes.sm};
		font-weight: bold;
		span {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		input {
			margin: 0 4px 0 0;
			appearance: none;
			border-radius: 50%;
			width: 16px;
			height: 16px;
			border: 2px solid ${colors.blueMunsell};
			padding: 1px;
			transition: 0.1s all linear;
			outline: none;
		}
		input:checked {
			outline: none;
			border: 5px solid ${colors.blueMunsell};
		}
	}
`;

const DropdownWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 8px;
	.Dropdown-control {
		border-radius: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		background: ${colors.blueMunsellTransparent};
		outline: none;
		border: none;
		transition: all 100ms;
	}
	.Dropdown-placeholder {
		outline: none;
		border: none;
		background: ${colors.blueMunsellTransparent};
		color: white;
	}
	.Dropdown-option {
		transition: all 100ms;
		:hover {
			background: ${colors.cultured};
		}
	}
	.Dropdown-option.is-selected {
		background: ${colors.cultured};
	}
	.Dropdown-arrow {
		top: 12px;
		border-width: 5.5px 5.5px 0;
		border-color: #ffffff rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
	}
	.Dropdown-noresults {
		display: none;
	}
`;

const OptionBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	height: 230px;
	overflow-y: auto;
`;

const StyledBar = styled.div`
	${mixins.flexBar};
	justify-content: stretch;
	align-items: stretch;
	flex-wrap: no-wrap;
	height: 50px;
	padding: 0;
	margin: 0 0 1rem 0;
	transition: all 100ms;
	box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.05);
`;

const StyledTag = styled.div`
	display: flex;
	height: 50px;
	width: 2rem;
	padding: 1rem;
	align-items: center;
	justify-content: center;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	background: ${colors.blueMunsell};
	font-weight: 700;
	color: white;
	font-size: ${fontSizes.md};
`;

const StyledCheckBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 40px;
	background: white;
	input {
		cursor: ${(props) =>
			props.selected ? "pointer" : props.disable ? "not-allowed" : "pointer"};
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2px;
		color: white;
		appearance: none;
		width: 16px;
		min-width: 16px;
		height: 16px;
		min-height: 16px;
		outline: none;
		border: 2px solid lightgrey;
		transition: all 0.1s;
		:checked {
			border: 2px solid ${colors.blueMunsell};
			border-radius: 2px;
			:before {
				content: "✓";
				font-weight: bold;
				font-size: ${fontSizes.lg};
			}
			color: ${colors.blueMunsell};
			border: ${colors.blueMunsell};
		}
	}
`;

const StyledCross = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 40px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	background: white;
	cursor: pointer;
	transition: all 100ms;
	svg {
		width: 20px;
		height: 20px;
		:hover {
			color: ${colors.blueMunsell} !important;
		}
	}
`;

const StyledInput = styled.input`
	width: 100%;
	text-indent: 8px;
	height: 50px;
	margin-bottom: 10px;
	border: 2px solid transparent;
	font-family: inherit;
	font-size: ${fontSizes.md};
	font-weight: 500;
	transition: all 100ms;
	:focus {
		border: 2px solid ${colors.blueMunsell};
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		outline: none;
	}
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const QuestionInput = ({
	setStep,
	examDetails,
	marking,
	sections,
	questionAnswers,
	setQuestionAnswers,
	correctAnswers,
	setCorrectAnswers,
}) => {
	const [selectedSection, setSelectedSection] = useState(sections[0]);
	const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
	const [questionBox, setQuestionBox] = useState("");
	const [optionBox, setOptionBox] = useState([]);
	const [correctOptions, setCorrectOptions] = useState([]);
	const [type, setType] = useState("single");
	const [isPosting, setIsPosting] = useState(false);
	const [redirect, setRedirect] = useState(false);
	let optionsListDropdown = [
		...Array(questionAnswers[selectedSection]["numOfQuestions"]).keys(),
	].map((x) => ++x);
	const getAlphabet = (index) => String.fromCharCode(65 + index);

	const onQuestionChangeHandler = (event) => {
		setQuestionBox(event.target.value);
	};

	const onClickTypeHandler = (event) => {
		console.log(event.target.value);
		setType(event.target.value);
	};

	const onOptionChangeHandler = (event, index) => {
		let value = event.target.value;
		setOptionBox((prevState) => {
			let newState = [...prevState];
			newState[index] = value;
			return newState;
		});
	};

	const onClickSectionHandler = (event) => {
		setSelectedSection(event.target.innerText);
		setSelectedQuestionIndex(0);
		const newQuestionIndex = +questionAnswers[event.target.innerText][
			"numOfQuestions"
		];
		setSelectedQuestionIndex(newQuestionIndex);
		setQuestionBox("");
		setOptionBox([]);
		setCorrectOptions([]);
		setType("single");
	};

	const onClickAddHandler = () => {
		if (questionBox !== "" && optionBox.length !== 0) {
			setQuestionAnswers((prevState) => {
				let newState = JSON.parse(JSON.stringify(prevState));
				if (
					typeof newState[selectedSection]["questions"][
						selectedQuestionIndex
					] == "undefined"
				) {
					newState[selectedSection]["numOfQuestions"]++;
				}
				newState[selectedSection]["questions"][selectedQuestionIndex] = {
					question: questionBox,
					options: optionBox,
					type: type,
				};
				console.log(JSON.stringify(newState));
				return newState;
			});

			setCorrectAnswers((prevState) => {
				let newObject = JSON.parse(JSON.stringify(prevState));
				newObject[selectedSection][selectedQuestionIndex] = [...correctOptions];
				console.log(JSON.stringify(newObject));
				return newObject;
			});

			setQuestionBox("");
			setOptionBox([]);
			setCorrectOptions([]);
			setType("single");
			setSelectedQuestionIndex((prevState) => prevState + 1);
		}
	};

	const onClickAddOptionHandler = () => {
		setOptionBox((prevState) => [...prevState, ""]);
	};

	const onDropdownSelectHandler = (event) => {
		console.log(event.value); // or event.label
		setSelectedQuestionIndex(+event.value - 1);
		setQuestionBox(
			questionAnswers[selectedSection]["questions"][+event.value - 1][
				"question"
			]
		);
		setOptionBox(
			questionAnswers[selectedSection]["questions"][+event.value - 1]["options"]
		);
		setCorrectOptions(correctAnswers[selectedSection][+event.value - 1]);
	};

	const onSelectCorrectOptionHandler = (alphabet) => {
		setCorrectOptions((prevState) => {
			if (
				(type === "single" && correctOptions.length === 0) ||
				type === "multi"
			) {
				return prevState.includes(alphabet)
					? prevState.filter((i) => i !== alphabet)
					: [...prevState, alphabet];
			} else {
				return prevState.filter((i) => i !== alphabet);
			}
		});
	};

	const onClickCrossHandler = (index) => {
		setOptionBox((prevState) => {
			let newState = [...prevState];
			newState.splice(index, 1);
			return newState;
		});
		setCorrectOptions((prevState) => {
			let newState = [...prevState];
			newState.splice(index, 1);
			return newState;
		});
	};

	const onClickFinishHandler = () => {
		setIsPosting(true);
		let postData = {};
		let postExamDetails = {};
		let postAnswerKey = {};
		postData = {
			name: examDetails.name,
			sections: sections,
			questions: questionAnswers,
			date: examDetails.date.toLocaleDateString(),
			startTime: examDetails.startTime.toLocaleTimeString(),
			endTime: examDetails.endTime.toLocaleTimeString(),
		};
		postExamDetails = {
			name: examDetails.name,
			date: examDetails.date.toLocaleDateString(),
			startTime: examDetails.startTime.toLocaleTimeString(),
			endTime: examDetails.endTime.toLocaleTimeString(),
		};
		postAnswerKey = {
			name: examDetails.name,
			marking: marking,
			answerKey: correctAnswers,
		};

		axios
			.post(`${config.firebase.databaseURL}/examList.json`, {
				...postExamDetails,
			})
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});

		axios
			.post(`${config.firebase.databaseURL}/exams.json`, { ...postData })
			.then((res) => {
				let postAnswerKeyWithId = {};
				postAnswerKeyWithId = { ...postAnswerKey, examId: res.data.name };
				axios
					.post(`${config.firebase.databaseURL}/answerKeys.json`, {
						...postAnswerKeyWithId,
					})
					.then((res) => {
						setRedirect(true);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{redirect ? (
				<Redirect to="/admin-dashboard" />
			) : (
				<CSSTransition in timeout={300} classNames="page" appear>
					<StyledFormFlex isPosting={isPosting}>
						{isPosting ? (
							<Loader />
						) : (
							<StyledForm>
								<StyledSectionBar>
									{sections.map((section, i) => (
										<StyledButton
											key={i}
											textColor={colors.blueMunsell}
											fontSize={fontSizes.sm}
											borderColor={colors.blueMunsell}
											hoverColor={colors.blueMunsell}
											hoverText={colors.white}
											weight="600"
											active={selectedSection === section}
											onClick={(event) => onClickSectionHandler(event)}>
											{section}
										</StyledButton>
									))}
								</StyledSectionBar>
								<StyledInputContainer>
									<div>
										<span>
											<div>Question</div>
											<DropdownWrapper>
												<Dropdown
													options={optionsListDropdown}
													placeholder="-"
													value={(selectedQuestionIndex + 1).toString()}
													onChange={(event) => onDropdownSelectHandler(event)}
												/>
											</DropdownWrapper>
										</span>
										<StyledAddButton
											textColor="white"
											fontSize={fontSizes.sm}
											borderColor="white"
											hoverColor="white"
											hoverText={colors.blueMunsell}
											weight="600"
											onClick={() => onClickAddHandler()}
											disable={questionBox === "" || optionBox.length === 0}>
											<IconContext.Provider
												value={{
													size: "19px",
													style: {
														color: "white",
														marginRight: "0.2rem",
														marginBottom: "2px",
														strokeWidth: "1.5px",
													},
												}}>
												<MdDone />
											</IconContext.Provider>
											Add
										</StyledAddButton>
									</div>
									<textarea
										placeholder="Enter Question Here"
										value={questionBox}
										onChange={(event) =>
											onQuestionChangeHandler(event)
										}></textarea>
									<div>
										<span>
											<input
												type="radio"
												id="single"
												name="type"
												value="single"
												checked={type === "single"}
												onChange={(event) => onClickTypeHandler(event)}
											/>
											<label for="single">Single Correct</label>
										</span>
										<span>
											<input
												type="radio"
												id="multi"
												name="type"
												value="multi"
												checked={type === "multi"}
												onChange={(event) => onClickTypeHandler(event)}
											/>
											<label for="multi">Multi Correct</label>
										</span>
									</div>
								</StyledInputContainer>
								<OptionBox>
									{optionBox.map((option, index) => {
										let alphabet = getAlphabet(index);
										return (
											<StyledBar key={index}>
												<StyledTag>{alphabet}</StyledTag>
												<StyledInput
													placeholder={`Option ${alphabet}`}
													value={optionBox[index]}
													onChange={(event) =>
														onOptionChangeHandler(event, index)
													}
												/>
												<StyledCheckBox
													selected={correctOptions.includes(alphabet)}
													disable={
														type === "single" && correctOptions.length === 1
													}>
													<input
														type="checkbox"
														checked={correctOptions.includes(alphabet)}
														onChange={() =>
															onSelectCorrectOptionHandler(alphabet)
														}
													/>
												</StyledCheckBox>
												<StyledCross onClick={() => onClickCrossHandler(index)}>
													<IconContext.Provider
														value={{
															size: "20px",
															style: {
																color: "lightgrey",
																marginRight: "0.2rem",
																marginBottom: "2px",
																strokeWidth: "1.5px",
															},
														}}>
														<MdClear />
													</IconContext.Provider>
												</StyledCross>
											</StyledBar>
										);
									})}
									<StyledAddOptionButton
										fontSize={fontSizes.md}
										weight="600"
										onClick={() => onClickAddOptionHandler()}>
										<IconContext.Provider
											value={{
												size: "22px",
												style: {
													color: colors.blueMunsell,
													marginRight: "0.3rem",
													marginBottom: "2px",
													strokeWidth: "1px",
												},
											}}>
											<MdAddCircleOutline />
										</IconContext.Provider>
										Add Option
									</StyledAddOptionButton>
								</OptionBox>
								<ButtonBox>
									<Button
										color={colors.buttonGreen}
										textColor={colors.white}
										fontSize={fontSizes.md}
										borderColor={colors.buttonGreen}
										hoverColor={colors.buttonGreenDark}
										hoverText={colors.white}
										weight="600"
										setWidth="9rem"
										onClick={() => {
											setStep((prevState) => prevState - 1);
										}}>
										BACK
									</Button>
									<Button
										color={colors.buttonGreen}
										textColor={colors.white}
										fontSize={fontSizes.md}
										borderColor={colors.buttonGreen}
										hoverColor={colors.buttonGreenDark}
										hoverText={colors.white}
										weight="600"
										setWidth="9rem"
										onClick={() => onClickFinishHandler()}>
										FINISH
									</Button>
								</ButtonBox>
							</StyledForm>
						)}
					</StyledFormFlex>
				</CSSTransition>
			)}
		</>
	);
};

export default React.memo(QuestionInput);
