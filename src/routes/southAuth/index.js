// 남지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BrowserRouter, Route, Link, Switch, } from "react-router-dom"
import ReportDataServiceSouth from '../../services/reportServiceSouth';
import * as S from '../main/styled';
import '../../index.css';
import firebase from "../../firebase";

const SouthAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    // const [lastVisible, setLastVisible] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editOn, setEditOn] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    const [isCorrect,setIsCorrect] = useState(false);
    const toggle = () => setEditOn(!editOn); 

    const removeReport = (id) => {
        ReportDataServiceSouth.delete(id).then(()=>{
        // console.log("Document successfully deleted!");
        setIsUpdated(true);
        }).catch((err)=>{
        console.log(err);
        })
    }

    const editReport = (id) => {
        ReportDataServiceSouth.update(id,{
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

    useEffect(() => {
        let reports = [];
        firebase.collection('ReportsSouth').orderBy("date", "desc").limit(2)
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
            // const lastReport = reports[reports.length -1];
            // setLastReport(lastReport);
            // console.log(lastReport);
            // console.log(reports.length);
            setData(reports);
        });

        setName('');
        setDescription('');
        setIsUpdated(false);
        setLoading(false);
    }, [isUpdated])

    // useEffect(()=>{
    //     if(!isCorrect){
    //         var check = prompt('password', '');
    //         console.log(check);
    //         if(check==='1357'){
    //             setIsCorrect(true);
    //         }
    //         else{
    //             console.log('뒤로 가져야됨.');
    //         }
    //     } 
    // },[])

    const loadMore = () => {
        setLoading(true);
        let nextReports = [];
        var first = firebase.collection('ReportsSouth').orderBy("date","desc").limit(2);
        // const reportRef = firebase.collection('ReportsSouth').orderBy("date","desc").get();
        // const lastReport = reportRef.docs[reportRef.docs.length - 1];
        first.get().then((documentSnapshots)=>{
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1].data();
            // console.log(lastVisible.date);
            // console.log(lastVisible);

            firebase.collection('ReportsSouth').orderBy("date","desc").startAfter(lastVisible.date).limit(2).get().then((querySnapshot)=>{
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
                    console.log(nextReports);
                })
                // var lastReport = nextReports[nextReports.length -1];
                // console.log(lastReport);
                setData((data) => [...data, ...nextReports]);
                lastVisible = nextReports[nextReports.length -1];
                console.log(lastVisible);
            })

            // var lastReport = nextReports[nextReports.length -1];
            // setData((data) => [...data, ...nextReports]);
            // setLastReport(lastReport);
            // console.log(lastReport);
        });
        setName('');
        setDescription('');
        setIsUpdated(false);
        setLoading(false);
    }

    // if(data.length === 0){
    //     return (
    //         <S.HeadWrapper>
    //             <Link to="/" style={{ color:'white'}}>
    //                     두루 캠퍼스 사역 보고 
    //             </Link>
    //                 <S.CampusName>관리자</S.CampusName>
    //         </S.HeadWrapper>
    //     )
    // }
  
    
    return (
        <>
            <S.HeadWrapper>
                <Link to="/" style={{ color:'white'}}>
                        두루 캠퍼스 사역 보고 
                </Link>
                    <S.CampusName>남지부</S.CampusName>
            </S.HeadWrapper>

            <Form style={{ marginTop:"10px"}}>
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
                                <Button color='danger' onClick={()=>removeReport(value.id)}>삭제</Button>
                            </div>
                        </Collapse>
                    </td>
                    <td class="date" style={{ fontSize:'smaller' }}>{value.year}년 <br/>{value.month}월 {value.date}일</td>
                    </tr>
                ))}
            </tbody>
            </Table>
            {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}

            {!loading && <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
                <Button color="success" onClick={()=>loadMore()}>Load More</Button>
            </div>}
        </Form>
        </>
    );
                                   
};

export default SouthAuth;
