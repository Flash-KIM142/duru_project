// 글쓰기 컴포넌트 // 롤링페이퍼 공지사항 형식 따라할 것 // 사실상 북지부 Report Form 돼버림
import React, { useState, useEffect, useReducer } from 'react';
import '../../index.css';
import { Modal, ModalHeader, ModalFooter, Input, Button,} from 'reactstrap';
import ReportDataServiceTest from '../../services/reportServiceTest';
import ReportDataService from "../../services/reportService";
import ReportDataServiceWest from "../../services/reportServiceWest";
import ReportDataServiceSouth from "../../services/reportServiceSouth";
import firebase from "../../firebase";
import reportServiceTest from '../../services/reportServiceTest';

const pageLimit = 5;
const isInPage = (index, page) => {
    if ((page - 1) * pageLimit <= index && index < page * pageLimit)
        return true;
    else return false;
};

const Reports = ( {data} ) => {
    const [page, setPage] = useState(1);
  
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(data.length / pageLimit); i++) {
        pageNumber.push(i);
    }
  
    return (
      <>
        <div class="reportsBody">
          {data.map((value, key) => {
              if(isInPage(key, page))
                return <ReportsContent data={value} key={key} />;
          })}
        </div>
        <ul class="pagination">
            {pageNumber.map((pageNum) =>
                pageNum === page ? (
                    <li
                        key={pageNum}
                        class="paginationItemSelect"
                        onClick={() => setPage(pageNum)}
                    >
                        {pageNum}
                    </li>
                ) : (
                    <li
                        key={pageNum}
                        class="paginationItemNonSelect"
                        onClick={() => setPage(pageNum)}
                    >
                        {pageNum}
                    </li>
                )
            )}
        </ul>
      </>
    )
  }

const ReportsContent = ( {data} ) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isEditOn, setIsEditOn] = useState(false);
    const toggleEdit = () => setIsEditOn(!isEditOn);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const removeReport = (id) => {
        if(data.campus==="test"){
            ReportDataServiceTest.delete(id).then(()=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="north"){
            ReportDataService.delete(id).then(()=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="west"){
            ReportDataServiceWest.delete(id).then(()=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="south"){
            ReportDataServiceSouth.delete(id).then(()=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    const editReport = (id) => {
        if(data.campus==="test"){
            reportServiceTest.update(id, {
                name: name,
                description: description,
            }).then(()=>{
                setName('');
                setDescription('');
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="north"){
            ReportDataService.update(id, {
                name: name,
                description: description,
            }).then(()=>{
                setName('');
                setDescription('');
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="west"){
            ReportDataServiceWest.update(id, {
                name: name,
                description: description,
            }).then(()=>{
                setName('');
                setDescription('');
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
        else if(data.campus==="south"){
            ReportDataServiceSouth.update(id, {
                name: name,
                description: description,
            }).then(()=>{
                setName('');
                setDescription('');
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <>
            {!isClicked ? (
                <div
                    class="reportsContent"
                    // onClick={() => setIsClicked(!isClicked)}
                >
                    <div class="reportsContentText">
                        <div class="reportsContentTextName" onClick={() => setIsClicked(!isClicked)}>
                            <div>
                                <span style={{ fontWeight: "500", fontSize: "25px",}}>{data.name}</span>
                            </div>
                            <div class="reportsContentBtn">
                                <img
                                    class="reportsContentBtnImg"
                                    src="/downArrow.png"
                                    alt="닫혀있을때"
                                />
                            </div>
                        </div>
                        <div class="reportsContentDate">
                            <span>{data.year}년 {data.month}월 {data.date}일</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    class="reportsContent"
                    // onClick={() => setIsClicked(!isClicked)}
                >
                  <div class="reportsContentText">
                      <div class="reportsContentTextName" onClick={() => setIsClicked(!isClicked)}>
                          <div>
                              <span style={{ fontWeight: "500", fontSize: "25px", }}>{data.name}</span>
                          </div>
                          <div class="reportsContentBtn">
                              <img
                                  class="reportsContentBtnImg"
                                  src="/upArrow.png"
                                  alt="열려 있을때"
                              />
                          </div>
                      </div>
                      <div class="reportsContentDescription">
                          {data.description}
                      </div>
                      <div class="reportsContentDate">
                          <span>{data.year}년 {data.month}월 {data.date}일</span>
                          <button class="editBtn" onClick={() => {
                            setIsEditOn(true);
                            setName(data.name);
                            setDescription(data.description);
                        }}>수정</button>
                            <Modal isOpen={isEditOn} toggle={toggleEdit}>
                                <ModalHeader toggle={toggleEdit}>수정하기</ModalHeader>
                                <div style={{ padding: "10px", }}>
                                    <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto", marginBottom: "5px", }} 
                                            value = {name} 
                                            // placeholder={data.name}
                                            onChange = {e=>setName(e.target.value)}></Input>
                                    <Input style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }} 
                                            type="textarea" rows="6" 
                                            value = {description} 
                                            placeholder ={data.description}
                                            onChange = {e=>setDescription(e.target.value)}></Input>
                                </div>
                                <ModalFooter>
                                    <button class="btn" style={{ backgroundColor: "#00a8ff", color: "white",  }} onClick={()=>{
                                        if(name.length<2 || description.length<3){
                                            alert('이름 또는 내용을 입력하지 않으셨습니다.');
                                        }
                                        else{
                                            editReport(data.id)
                                            alert('성공적으로 수정됐습니다!');
                                            toggleEdit();
                                        }
                                        }}>제출</button>
                                </ModalFooter>
                            </Modal>

                          <button class="deleteBtn" 
                            onClick={() => {
                              if(window.confirm('정말 삭제하시겠습니까?')===true){
                                removeReport(data.id);
                              }
                              else{
                                return false;
                              }
                            }}>삭제</button>
                      </div>
                  </div>
                </div>
            )}
        </>
    );
  };


export default Reports;

// const ReportsContent = ( {data} ) => {
//     const [isClicked, setIsClicked] = useState(false);
//     const [isUpdated, setIsUpdated] = useState(false);
    
//     const removeReport = (id) => {
//         ReportDataServiceTest.delete(id).then(()=>{
//             setIsUpdated(true);
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }
    
//     useEffect(() => {
//       setIsUpdated(false);
//     //   console.log(isUpdated);
//     }, [isUpdated])
  
//     return (
//         <>
//             {!isClicked ? (
//                 <div
//                     class="reportsContent"
//                     onClick={() => setIsClicked(!isClicked)}
//                 >
//                     <div class="reportsContentText">
//                         <div class="reportsContentTextName">
//                             <div>
//                                 <span style={{ fontWeight: "500", fontSize: "25px",}}>{data.name}</span>
//                             </div>
//                             <div class="reportsContentBtn">
//                                 <img
//                                     class="reportsContentBtnImg"
//                                     src="/downArrow.png"
//                                     alt="닫혀있을때"
//                                 />
//                             </div>
//                         </div>
//                         <div class="reportsContentDate">
//                             <span>{data.year}년 {data.month}월 {data.date}일</span>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div
//                     class="reportsContent"
//                     onClick={() => setIsClicked(!isClicked)}
//                 >
//                   <div class="reportsContentText">
//                       <div class="reportsContentTextName">
//                           <div>
//                               <span style={{ fontWeight: "500", fontSize: "25px", }}>{data.name}</span>
//                           </div>
//                           <div class="reportsContentBtn">
//                               <img
//                                   class="reportsContentBtnImg"
//                                   src="/upArrow.png"
//                                   alt="열려 있을때"
//                               />
//                           </div>
//                       </div>
//                       <div class="reportsContentDescription">
//                           {data.description}
//                       </div>
//                       <div class="reportsContentDate">
//                           <span>{data.year}년 {data.month}월 {data.date}일</span>
//                           <button class="deleteBtn" 
//                             onClick={() => {
//                               console.log(isUpdated);
//                               if(window.confirm('정말 삭제하시겠습니까?')===true){
//                                 removeReport(data.id);
//                               }
//                               else{
//                                 return false;
//                               }
//                             }}>삭제</button>
//                       </div>
//                   </div>
//                 </div>
//             )}
//         </>
//     );
//   };