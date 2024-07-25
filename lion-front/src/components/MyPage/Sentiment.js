import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Smile, Meh, Frown } from 'lucide-react'; // 감정 아이콘

const emotionIcons = {
  happy: <Smile style={{ color: '#f44336' }} />,
  neutral: <Meh style={{ color: '#f44336' }} />,
  sad: <Frown style={{ color: '#f44336' }} />,
};

const Sentiment = () => {
  const [date, setDate] = useState(new Date());
  const [emotions, setEmotions] = useState({});

  const handleDateClick = (value) => {
    const emotion = prompt('Enter your emotion (happy, neutral, sad):');
    if (emotionIcons[emotion]) {
      setEmotions({
        ...emotions,
        [value.toDateString()]: emotion,
      });
    } else {
      alert('Invalid emotion. Please enter "happy", "neutral", or "sad".');
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const emotion = emotions[date.toDateString()];
      if (emotion) {
        return <div style={{ marginTop: '10px' }}>{emotionIcons[emotion]}</div>;
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px'}}>
      <h2>My Emotion Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={date}
        tileContent={tileContent}
      />
      {date && (
        <div style={{ marginTop: '20px' }}>
          <h3>{date.toDateString()}</h3>
          <p>Emotion: {emotions[date.toDateString()] || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default Sentiment;
