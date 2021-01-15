// 북지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch, } from "react-router-dom"
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReportDataService from '../../services/reportService';
import * as S from '../main/styled';
import firebase from "../../firebase";
import '../../index.css';
import logo from '../flash.png';

const NorthAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [isUpdated,setIsUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [editOn, setEditOn] = useState(false);
    const [hideDate, setHideDate] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    // const [isCorrect,setIsCorrect] = useState(false);
    const toggle = () => setEditOn(!editOn); 

    const removeReport = (id) => {
        ReportDataService.delete(id).then(()=>{
        setIsUpdated(true);
        }).catch((err)=>{
        console.log(err);
        })
    }

    const editReport = (id) => {
        ReportDataService.update(id,{
        name: name,
        description: description,
        }).then(()=>{
        setName('');
        setDescription('');
        setIsUpdated(true);
        }).catch((err)=>{
        console.log(err);
        })
    }

    useEffect(() => {
        let reports = [];
        firebase.collection('Reports').orderBy("date", "desc").limit(5)
        .get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let temp = doc.data();
                let id = doc.id;
                let date = temp.date.toDate();

                reports.push({
                    name: temp.name,
                    description: temp.description,
                    year: date.getFullYear(),
                    month: date.getMonth()+1,
                    date: date.getDate(),
                    id: id,
                })
            })
            setData(reports);
        });
        setLoading(false);
        setName('');
        setDescription('');
        setIsUpdated(false);
    }, [isUpdated])

    const loadMore = () => {
        let nextReports = [];
        firebase.collection('Reports').orderBy("date","desc").limit(limit+5).get().then((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                let temp = doc.data();
                let id = doc.id;
                let date = temp.date.toDate();

                nextReports.push({
                    name: temp.name,
                    description: temp.description,
                    year: date.getFullYear(),
                    month: date.getMonth()+1,
                    date: date.getDate(),
                    id: id,
                })
            })
            setData(nextReports);
            setLimit(c => c+5);
        })
    }

    return (
        <>
            <S.HeadWrapper>
                <Link to="/" style={{ color:'white'}}>
                        두루 캠퍼스 사역 보고 
                </Link>
                    <S.CampusName>북지부</S.CampusName>
            </S.HeadWrapper>

            {loading && <div style={{ width: "95%", marginTop: "20px", marginLeft: "auto", marginRight: "auto",  textAlign: "center", fontWeight: "bold"}}>Loading...</div>}

            {!loading && <Form style={{ marginTop:"10px"}}>
            <Table style={{ marginTop: "30px" }}>
            <thead>
                <tr>
                <th class="name">이름</th>
                <th class="description">내용</th>
                {!hideDate && <th class="date">날짜</th>}
                </tr>
            </thead>
            <tbody>
                {data&&
                data.map((value,key)=>
                (
                    <tr key={key}>
                    <td class="name">{value.name}</td>
                    <td class="description">
                        <Button color="primary" onClick={() => {
                            setHideDate(!hideDate);
                            setIsOpen(!isOpen);
                            setCurrentReport(key);
                            console.log(currentReport);
                            }}>펴기/접기</Button>
                        <Collapse isOpen={isOpen&&(currentReport===key)}>
                            <Card>
                            <CardBody class="cardBody">
                                <div class="cardBody">
                                    {value.description}
                                </div>
                            </CardBody>
                            </Card>
                            <div style={{marginTop:'5px', marginLeft:'2px', textAlign:'right'}}>
                            <Button color='info' onClick={()=>{
                                setEditOn(!editOn);
                                setCurrentReport(key);
                                }}>수정</Button>
                                    <Modal isOpen={editOn&&(currentReport===key)} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>수정하기</ModalHeader>
                                        <ModalBody>
                                            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
                                                    value = {name} placeholder={value.name}
                                                    onChange = {e=>setName(e.target.value)}></Input>
                                            <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
                                                    type="textarea" rows="6" value = {description} placeholder={value.description}
                                                    onChange = {e=>setDescription(e.target.value)}></Input>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color= 'primary' onClick={()=>{
                                            editReport(value.id);
                                            setEditOn(!editOn);
                                            }}>수정완료</Button>
                                        </ModalFooter>
                                        </Modal>
                                        <Button color='danger' onClick={()=>{
                                            if(window.confirm('정말 삭제하시겠습니까?')===true){
                                                removeReport(value.id);
                                            }
                                            else{
                                                return false;
                                            }
                                        }}>삭제</Button>
                            </div>
                        </Collapse>
                    </td>
                    {!hideDate && <td class="date" style={{ fontSize:'smaller' }}>{value.year}년 <br/>{value.month}월 {value.date}일</td>}
                    </tr>
                ))}
            </tbody>
            </Table>

            {data && <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
                <Button color="success" onClick={()=>loadMore()}>Load More</Button>
            </div>}
        </Form>}

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

export default NorthAuth;
