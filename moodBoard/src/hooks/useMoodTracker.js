import { useState, useEffect } from 'react';
import { isSameDay, subDays, parseISO, formatISO, startOfWeek, addDays } from 'date-fns';

const useMoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [prevailingMood, setPrevailingMood] = useState('neutral');

  // Initialize with saved moods
  useEffect(() => {
    const storedMoods = localStorage.getItem('moodRecords');
    if (storedMoods) {
      try {
        const parsedMoods = JSON.parse(storedMoods).map(entry => ({
          ...entry,
          date: parseISO(entry.date)
        }));
        setMoodEntries(parsedMoods);
      } catch (error) {
        console.error('Error parsing mood data:', error);
      }
    }
  }, []);

  // Update storage when moods change
  useEffect(() => {
    const serializedMoods = moodEntries.map(entry => ({
      ...entry,
      date: formatISO(entry.date, { representation: 'date' })
    }));
    localStorage.setItem('moodRecords', JSON.stringify(serializedMoods));
    updatePrevailingMood();
  }, [moodEntries]);

  const updatePrevailingMood = () => {
    const weekAgo = subDays(new Date(), 7);
    const recentMoods = moodEntries.filter(entry => entry.date >= weekAgo);
    
    const moodFrequency = recentMoods.reduce((acc, { mood }) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, { happy: 0, neutral: 0, sad: 0 });

    const [dominant] = Object.entries(moodFrequency).reduce(
      (max, entry) => entry[1] > max[1] ? entry : max,
      ['neutral', 0]
    );
    
    setPrevailingMood(dominant);
  };

  const recordMood = (date, mood) => {
    setMoodEntries(prevEntries => {
      const existingIndex = prevEntries.findIndex(entry => 
        isSameDay(entry.date, date)
      );
      
      if (existingIndex >= 0) {
        const updated = [...prevEntries];
        updated[existingIndex] = { date, mood };
        return updated;
      }
      return [...prevEntries, { date, mood }];
    });
  };

  const removeMood = (date) => {
    setMoodEntries(prevEntries => 
      prevEntries.filter(entry => !isSameDay(entry.date, date))
    );
  };

  const getMoodForDate = (date) => {
    return moodEntries.find(entry => isSameDay(entry.date, date))?.mood;
  };

  return { 
    moods: moodEntries, 
    addMood: recordMood, 
    removeMood,
    getMoodForDate, 
    dominantMood: prevailingMood 
  };
};

export default useMoodTracker;