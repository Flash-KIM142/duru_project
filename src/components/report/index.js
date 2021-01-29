// 글쓰기 컴포넌트 // 롤링페이퍼 공지사항 형식 따라할 것 // 사실상 북지부 Report Form 돼버림
import React, { useState, useEffect, useReducer, useRef } from 'react';
import '../../index.css';
import ReportDataServiceTest from '../../services/reportServiceTest';

const pageLimit = 5;
const isInPage = (index, page) => {
    if ((page - 1) * pageLimit <= index && index < page * pageLimit)
        return true;
    else return false;
};


const Reports = ( {data} ) => {
  const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);
  // const [isUpdated,setIsUpdated] = useState(false);

  // useEffect(() => {
  //   let reports = [];
  //   ReportDataServiceTest.getAll().get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       let temp = doc.data();
  //       let id = doc.id;
  //       let date = temp.date.toDate();

  //       reports.push({
  //         name: temp.name,
  //         description: temp.description,
  //         year: date.getFullYear(),
  //         month: date.getMonth()+1,
  //         date: date.getDate(),
  //         id: id,
  //       })
  //     })
  //     setData(reports);
  //   })
  //   setIsUpdated(false);
  // }, [isUpdated])

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
  // const [reports, setReports] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  
  const removeReport = (id) => {
      ReportDataServiceTest.delete(id).then(()=>{
          setIsUpdated(true);
      }).catch((err)=>{
          console.log(err);
      })
  }
  
  useEffect(() => {
    setIsUpdated(false);
    console.log(isUpdated);
  }, [isUpdated])

  return (
      <>
          {!isClicked ? (
              <div
                  class="reportsContent"
                  onClick={() => setIsClicked(!isClicked)}
              >
                  <div class="reportsContentText">
                      <div class="reportsContentTextName">
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
                  onClick={() => setIsClicked(!isClicked)}
              >
                <div class="reportsContentText">
                    <div class="reportsContentTextName">
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
                        <button class="deleteBtn" 
                          onClick={() => {
                            console.log(isUpdated);
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


// const Reports = ( {data} ) => {
//   const [page, setPage] = useState(1);
//   const pageNumber = [];
//   for (let i = 1; i <= Math.ceil(data.length / pageLimit); i++) {
//       pageNumber.push(i);
//   }

//   return (
//     <>
//       <div class="reportsBody">
//         {data.map((value, key) => {
//             if(isInPage(key, page))
//               return <ReportsContent data={value} key={key} />;
//         })}
//       </div>
//       <ul class="pagination">
//           {pageNumber.map((pageNum) =>
//               pageNum === page ? (
//                   <li
//                       key={pageNum}
//                       class="paginationItemSelect"
//                       onClick={() => setPage(pageNum)}
//                   >
//                       {pageNum}
//                   </li>
//               ) : (
//                   <li
//                       key={pageNum}
//                       class="paginationItemNonSelect"
//                       onClick={() => setPage(pageNum)}
//                   >
//                       {pageNum}
//                   </li>
//               )
//           )}
//       </ul>
//     </>
//   )
// }