// 북지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useState, useEffect } from 'react';
import { Link, } from "react-router-dom"
import { Button, Input,  Modal, ModalHeader, ModalFooter } from 'reactstrap';
import ReportDataService from '../../services/reportService';
import * as S from '../main/styled';
import firebase from "../../firebase";
import '../../index.css';
import logo from '../flash.png';
import DateTable from '../../components/dateCollection/north';
import Reports from '../../components/report'
import Notice from "../../components/notice";

const NorthAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [isUpdated,setIsUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editOn, setEditOn] = useState(false);
    const toggle = () => setEditOn(!editOn); 
    const [isModalOn, setIsModalOn] = useState(false);
    const toggleModal = () => setIsModalOn(!isModalOn);
    const [isCollectionOn, setIsCollectionOn] = useState(false);
    const toggleCollection = () => setIsCollectionOn(!isCollectionOn);
    const [isNoticeOn, setIsNoticeOn] = useState(false);
    const toggleNotice = () => setIsNoticeOn(!isNoticeOn);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

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
                    campus: temp.campus,
                })
            })
            setData(reports);
        });
        setLoading(false);
        setName('');
        setDescription('');
        setIsUpdated(false);
    }, [isUpdated])

    return (
        <>
            <div class="headWrapper" >
                <Link to="/" style={{ color: "black", }}>
                    두루 캠퍼스<br/>사역 보고
                </Link>
                <div style={{ fontSize: "15px", fontWeight: "400", color: "#0080FF", marginTop: "5px", }}>북서울지부</div>
            </div>

            {loading && <div style={{ width: "95%", marginTop: "20px", marginLeft: "auto", marginRight: "auto",  textAlign: "center", fontWeight: "bold"}}>Loading...</div>}

            {/* 사역보고 리스트*/}
            <Reports data={data} />

            {/* 모아보기 버튼 */}
            <div class="buttonWrapper">
                <div style={{ paddingLeft: "20px", float: "left", }}>
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
                                                value = {dateFrom} placeholder="ex)2021-01-01" onChange = {e=>setDateFrom(e.target.value)}/>
                            </div>
                        </div>
                                        
                        <div class="dateFromTo">
                            <p style={{ width: "95%", fontSize: "20px", fontWeight: "bold", }}>To</p>
                            <div class="dateCollection_selectDate_wrap">
                                <Input style={{ textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                                value = {dateTo} placeholder="ex)2021-01-31" onChange = {e=>setDateTo(e.target.value)}/>
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
                                if(dateFrom.length<10 || dateTo.length<10){
                                    alert('날짜를 제대로 입력하지 않으셨습니다.');
                                    setIsCollectionOn(false);
                                    setIsModalOn(true);
                                }
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
                    
                    {/* 공지사항 버튼 */}
                    {/* <div style={{ paddingRight: "20px", float: "right", display: "inline-block", }}>
                        <Button style={{ backgroundColor: "#ffaf40", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                            onClick={()=>setIsNoticeOn(!isNoticeOn)}>공지사항</Button>
                    </div>
                    <Modal isOpen={isNoticeOn} toggle={toggleNotice}>
                        <ModalHeader toggle={toggleNotice}>
                            <div style={{ fontSize: "25px", fontWeight: "bolder", color: "#57606f", }}>공지사항</div>
                        </ModalHeader>

                        <Notice />

                        <ModalFooter>
                            <Button 
                                style={{ backgroundColor: "#f53b57", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                                onClick={()=>setIsNoticeOn(false)}>닫기</Button>
                        </ModalFooter>
                    </Modal> */}
            </div>

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

export default NorthAuth;
