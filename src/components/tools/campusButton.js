// 각 지부별 버튼으로 쓰려고 만들었는데 main에 있는 styled.js 의 styledButton 이 더 나아서 얘 안씀 // 결론: 안 씀
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  

  /* 크기 */
  height: 6rem;
  font-size: 3rem;

  /* 색상 */
  background: black;
  &:hover {
    background: #808e9b;
  }
  &:active {
    background: #84817a;
  }

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function CampusButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default CampusButton;