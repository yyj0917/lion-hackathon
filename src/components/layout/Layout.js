import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainHeader from './MainHeader';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
// Layout component
function Layout({ children }) {
  return (
    <>
      <HeaderWrapper>
        <MainHeader />
      </HeaderWrapper>
      {children}
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
