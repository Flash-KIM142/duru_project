// 이게 홈화면
import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import * as S from './styled';
import '../../index.css';
import logo from "../flash.png";

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

            <S.TailWrapper>
                <div class="contactWrapper">
                    <p class="contact">
                        이용에 불편한 점이나 질문사항이 있으실 경우에는 다음 메일로 연락 주시면 빠른 시간 내에 해결해드리도록 노력하겠습니다.
                    </p>
                    <p style={{ fontSize: "18px", }}>topqr123q@gmail.com</p>
                    <hr style={{ marginTop: "20px", marginBottom: "20px", border: 0, borderTop: "1px solid #eee" }}></hr>
                    <div style={{ textAlign: "center", }}>
                        <img src={logo} style={{ height: "40px", width: "40px", }} />
                    </div>
                    <p class="copyright">Copyright © 2021 by Flash, All rights reserved</p>
                </div>
            </S.TailWrapper>
        </>
    );
};

export default Main;