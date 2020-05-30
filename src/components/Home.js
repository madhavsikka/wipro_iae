import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import theme from "../styles/theme";
import media from "../styles/media";
const { colors, fonts, fontSizes } = theme;

const StyledContainer = styled.div`
	position: fixed;
	top: 35%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;

	${media.tablet`flex-direction: column; top: 45%;`};
`;

const StyledHead = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${fonts.Montserrat};
	font-weight: bold;
	font-size: ${fontSizes.h1};
	color: ${colors.blue};
	margin-right: 15px;

  ${media.tablet`font-size: ${fontSizes.h2}`};
  ${media.phablet`font-size: ${fontSizes.h3}`};
`;

const StyledName = styled.div`
	border-left: 3px solid ${colors.green};
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	font-family: ${fonts.Montserrat};
	font-weight: 500;
	color: ${colors.green};
	padding: 0 0 0 5px;
	p {
    font-size: ${fontSizes.xxxl};
    ${media.phablet`font-size: ${fontSizes.xxl}`};
		margin: 0 0 0 15px;
		padding: 0;
	}

	${media.tablet`border: none; align-items: center; font-size: ${fontSizes.xxl};`};
`;

const Home = () => {
	return (
		<>
			<Navbar />
			<StyledContainer>
				<StyledHead>WIPRO</StyledHead>
				<StyledName>
					<p>INDEPENDENT</p>
					<p>ASSESSMENT</p>
					<p>ENGINE</p>
				</StyledName>
			</StyledContainer>
			<Footer />
		</>
	);
};

export default Home;
