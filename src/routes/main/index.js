// 이게 홈화면
import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import * as S from './styled';

const Main = () => {
    return (
        <>
            <S.HeadWrapper>
                <Link to="/" style={{ color:'white'}}>
                    두루 캠퍼스 사역 보고
                </Link>
            </S.HeadWrapper>
            
            <S.BodyWrapper>
                <Link to="/north" style={{ color:'white'}}>
                    <S.StyledButton>북서울 지부</S.StyledButton> 
                </Link>
                <Link to="/west" style={{ color:'white'}}>
                    <S.StyledButton>서서울 지부</S.StyledButton> 
                </Link>
                <Link to="/south" style={{ color:'white'}}>
                    <S.StyledButton>남서울 지부</S.StyledButton> 
                </Link>
            </S.BodyWrapper>
        </>
    );
};

export default Main;