// 홈화면에 사용하는 style
import styled from 'styled-components';
// import headImage from '../duruproject_headImgae.png';

export const HeadWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    font-size: 30px;
    font-weight: bold;
    text-align:left;
    align-items:left;
    justify-content: left;

    padding: 11%;
    width:100%;
    height: 20%;

    background-color: #EBF3FF;
    background-image: src="../duruproject_headImage.png";
    /* background-image: headImage; */

    color: gray
    ;
    &:hover{
        color:white;
    }
    &:active{
        color:white;
    }
    /* &:visited{
        color:white;
    } */
    &:link{
        color:white;
    } 
`;

export const BodyWrapper = styled.div`
    width: 100%;
`;

export const TailWrapper = styled.div` // 하단부 공지사항 및 내 정보 적어두기
    margin: 0 auto;
    margin-top: 15px;
    border-top: 1px thin lightgray;
    border-color: black;
    width: 100%;
    background-color: #fafaff;
`

export const CampusName = styled.div`
    display: flex;
    font-size: 15px;
    text-align:center;
    align-items:center;
    justify-content: center;
`;
export const MainImgWrapper = styled.div`
    width: 100%;
    text-align: center;
`;
export const MainImg = styled.img`
    position: relative;
`;

export const MainInput = styled.input`
    position: absolute;
    height: 50px;
    font-size: 50px;
    top: 180px;
    right: 50px;
    width: 100px;
    border: none;
    background: none;
    color: white;
`;

export const StyledButton = styled.div`
    display: flex;
    width: 300px;
    height: 130px;
    border-top-left-radius: 15px; /* 좌상단 */
    border-top-right-radius: 15px; /* 우상단 */
    border-bottom-right-radius: 15px;/* 우하단 */
    border-bottom-left-radius: 15px; /* 좌하단 */
    /* font-family: Nanum Gothic Coding; */
    font-size: 1.75rem;
    font-weight: 350;
    line-height: 1.5;
    box-shadow:0 30px 60px 12px rgba(0,0,33,0.05), 0 4px 24px 0 rgba(0,0,33,0.05), 0 0 1px 0 rgba(0,0,33,0.09);
    color: #2e2e2e;
    background-color: white;
    /* margin: 1rem; */
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align:center;
    align-items:center;
    justify-content: center;
    
    &:hover {
        box-shadow:0 30px 60px 12px rgba(0,0,33,0.15), 0 4px 24px 0 rgba(0,0,33,0.15), 0 0 1px 0 rgba(0,0,33,0.19);
        /* font-weight:normal; */
      }
`;


export const MainTitle = styled.div`
    display: flex;
    margin: 0 auto;
    font-size: 30px;
    text-align:center;
    align-items:center;
    justify-content: center;
`