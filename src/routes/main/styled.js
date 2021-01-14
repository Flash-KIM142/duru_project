// 홈화면에 사용하는 style
import styled from 'styled-components';

export const HeadWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    font-size: 30px;
    font-weight: thin;
    text-align:center;
    align-items:center;
    justify-content: center;
    width:100%;
    height: 150px;
    background-color:black;
    color: white;
    &:hover{
        color:white;
    }
    &:active{
        color:white;
    }
    &:visited{
        color:white;
    }
    &:link{
        color:white;
    }
    
`;
export const BodyWrapper = styled.div`
    width: 100%;
    
`;

export const TailWrapper = styled.div` // 공지사항 및 내 정보 적어두기

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
    height: 150px;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    /* border: 1px solid lightgray; */
    box-shadow:0 30px 60px 12px rgba(0,0,33,0.05), 0 4px 24px 0 rgba(0,0,33,0.05), 0 0 1px 0 rgba(0,0,33,0.09);
    color: gray;
    background-color: white;
    font-weight:lighter;
    margin: 1rem;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 25px;
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