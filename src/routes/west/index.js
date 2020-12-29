// 홈화면에서 서지부 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import ReportDataServiceWest from '../../services/reportServiceWest';
import * as S from '../main/styled';
import '../../index.css';

const West = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    // const toggle = () => setIsOpen(!isOpen);


    const addReport = () => {
        const date = new Date();
        ReportDataServiceWest.create({
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

    const removeReport = (id) => {
        ReportDataServiceWest.delete(id).then(()=>{
        // console.log("Document successfully deleted!");
        setIsUpdated(true);
        }).catch((err)=>{
        console.log(err);
        })
    }

    const editReport = (id) => {
        ReportDataServiceWest.update(id,{
        name: name,
        description: description,
        }).then(()=>{
        // console.log("Document successfully edited!");
        setName('');
        setDescription('');
        setIsUpdated(true);
        }).catch((err)=>{
        console.log(err);
        })
    }

    useEffect(()=>{
        const getReport = () => {
        let reports = [];
        ReportDataServiceWest.getAll().get().then(function(querySnapshot){
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
        console.log(reports);
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
            <S.CampusName>서지부</S.CampusName>
        </S.HeadWrapper>

        <Form style={{ marginTop:"10px"}}>
            <FormGroup>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
            </FormGroup>
            <div style={{width:"95%",margin:'0 auto',textAlign:'right'}}>
                <Button onClick={()=>addReport()}>제출</Button>
            </div>
            <Table style={{ marginTop: "30px" }}>
            <thead>
                <tr>
                <th class="name">이름</th>
                <th class="description">내용</th>
                <th class="date">날짜</th>
                </tr>
            </thead>
            <tbody>
                {data&&
                data.map((value,key)=>
                (
                    <tr key={key}>
                    <td class="name">{value.name}</td>
                    <td >
                        <Button color="primary" onClick={() => {
                            setIsOpen(!isOpen);
                            setCurrentReport(key);
                            console.log(currentReport);
                            }}>펴기/접기</Button>
                        <Collapse isOpen={isOpen&&(currentReport==key)}>
                            <Card>
                            <CardBody class="cardBody">
                                <div class="cardBody">
                                    {value.description}
                                </div>
                            </CardBody>
                            </Card>
                            <div style={{marginTop:'5px', marginLeft:'2px', textAlign:'right'}}>
                                <Button color='info' onClick={()=>editReport(value.id)}>수정</Button>
                                <Button color='danger' onClick={()=>removeReport(value.id)}>삭제</Button>
                            </div>
                        </Collapse>
                    </td>
                    <td class="date" style={{ fontSize:'smaller' }}>{value.year}년 <br/>{value.month}월 {value.date}일</td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </Form>
        </>
    );
};

export default West;