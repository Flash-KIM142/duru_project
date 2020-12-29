// 홈화면에서 북지부 누르면 들어오게 되는 곳
import React from 'react';
import { BrowserRouter, Route, Link, Switch, } from "react-router-dom"
import Report from '../../components/report';
import * as S from '../main/styled';

const North = () => {
    return (
        <>
            <S.HeadWrapper>
                <Link to="/" style={{ color:'white'}}>
                        두루 캠퍼스 사역 보고 
                </Link>
                    <S.CampusName>북지부</S.CampusName>
            </S.HeadWrapper>
            <Report/>
        </>
    );
};

export default North;
