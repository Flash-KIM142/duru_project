// 북지부 화면에서 관리자 누르면 들어오게 되는 곳
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { Button, Input, Form, FormGroup, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import ReportDataServiceTest from '../../services/reportServiceTest';
import * as S from '../main/styled';
import firebase from "../../firebase";
import '../../index.css';
import logo from "../flash.png";
import DateTable from '../../components/dateCollection';
import Reports from '../../components/report';
import Notice from '../../components/notice';

const Test = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [data,setData] = useState([]);
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

    const addReport = () => {
        const date = new Date();
        ReportDataServiceTest.create({
            name: name,
            description: description,
            date: date,
            campus: "test",
        }).then(()=>{
            setIsUpdated(true);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const removeReport = (id) => {
        ReportDataServiceTest.delete(id).then(()=>{
            setIsUpdated(true);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const editReport = (id) => {
        ReportDataServiceTest.update(id,{
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
        firebase.collection('Test').orderBy("date", "desc")
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
            // console.log(reports);
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
                <div style={{ fontSize: "15px", fontWeight: "400", color: "#0080FF", marginTop: "5px", }}>dev page</div>
            </div>

            <Form style={{ marginTop:"10px"}}>
                <FormGroup>
                <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                        value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
                <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
                        type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
                </FormGroup>
                <div style={{width:"95%",margin:'0 auto',textAlign:'right'}}>
                    <Button 
                        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }}     
                        onClick={()=>{
                            if(name.length<2 || description.length<3){
                                alert('이름 또는 내용을 입력하지 않으셨습니다.');
                            }
                            else{
                                alert('성공적으로 제출됐습니다!'); addReport();
                            }
                            }}>제출</Button>
                </div>
            </Form>

            {loading && <div style={{ width: "95%", marginTop: "20px", marginLeft: "auto", marginRight: "auto",  textAlign: "center", fontWeight: "bold"}}>Loading...</div>}

            {/* 개별로 펼쳐지게 만들 table */}
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
                    <div style={{ paddingRight: "20px", float: "right", display: "inline-block", }}>
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
                    </Modal>
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

export default Test;

// {!loading && <Form style={{ marginTop:"10px"}}>
// <Table style={{ marginTop: "30px" }}>
// <thead>
//     <tr>
//         <th class="name">이름</th>
//         <th class="description">내용</th>
//         {!hideDate && <th class="date">날짜</th>}
//     </tr>
// </thead>
// <tbody>
//     {data&&
//     data.map((value,key)=>
//     (
//         <tr key={key}>
//         <td class="name">{value.name}</td>
//         <td class="description">
//             <Button color="primary" 
//                 style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
//                 onClick={() => {
//                     setHideDate(!hideDate);
//                     setIsOpen(!isOpen);
//                     console.log(value);
//                     // console.log(isOpen);
//                     setCurrentReport(key);
//                     // console.log(currentReport);
//                     }}>펴기/접기</Button>
//             <Collapse isOpen={isOpen&&(currentReport===key)}>
//             {/* <Collapse isOpen={value.isOpen}> */}
//                     <div class="cardBody">
//                         {value.description}
//                     </div>
//                 <div style={{marginTop:'5px', marginLeft:'2px', textAlign:'right'}}>
//                 <Button color='info' 
//                     style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
//                     onClick={()=>{
//                         setEditOn(!editOn);
//                         setCurrentReport(key);
//                         }}>수정</Button>
//                         <Modal isOpen={editOn&&(currentReport===key)} toggle={toggle}>
//                             <ModalHeader toggle={toggle}>수정하기</ModalHeader>
//                             <ModalBody>
//                                 <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
//                                         value = {name} placeholder={value.name}
//                                         onChange = {e=>setName(e.target.value)}></Input>
//                                 <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
//                                         type="textarea" rows="6" value = {description} placeholder={value.description}
//                                         onChange = {e=>setDescription(e.target.value)}></Input>
//                             </ModalBody>
//                             <ModalFooter>
//                                 <Button color= 'primary' onClick={()=>{
//                                 editReport(value.id);
//                                 setEditOn(!editOn);
//                                 }}>수정완료</Button>
//                             </ModalFooter>
//                             </Modal>
//                             <Button color='danger' 
//                                 style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", border: "0.5px solid #D8D8D8", }} 
//                                 onClick={()=>{
//                                     if(window.confirm('정말 삭제하시겠습니까?')===true){
//                                         removeReport(value.id);
//                                     }
//                                     else{
//                                         return false;
//                                     }
//                                 }}>삭제</Button>
//                 </div>
//             </Collapse>
//         </td>
//         {!hideDate && <td class="date" style={{ fontSize:'smaller' }}>{value.year}년 <br/>{value.month}월 {value.date}일</td>}
//         </tr>
//     ))}
// </tbody>
// </Table>



// const [limit, setLimit] = useState(5);
// const loadMore = () => {
//     let nextReports = [];
//     firebase.collection('Test').orderBy("date","desc").limit(limit+5).get().then((querySnapshot)=>{
//         querySnapshot.docs.forEach((doc)=>{
//             let temp = doc.data();
//             let id = doc.id;
//             let date = temp.date.toDate();

//             nextReports.push({
//                 name: temp.name,
//                 description: temp.description,
//                 year: date.getFullYear(),
//                 month: date.getMonth()+1,
//                 date: date.getDate(),
//                 id: id,
//                 isOpen: temp.isOpen,
//             })
//         })
//         setData(nextReports);
//         setLimit(c => c+5);
//     })
// }