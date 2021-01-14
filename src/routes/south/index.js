// 홈화면에서 남지부 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Button, Input,Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom"
import ReportDataServiceSouth from '../../services/reportServiceSouth';
import * as S from '../main/styled';
import '../../index.css';
import dotenv from 'dotenv';
dotenv.config();

const South = ({history}) => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [isUpdated,setIsUpdated] = useState(false);

    const addReport = () => {
        const date = new Date();
        ReportDataServiceSouth.create({
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
            <S.CampusName>남지부</S.CampusName>

        </S.HeadWrapper>

        <Form style={{ marginTop:"10px"}}>
            <FormGroup>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
            </FormGroup>
            <div style={{width:"95%",margin:'0 auto',textAlign:'right'}}>
                    <Button color='success' onClick={()=>{
                        var check = prompt('password', '');
                        if(check===process.env.REACT_APP_SOUTHPASSWORD){
                            history.push('/southAuth');
                        } 
                        else if(check!==process.env.REACT_APP_SOUTHPASSWORD){
                            alert('wrong password');
                        }
                        else{
                            return false;
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
        </>
    );
};

export default South;
