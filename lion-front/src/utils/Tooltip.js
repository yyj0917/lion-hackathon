import React from "react";
import styled from "styled-components";

const Tooltip = ({ text }) => {
  return <TooltipContainer>{text}</TooltipContainer>;
};

const TooltipContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  top: -35px; /* 조정 필요 */
  left: 50%; /* 조정 필요 */
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1000;
`;
export default Tooltip;
