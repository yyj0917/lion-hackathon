import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Smile, Meh, Frown, Book } from 'lucide-react'; // 감정 아이콘
import { fetchPrivateDiaryEntry } from '../../api/privateDiary';
import '../../styles/custom-calendar.css'; // 추가적인 스타일링을 위한 CSS
import { useNavigate } from 'react-router-dom';

const emotionIcons = {
  positive: <Smile style={{ color: '#f44336' }} />,
  neutral: <Meh style={{ color: '#f44336' }} />,
  negative: <Frown style={{ color: '#f44336' }} />,
};

const Sentiment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await fetchPrivateDiaryEntry(); // API 호출
        const data = response;
        const entriesData = {};
        data.forEach(entry => {
          entriesData[new Date(entry.date).toDateString()] = {
            diary: entry.diary,
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
    setSelectedDate(value);
  };
  

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const entry = entries[date.toDateString()];
      if (entry) {
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '55px',
            position: 'absolute'}}>
            <Book style={{color: '#3f51b5' }} />
            {emotionIcons[entry.sentiment]}
          </div>
        );
      }
    }
    return null;
  };
  // font-family: 'Courier New', Courier, monospace;

  const selectedEntry = entries[selectedDate?.toDateString()];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
      <h2 style={{fontFamily: 'Courier New'}}>My Emotion Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={date}
        tileContent={tileContent}
        className={'custom-calendar'}
      />
      {selectedDate && (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
          {selectedEntry ? (
            <div>
              <p>{selectedEntry.diary}</p>
              <div>{emotionIcons[selectedEntry.emotion]}</div>
            </div>
          ) : (
            <p>No diary entry for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sentiment;
