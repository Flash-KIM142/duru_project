// 남지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, Form, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, } from "react-router-dom"
import ReportDataServiceSouth from '../../services/reportServiceSouth';
import * as S from '../main/styled';
import '../../index.css';
import firebase from "../../firebase";
import logo from '../flash.png';
import DateTable from '../../components/dateCollection/south';

const SouthAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editOn, setEditOn] = useState(false);
    // const [currentReport,setCurrentReport] = useState(0);
    const [currentReport,setCurrentReport] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [hideDate, setHideDate] = useState(false);
    const toggle = () => setEditOn(!editOn); 
    const [isModalOn, setIsModalOn] = useState(false);
    const toggleModal = () => setIsModalOn(!isModalOn);
    const [isCollectionOn, setIsCollectionOn] = useState(false);
    const toggleCollection = () => setIsCollectionOn(!isCollectionOn);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

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
        firebase.collection('ReportsSouth').orderBy("date", "desc").limit(5)
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
        setName('');
        setDescription('');
        setIsUpdated(false);
        setLoading(false);
    }, [isUpdated])

    const loadMore = () => {
        let nextReports = [];

        firebase.collection('ReportsSouth').orderBy("date","desc").limit(limit+5).get().then((querySnapshot)=>{
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
                // console.log(nextReports);
            })
            // var lastReport = nextReports[nextReports.length -1];
            // console.log(lastReport);
            // setData((data) => [...data, ...nextReports]);
            setData(nextReports);
            setLimit(c => c+5);
            // setLastVisible(nextReports[nextReports.length -1]);
        })
    }
    
    return (
        <>
            <div class="headWrapper" >
                <Link to="/" style={{ color: "black", }}>
                    두루 캠퍼스<br/>사역 보고
                </Link>
            </div>

            {data && loading && <div style={{ width: "95%", marginTop: "20px", marginLeft: "auto", marginRight: "auto",  textAlign: "center", fontWeight: "bold"}}>Loading...</div>}

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
                        <Button color="primary" 
                            style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                            onClick={() => {
                                setHideDate(!hideDate);
                                // let newIsOpen = [...isOpen];      //copy array
                                // newIsOpen[key] = !newIsOpen[key]; //toggle flag
                                // setIsOpen(newIsOpen);             //set new state
                                setIsOpen(!isOpen);
                                setCurrentReport(key);
                                console.log(currentReport);
                                }}>펴기/접기</Button>
                        <Collapse isOpen={isOpen&&(currentReport===key)}>
                                <div class="cardBody">
                                    {value.description}
                                </div>
                            <div style={{marginTop:'5px', marginLeft:'2px', textAlign:'right'}}>
                            <Button color='info' 
                                style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                onClick={()=>{
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
                                <Button color='danger' 
                                    style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                    onClick={()=>{
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

            <div class="buttonWrapper">
                <div style={{ margin: "4px" }}>
                    <Button style={{ backgroundColor: "#a29bfe", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                        onClick={()=>setIsModalOn(!isModalOn)}>모아보기</Button>
                </div>
                <Modal isOpen={isModalOn} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        <div style={{ fontSize: "25px", fontWeight: "bolder", color: "#57606f", }}>모아보기</div>
                    </ModalHeader>
                    
                    <div class="dateSelect_body">
                        <div class="dateFromTo">
                            <p style={{ width: "95%", fontSize: "20px", fontWeight: "bold", }}>From</p>
                            <div class="dateCollection_selectDate_wrap">
                                <Input style={{ textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                                value = {dateFrom} placeholder="2021-01-01" onChange = {e=>setDateFrom(e.target.value)}/>
                            </div>
                        </div>
                                        
                        <div class="dateFromTo">
                            <p style={{ width: "95%", fontSize: "20px", fontWeight: "bold", }}>To</p>
                            <div class="dateCollection_selectDate_wrap">
                                <Input style={{ textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                                value = {dateTo} placeholder="2021-01-31" onChange = {e=>setDateTo(e.target.value)}/>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px", display: "inline-block", }}>
                            <div style={{ color: "blue", fontSize: "20px", fontWeight: "bold", }}>YYYY-MM-DD</div>
                            <div style={{ fontSize: "13px", marginTop: "5px", }}>형식을 반드시 지켜주세요!</div>
                        </div>
                    </div>

                    <ModalFooter>
                        <Button 
                            style={{ backgroundColor: "#6c5ce7", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                            onClick={()=>{
                            setIsModalOn(!isModalOn);
                            setIsCollectionOn(!isCollectionOn);
                        }}>확인</Button>
                    </ModalFooter>
                    </Modal>
                    
                    {/* isCollectionOn 이 true 가 되면 Modal 사라지면서 모아보기 결과가 뜨도록 만들자 */}
                    <Modal isOpen={isCollectionOn} toggle={toggleCollection}>
                        <ModalHeader toggle={toggleCollection}>
                            <div style={{ fontSize: "25px", fontWeight: "bolder", color: "#57606f", }}>모아보기</div>
                        </ModalHeader>
                        <DateTable dateFrom={dateFrom} dateTo={dateTo} />
                        <ModalFooter>
                            <Button style={{ backgroundColor: "#fe2e64", border: "none", }}onClick={()=>setIsCollectionOn(false)}>닫기</Button>
                        </ModalFooter>
                    </Modal>

                {data && <div style={{ margin: "4px"}}>
                    <Button color="success" 
                        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                        onClick={()=>loadMore()}>Load More</Button>
                </div>}
            </div>
        </Form>}

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

export default SouthAuth;


    /* 요거는 useEffect 활용방법 예시 */

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