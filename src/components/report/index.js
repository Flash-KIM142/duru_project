// 글쓰기 컴포넌트 // 롤링페이퍼 공지사항 형식 따라할 것
import React, { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, Button, Input, InputGroup, Form, FormGroup, FormText, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Style from './styled';
import ReportDataService from '../../services/reportService';
import '../../index.css';

const Report = () => {
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [data,setData] = useState([]);
  const [isUpdated,setIsUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentReport,setCurrentReport] = useState(0);
  // const toggle = () => setIsOpen(!isOpen); 


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

  return(
    <>
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
                  <td class="description">
                    <Button color="primary" onClick={() => {
                      setIsOpen(!isOpen);
                      setCurrentReport(key);
                      // console.log(currentReport);
                      }}>펴기/접기</Button>
                      <Collapse isOpen={isOpen&&(currentReport==key)}>
                        <Card>
                          <CardBody>
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

export default Report;