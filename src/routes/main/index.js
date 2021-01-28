// 이게 홈화면
import React from 'react';
import { Link, } from "react-router-dom"
import * as S from './styled';
import '../../index.css';
import logo from "../flash.png";

const Main = () => {
    return (
        <>
            <div class="headWrapper" >
                <Link to="/" style={{ color: "black", }}>
                    두루 캠퍼스<br/>사역 보고
                </Link>
            </div>
            
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
                    이용에 불편한 점이나 질문사항이 있으실 경우에는 다음 메일로 연락 주시면 빠르게 해결하도록 하겠습니다.
                    </p>
                    <p style={{ fontSize: "18px", }}>topqr123q@gmail.com</p>
                    <hr style={{ marginTop: "20px", marginBottom: "20px", border: 0, borderTop: "1px solid #eee" }}></hr>
                    <div style={{ textAlign: "center", }}>
                        <img alt="flashLogo" src={logo} style={{ height: "40px", width: "40px", }} />
                    </div>
                    <div class="copyrightWrapper">
                        Copyright © 2021 by &nbsp;
                        <h3 class="copyrightFlash" >Flash</h3>
                        , All rights reserved
                    </div>
                </div>
            </S.TailWrapper>
        </>
    );
};

export default Main;