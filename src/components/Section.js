import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import ChatBanner from './messages/ChatBanner';

const Wrapper = styled.div`
  /* border: 3px solid red; */
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export default function Section() {
  return (
    <Wrapper>
      <ChatBanner />
      <Outlet />
    </Wrapper>
  );
}
