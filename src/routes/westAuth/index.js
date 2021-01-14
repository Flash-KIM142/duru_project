// 서지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, Form, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, } from "react-router-dom"
import * as S from '../main/styled';
import ReportDataServiceWest from '../../services/reportServiceWest';
import '../../index.css';

const WestAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [limit, setLimit] = useState(2);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editOn, setEditOn] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    const [hideDate, setHideDate] = useState(false);
    const toggle = () => setEditOn(!editOn); 

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
        ReportDataServiceWest.getAll().limit(5).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
        let temp = doc.data();
        let id  = doc.id;
        let date = temp.date.toDate();
        reports.push({
            name: temp.name,
            description: temp.description,
            // isOpen: temp.isOpen,  //  table row 여러 개 펼치기 해결하려고 넣음
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
        setLoading(false);
        setName('');
        setDescription('');
        getReport();
        setIsUpdated(false);
    },[isUpdated])

    const loadMore = () => {
        let nextReports = [];
        ReportDataServiceWest.getAll().limit(limit+5).get().then((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                let temp = doc.data();
                let id = doc.id;
                let date = temp.date.toDate();

                nextReports.push({
                    name: temp.name,
                    description: temp.description,
                    // isOpen: temp.isOpen,
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
            <S.CampusName>서지부</S.CampusName>
        </S.HeadWrapper>

        {loading && <div style={{ width: "95%", marginTop: "20px" ,marginLeft: "auto", marginRight: "auto",  textAlign: "center", fontWeight: "bold"}}>Loading...</div>}

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
                            // setIsOpen(!value.isOpen);
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
        </>
    );
};

export default WestAuth;
