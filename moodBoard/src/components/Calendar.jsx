import { useState } from 'react';
import { 
  eachDayOfInterval, 
  subDays, 
  isSameDay, 
  isAfter, 
  format, 
  startOfWeek, 
  addDays 
} from 'date-fns';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import MoodSelector from './MoodSelector';
import { moodsConfig } from '../styles/themes';
import { motion } from 'framer-motion';
import ClearIcon from '@mui/icons-material/Clear';

const WeeklyCalendar = ({ moods, addMood, removeMood }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const theme = useTheme();

  // Get the current week starting from Monday
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  const handleDaySelection = (day) => {
    if (isAfter(day, today)) return;
    setSelectedDay(day);
    setShowMoodDialog(true);
  };

  const handleMoodSelection = (mood) => {
    addMood(selectedDay, mood);
    setShowMoodDialog(false);
  };

  const handleMoodDelete = (day, e) => {
    e.stopPropagation();
    removeMood(day);
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600,
        marginBottom: 2,
        color: theme.palette.text.primary
      }}>
        Your Weekly Mood
      </Typography>
      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: 2
      }}>
        {weekDays.map((day, index) => {
          const dayMood = moods.find(mood => isSameDay(mood.date, day))?.mood;
          const isFutureDay = isAfter(day, today);
          const moodData = dayMood ? moodsConfig[dayMood] : null;
          
          return (
            <motion.div
              key={day.toString()}
              whileHover={!isFutureDay ? { scale: 1.03 } : {}}
              whileTap={!isFutureDay ? { scale: 0.97 } : {}}
              onClick={() => handleDaySelection(day)}
            >
              <Box sx={{
                position: 'relative',
                padding: 2,
                borderRadius: 3,
                backgroundColor: moodData?.color || theme.palette.background.paper,
                color: moodData?.text || theme.palette.text.primary,
                cursor: isFutureDay ? 'default' : 'pointer',
                opacity: isFutureDay ? 0.6 : 1,
                textAlign: 'center',
                boxShadow: theme.shadows[1],
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.2s ease-out'
              }}>
                {/* Day number (1-7) */}
                <Typography variant="body2" sx={{ 
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  opacity: 0.7
                }}>
                  {index + 1}
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {format(day, 'EEE')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {format(day, 'd')}
                </Typography>
                {moodData && (
                  <>
                    <Typography variant="h4" sx={{ lineHeight: 1 }}>
                      {moodData.emoji}
                    </Typography>
                    {!isFutureDay && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleMoodDelete(day, e)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          color: moodData.text,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.2)'
                          }
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </>
                )}
                {!moodData && !isFutureDay && (
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Add mood
                  </Typography>
                )}
              </Box>
            </motion.div>
          );
        })}
      </Box>

      {showMoodDialog && (
        <MoodSelector
          onSelect={handleMoodSelection}
          onClose={() => setShowMoodDialog(false)}
        />
      )}
    </Box>
  );
};

export default WeeklyCalendar;