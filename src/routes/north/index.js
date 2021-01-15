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
            <S.HeadWrapper>
                <Link to="/" style={{ color:'white'}}>
                        두루 캠퍼스 사역 보고 
                </Link>
                    <S.CampusName>북지부</S.CampusName>
            </S.HeadWrapper>

            <Form style={{ marginTop:"10px"}}>
            <FormGroup>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
            </FormGroup>
            <div style={{width:"95%",margin:'0 auto',textAlign:'right'}}>
                    <Button color='success' onClick={()=>{
                        var check = prompt('password', '');
                        if(check===process.env.REACT_APP_NORTHPASSWORD){
                            history.push('/northAuth');
                        } 
                        else{
                            alert('wrong password');
                        }
                    }}>관리자</Button>
                <Button onClick={()=>{
                    if(name.length<2 || description.length<3){
                        alert('이름 또는 내용을 입력하지 않으셨습니다.');
                    }
                    else{
                        alert('성공적으로 제출됐습니다!'); addReport();
                    }
                    }}>제출</Button>
            </div>
        </Form>

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

export default North;
