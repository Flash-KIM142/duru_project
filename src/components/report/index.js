// 글쓰기 컴포넌트 // 롤링페이퍼 공지사항 형식 따라할 것 // 사실상 북지부 Report Form 돼버림
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Style from './styled';
import { BrowserRouter, Route, Link, Switch, } from "react-router-dom"
import ReportDataService from '../../services/reportService';
import '../../index.css';
import firebase from "../../firebase";

const Report = () => {
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

  const removeReport = (id) => {
    ReportDataService.delete(id).then(()=>{
      // console.log("Document successfully deleted!");
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
    ReportDataService.getAll().get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
      let temp = doc.data();
      let id  = doc.id;
      let date = temp.date.toDate();
      // console.log(typeof(date));
      reports.push({
        name: temp.name,
        description: temp.description,
        year: date.getFullYear(),
        month: date.getMonth()+1,
        date: date.getDate(),
        hrs: date.getHours(), // hrs, mins, secs 는 필요없어졌다.
        mins: date.getMinutes(),
        secs: date.getSeconds(),
        id: id,
      });
    });
    console.log(reports.length); // pagiNation 위해서 현재 몇 개 글이 있는지 알려주기
    setData(reports);
    })
  }

    setName('');
    setDescription('');
    getReport();
    setIsUpdated(false);
  },[isUpdated])

  return(
    <>
      <Form style={{ marginTop:"10px"}}>
        <FormGroup>
          <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} value = {name} placeholder="이름" onChange = {e=>setName(e.target.value)}/>
          <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} type="textarea" rows="6" value = {description} placeholder="내용을 입력해주세요." onChange = {e=>setDescription(e.target.value)}/>
        </FormGroup>
        <div style={{width:"95%",margin:'0 auto',textAlign:'right'}}>
          {/* <Button color='success' onClick={()=>alert('현재 준비 중인 기능입니다.')}>관리자</Button> */}
          <Link to="/northAuth">
            <Button color='success' onClick={()=>{
                alert('관리자 페이지로 이동합니다.');
              }}>관리자</Button>
          </Link>
          <Button onClick={()=>{alert('성공적으로 제출됐습니다!'); addReport();}}>제출</Button>
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
              data.map((v,index)=>
              (
                <tr key={index}>
                  <td class="name">{v.name}</td>
                  <td class="description">
                    <Button color="primary" onClick={() => {
                      setIsOpen(!isOpen);
                      setCurrentReport(index);
                      // console.log(currentReport);
                      }}>펴기/접기</Button>
                      <Collapse isOpen={isOpen&&(currentReport==index)}>
                        <Card>
                          <CardBody>
                            <div class="cardBody">
                              {v.description}
                            </div>
                          </CardBody>
                        </Card>
                        <div style={{marginTop:'5px', marginLeft:'2px', textAlign:'right'}}>
                          <Button color='info' onClick={()=>{
                              setEditOn(!editOn);
                              setCurrentReport(index);
                            }}>수정</Button>
                              <Modal isOpen={editOn&&(currentReport==index)} toggle={toggle}>
                                  <ModalHeader toggle={toggle}>수정하기</ModalHeader>
                                  <ModalBody>
                                    <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
                                            value = {name} placeholder={v.name} 
                                            onChange = {e=>setName(e.target.value)}></Input>
                                    <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
                                            type="textarea" rows="6" value = {description} placeholder={v.description}
                                            onChange = {e=>setDescription(e.target.value)}></Input>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color= 'primary' onClick={()=>{
                                      editReport(v.id);
                                      setEditOn(!editOn);
                                    }}>수정완료</Button>
                                  </ModalFooter>
                                </Modal>
                          <Button color='danger' onClick={()=>removeReport(v.id)}>삭제</Button>
                        </div>
                      </Collapse>
                    </td>
                    <td class="date" style={{ fontSize:'smaller' }}>{v.year}년 <br/>{v.month}월 {v.date}일</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{ textAlign:"center" }}>
          {/* <Button onClick={()=>loadMore()}>Load More</Button> */}
        </div>
      </Form>
    </>
  );
};

export default Report;