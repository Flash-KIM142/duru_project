import React, { useState } from 'react';

const News = () => {
    const [page, setPage] = useState(1);
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(newsContent.length / pageLimit); i++) {
        pageNumber.push(i);
    }
    return (
        <div className="news">
            <div className="news-title">공지사항</div>
            <div className="news-list">
                {newsContent.map((data, i) => {
                    if (isInPage(i, page))
                        return <Content data={data} key={i} />;
                })}
            </div>
            <ul className="pagination">
                {pageNumber.map((pageNum) =>
                    pageNum === page ? (
                        <li
                            key={pageNum}
                            className="pagination-item-select"
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </li>
                    ) : (
                        <li
                            key={pageNum}
                            className="pagination-item-non-select"
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

const Content = ({ data }) => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            {!isClicked ? (
                <div
                    className="news-content"
                    onClick={() => setIsClicked(!isClicked)}
                >
                    <div className="news-content-text">
                        <div className="news-content-title">
                            <div>
                                <span>{data.title}</span>
                            </div>
                            <div className="news-content-btn">
                                <img
                                    className="news-content-btn-img"
                                    src="/index/open button.png"
                                    alt="닫혀있을때"
                                />
                            </div>
                        </div>
                        <div className="news-content-date">
                            <span>{data.date}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="news-content"
                    onClick={() => setIsClicked(!isClicked)}
                >
                    <div className="news-content-text">
                        <div className="news-content-title">
                            <div>
                                <span>{data.title}</span>
                            </div>
                            <div className="news-content-btn">
                                <img
                                    className="news-content-btn-img"
                                    src="/index/close button.png"
                                    alt="열려 있을때"
                                />
                            </div>
                        </div>
                        <div className="news-content-description">
                            <span>{data.description}</span>
                        </div>
                        <div className="news-content-date">
                            <span>{data.date}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const pageLimit = 5;
const isInPage = (index, page) => {
    if ((page - 1) * pageLimit <= index && index < page * pageLimit)
        return true;
    else return false;
};
const newsContent = [
    {
        title: '서비스 내 구글 광고 관련',
        date: '2020년 10월 10일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n사용자분들의 많은 관심과 응원 감사드립니다.\n현재 사용량이 폭등하여,\n서버비를 감당하기가 어려운 상황입니다.\n롤링페이퍼 서비스를 중단하지 않고 제공하기 위해\n광고를 삽입하게 되었습니다.\n광고가 여러분들의 서비스 사용에\n최대한 해가 되지 않도록 노력하겠습니다.\n여러분의 관심에 부응하기 위해 저희 왼손잡이들 팀이\n열심히 서비스 업데이트 작업을 진행하고 있습니다.\n과분한 관심 주신 만큼,\n최선을 다해 서비스를 발전시켜 나가겠습니다.',
    },
    {
        title: '사용자 개인정보에 관한 공지',
        date: '2020년 10월 3일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n지속적으로 늘어나는 악성 사용자와 게시물로 인하여\n사용자 개인정보 공유에 관한 질문이 급증하였습니다.\n현재 롤링페이퍼 측에서 따로 사용자 개인정보를 수집하고\n있지 않습니다. 현재 악성 사용자와 게시물을 대처하려\n노력과 개선 중에 있습니다. 불편을 드려 죄송합니다.\n감사합니다.',
    },
    {
        title: '사이트 오류 문제 해결',
        date: '2020년 10월 2일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n9월 27일부터 현재 10월 2일까지 지속적으로 발생하는\n사이트 오류 문제를 해결하였습니다.\n계속된 오류로 인해 사용에 있어 불편함을 드려 죄송합니다.\n계속해서 발전하는 롤링페이퍼가 되도록 하겠습니다.\n감사합니다.',
    },
    {
        title: '악성 사용자로 인한 삭제 기능 중단',
        date: '2020년 9월 30일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n현재 특정 사용자의 롤링페이퍼에 접근하여 무작위로\n삭제를 하는 악성 사용자들이 늘어나고 있습니다.\n단기적으로 삭제 문제를 해결하기 위해\n삭제 기능을 잠시 중단하게 되었습니다.\n게시글 복구 또는 삭제를 원하실 경우, \n메일 또는 트위터 쪽지를 통해 문의바랍니다.\n감사합니다.',
    },
    {
        title: '롤링페이퍼 사용 방법 안내',
        date: '2020년 9월 29일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n롤링페이퍼 사용 방법에 관해 안내 드립니다.\n1. https://rollingpaper.site 사이트에 접속.\n2. 롤링페이퍼 만들기 > 이름과 신호(비밀번호) 입력\n3. 생성 완료 > 롤링페이퍼 작성\n4. 함께 작성할 사람에게 공유할 경우,\n함께 준비하는 사람들에게 공유 선택 (삭제 기능 있음)\n5. 롤링페이퍼를 받는 사람에게 공유할 경우,\n주인공에게 공유 선택 (삭제 기능 없음)',
    },
    {
        title: '트위터 롤링페이퍼 공식 계정',
        date: '2020년 9월 27일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n트위터에 롤링페이퍼 서비스 공식 계정을 개설하였습니다!\n아이디는 @Group_Paper_R 으로\n롤링페이퍼 사이트 뿐만 아니라 트위터를 통해서\n많은 의견과 문의 주시기 바랍니다.\n감사합니다.',
    },
    {
        title: '롤링페이퍼를 방문해주셔서 감사합니다!',
        date: '2020년 9월 27일',
        description:
            '안녕하세요. 롤링페이퍼 관리자입니다.\n롤링페이퍼 사이트에 방문해주셔서 감사합니다.\n저희 서비스는 한 사람을 위해 여러 사람이 감사 또는 격려의 \n따뜻한 한마디를 전하는 롤링페이퍼 편지에서 시작되었습니다.\n직접 손으로 작성하고 꾸며서 전달하던 종이 롤링페이퍼를\n온라인에서 간단한 에디트 기능으로 언제 어디에서나 쉽고\n빠르게 작성하여 마음을 전달할 수 있는 서비스입니다.\n많은 사랑과 관심 부탁드립니다. 감사합니다. ',
    },
];
export default News;