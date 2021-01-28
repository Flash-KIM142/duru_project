// 글쓰기 컴포넌트 // 롤링페이퍼 공지사항 형식 따라할 것 // 사실상 북지부 Report Form 돼버림
import React, { useState } from 'react';
import '../../index.css';

const Reports = ( {data} ) => {

  return (
    <>
      <div class="reportsBody">
        {data.map((value, key) => {
          return <ReportsContent data={value} key={key} />;
        })}
      </div>
    </>
  )
}

const ReportsContent = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
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
                    </div>
                </div>
              </div>
          )}
      </>
  );
};

export default Reports;