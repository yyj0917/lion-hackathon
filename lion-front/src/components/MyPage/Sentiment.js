import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Meh, Frown, Book, Laugh } from 'lucide-react'; // 감정 아이콘
import { fetchPrivateDiaryEntry } from '../../api/privateDiary';
import '../../styles/custom-calendar.css'; // 추가적인 스타일링을 위한 CSS
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const emotionIcons = {
  positive: <Laugh size={22} style={{ color: '#f44336' }} />,
  neutral: <Meh size={22} style={{ color: '#f44336' }} />,
  negative: <Frown size={22} style={{ color: '#f44336' }} />,
};
const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

function Sentiment() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await fetchPrivateDiaryEntry(); // API 호출
        const entriesData = {};
        response.forEach((entry) => {
          entriesData[new Date(entry.date).toDateString()] = {
            diary_id: entry.id,
            sentiment: entry.sentiment,
          };
        });
        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };
    fetchDiaryEntries();
  }, []);

  const handleDateClick = (value) => {
    const dateKey = value.toDateString();
    if (entries[dateKey]) {
      navigate(`/mypage/privateDiary/${entries[dateKey].diary_id}`);
    } else {
      alert('작성된 일기가 없습니다.');
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && entries[date.toDateString()]) {
      return 'highlight-tile'; // 스타일을 적용할 클래스 이름
    }
  };
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const entry = entries[date.toDateString()];
      if (entry) {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '60px',
              position: 'absolute',
            }}
          >
            {emotionIcons[entry.sentiment]}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Wrapper>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Calendar
          onClickDay={handleDateClick}
          value={date}
          tileClassName={tileClassName}
          tileContent={tileContent}
          className="custom-calendar"
        />
      </div>
    </Wrapper>
  );
}

export default Sentiment;
