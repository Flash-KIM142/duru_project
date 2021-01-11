// 홈화면에서 북지부 누르면 들어오게 되는 곳
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch, } from "react-router-dom"
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReportDataService from '../../services/reportService';
import * as S from '../main/styled';
import dotenv from 'dotenv';
dotenv.config();

const North = ({history}) => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editOn, setEditOn] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    const toggle = () => setEditOn(!editOn); 

    const addReport = () => {
        const date = new Date();
        // console.log(date);
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
        const getReport = () => {
        let reports = [];
        ReportDataService.getAll().get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
            let temp = doc.data();
            let id  = doc.id;
            let date = temp.date.toDate();
            reports.push({
                name: temp.name,
                description: temp.description,
                year: date.getFullYear(),
                month: date.getMonth()+1,
                date: date.getDate(),
                id: id,
            });
        });
        // console.log(reports);
        setData(reports);
        })
    }
        setName('');
        setDescription('');
        getReport();
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
                        if(check===process.env.REACT_APP_PASSWORD){
                            history.push('/northAuth');
                        } 
                        else{
                            alert('wrong password');
                        }
                    }}>Admin</Button>
                <Button onClick={()=>{alert('성공적으로 제출됐습니다!'); addReport();}}>제출</Button>
            </div>
        </Form>
        </>
    );
};

export default North;
