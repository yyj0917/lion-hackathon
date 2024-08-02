import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SideBar = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryButton = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? '#007BFF' : '#fff')};
  color: ${(props) => (props.checked ? '#fff' : '#000')};
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.checked ? '#0056b3' : '#f0f0f0')};
  }

  input {
    display: none;
  }

  img {
    margin-right: 10px;
  }
`;

function CategorySidebar({ selectedCategories, onCategoryChange }) {
  const categories = [
    { id: '전체', name: '전체' },
    { id: '정신건강', name: '정신건강', icon: 'path/to/icon1' },
    { id: '직업적 스트레스', name: '직업적 스트레스', icon: 'path/to/icon2' },
    { id: '신체건강', name: '신체건강', icon: 'path/to/icon3' },
    { id: '대인관계', name: '대인관계', icon: 'path/to/icon4' },
    { id: '기타', name: '기타', icon: 'path/to/icon5' },
  ];

  return (
    <SideBar>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          checked={selectedCategories.includes(category.id)}
        >
          <input
            type="radio"
            value={category.id}
            checked={selectedCategories.includes(category.id)}
            onChange={onCategoryChange}
          />
          {category.name}
        </CategoryButton>
      ))}
    </SideBar>
  );
}
// PropType 정의
CategorySidebar.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
export default CategorySidebar;
