// 홈화면에서 북지부 누르면 들어오게 되는 곳
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Button, Input, Form, FormGroup } from 'reactstrap';
import ReportDataService from '../../services/reportService';
import * as S from '../main/styled';
import '../../index.css';
import logo from '../flash.png';
import dotenv from 'dotenv';
dotenv.config();

const North = ({history}) => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [isUpdated,setIsUpdated] = useState(false);

    const addReport = () => {
        const date = new Date();
        ReportDataService.create({
          name: name,
          description: description,
          date: date,
          campus: "north",
        }).then(()=>{
          // console.log("Created new item successfully!");
          setIsUpdated(true);
        }).catch((err)=>{
          console.log(err);
        })
      }

      useEffect(()=>{
        setName('');
        setDescription('');
        setIsUpdated(false);
    },[isUpdated])

    return (
        <>
            <div class="headWrapper" >
                <Link to="/" style={{ color: "black", }}>
                    두루 캠퍼스<br/>사역 보고
                </Link>
                <div style={{ fontSize: "15px", fontWeight: "400", color: "#0080FF", marginTop: "5px", }}>북서울지부</div>
            </div>

            <Form style={{ marginTop:"10px"}}>
            <FormGroup>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                    value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                    type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
            </FormGroup>
            <div style={{width:"95%",margin:'0 auto', height: "38px", }}>
                <div style={{ float: "left", }}>
                    <Button color="info" 
                        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                            onClick={()=>{
                                var check = prompt('password', '');
                                if(check===process.env.REACT_APP_NORTHPASSWORD){
                                    history.push('/northAuth');
                                } 
                                else{
                                    alert('wrong password');
                                }
                        }}>관리자</Button>
                </div>
                <div style={{ float: "right", display: "inline-block",  }}>
                    <Button color="primary"
                        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                        onClick={()=>{
                            if(name.length<2 || description.length<3){
                                alert('이름 또는 내용을 입력하지 않으셨습니다.');
                            }
                            else{
                                alert('성공적으로 제출됐습니다!'); addReport();
                        }
                        }}>제출</Button>
                </div>
            </div>
        </Form>

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

export default North;
