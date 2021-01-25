// 서지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, Form, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, } from "react-router-dom"
import * as S from '../main/styled';
import ReportDataServiceWest from '../../services/reportServiceWest';
import '../../index.css';
import logo from '../flash.png';
import DateTable from '../../components/dateCollection/west';

const WestAuth = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [isUpdated,setIsUpdated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editOn, setEditOn] = useState(false);
    const [currentReport,setCurrentReport] = useState(0);
    const [hideDate, setHideDate] = useState(false);
    const toggle = () => setEditOn(!editOn); 
    const [isModalOn, setIsModalOn] = useState(false);
    const toggleModal = () => setIsModalOn(!isModalOn);
    const [isCollectionOn, setIsCollectionOn] = useState(false);
    const toggleCollection = () => setIsCollectionOn(!isCollectionOn);

    const [monthItems] = useState([
        { label: "선택하세요", value: "00" }, { label: "1월", value: "01" }, { label: "2월", value: "02" }, { label: "3월", value: "03" }, { label: "4월", value: "04" }, { label: "5월", value: "05" }, { label: "6월", value: "06" }, { label: "7월", value: "07" }, { label: "8월", value: "08" }, { label: "9월", value: "09" }, { label: "10월", value: "10" }, { label: "11월", value: "11" }, { label: "12월", value: "12" },
    ]);
    const [dateItems] = useState([
        { label: "선택하세요", value: "00" }, { label: "1일", value: "01" }, { label: "2일", value: "02" }, { label: "3일", value: "03" }, { label: "4일", value: "04" }, { label: "5일", value: "05" }, { label: "6일", value: "06" }, { label: "7일", value: "07" }, { label: "8일", value: "08" }, { label: "9일", value: "09" }, { label: "10일", value: "10" }, { label: "11일", value: "11" }, { label: "12일", value: "12" }, { label: "13일", value: "13" }, { label: "14일", value: "14" }, { label: "15일", value: "15" }, { label: "16일", value: "16" }, { label: "17일", value: "17" }, { label: "18일", value: "18" }, { label: "19일", value: "19" }, { label: "20일", value: "20" }, { label: "21일", value: "21" }, { label: "22일", value: "22" }, { label: "23일", value: "23" }, { label: "24일", value: "24" }, { label: "25일", value: "25" }, { label: "26일", value: "26" }, { label: "27일", value: "27" }, { label: "28일", value: "28" }, { label: "29일", value: "29" }, { label: "30일", value: "30" }, { label: "31일", value: "31" },  
    ])
    const [fromYear, setFromYear] = useState();
    const [fromMonth, setFromMonth] = useState();
    const [fromDate, setFromDate] = useState();
    const [toYear, setToYear] = useState();
    const [toMonth, setToMonth] = useState();
    const [toDate, setToDate] = useState();

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

            <div class="buttonWrapper">
                <div style={{ margin: "4px" }}>
                    <Button style={{ backgroundColor:"#a29bfe", border: "none", }}
                        onClick={()=>setIsModalOn(!isModalOn)}>모아보기</Button>
                </div>
                <Modal isOpen={isModalOn} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        <div style={{ fontSize: "25px", fontWeight: "bolder", color: "#57606f", }}>모아보기</div>
                    </ModalHeader>
                    <div class="dateSelect_body">
                        <div class="dateFrom">
                            <p style={{ fontSize: "20px", fontWeight: "bold", }}>From</p>
                            <div class="dateCollection_selectDate_wrap">
                                <div class="dateSelect_label">
                                    <label>년</label>
                                </div>
                                <div>
                                    <select id="fromYear" value={fromYear} onChange={e => setFromYear(e.currentTarget.value)}>
                                        <option selected>선택하세요</option>
                                        <option value="2020">2020년</option>
                                        <option value="2021">2021년</option>
                                        <option value="2022">2022년</option>
                                    </select>
                                </div>

                                <div class="dateSelect_label">
                                    <label>월</label>
                                </div>
                                <div>
                                    <select name="fromMonth" value={fromMonth} onChange={e => setFromMonth(e.currentTarget.value)}>
                                        {monthItems.map(({ label, value }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div class="dateSelect_label">
                                    <label>일</label>
                                </div>
                                <div>
                                    <select name="fromDate" value={fromDate} onChange={e => setFromDate(e.currentTarget.value)}> 
                                        {dateItems.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                                        
                        <hr style={{ marginTop: "20px", marginBottom: "20px", border: 0, borderTop: "1px dashed #424242", }} />

                        <div class="dateTo">
                            <p style={{ fontSize: "20px", fontWeight: "bold", }}>To</p>
                            <div class="dateCollection_selectDate_wrap">
                                <div class="dateSelect_label">
                                        <label>년</label>
                                </div>
                                <div>
                                    <select name="toYear" value={toYear} onChange={e => setToYear(e.currentTarget.value)}>
                                        <option selected>선택하세요</option>
                                        <option value="2020">2020년</option>
                                        <option value="2021">2021년</option>
                                        <option value="2022">2022년</option>
                                    </select>
                                </div>

                                <div class="dateSelect_label">
                                        <label>월</label>
                                </div>
                                <div>
                                    <select name="toMonth" value={toMonth} onChange={e => setToMonth(e.currentTarget.value)}>
                                        {monthItems.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div class="dateSelect_label">
                                        <label>일</label>
                                </div>
                                <div>
                                    <select name="toDate" value={toDate} onChange={e => setToDate(e.currentTarget.value)}>
                                        {dateItems.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ModalFooter>
                        <Button 
                            style={{ backgroundColor: "#6c5ce7", border: "none", }}
                            onClick={()=>{
                            setIsModalOn(!isModalOn);
                            setIsCollectionOn(!isCollectionOn);
                        }}>제출하기</Button>
                    </ModalFooter>
                    </Modal>
                    
                    {/* isCollectionOn 이 true 가 되면 Modal 사라지면서 모아보기 결과가 뜨도록 만들자 */}
                    <Modal isOpen={isCollectionOn} toggle={toggleCollection}>
                        <ModalHeader toggle={toggleCollection}>
                            <div style={{ fontSize: "25px", fontWeight: "bolder", color: "#57606f", }}>모아보기</div>
                        </ModalHeader>
                        <DateTable fromYear={fromYear} fromMonth={fromMonth} fromDate={fromDate} 
                                    toYear={toYear} toMonth={toMonth} toDate={toDate} />
                        <ModalFooter>
                            <Button style={{ backgroundColor: "#fe2e64", border: "none", }}onClick={()=>setIsCollectionOn(false)}>닫기</Button>
                        </ModalFooter>
                    </Modal>

                {data && <div style={{ margin: "4px"}}>
                    <Button style={{ border: "none", height: "36px", }} color="success" onClick={()=>loadMore()}>Load More</Button>
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

export default WestAuth;
