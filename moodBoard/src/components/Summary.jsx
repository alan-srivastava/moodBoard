import { Box, Typography, LinearProgress } from '@mui/material';
import { subDays } from 'date-fns';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const moodImpactValues = { happy: 2, neutral: 1, sad: -1 };

const MoodSummary = ({ moods = [], theme = {} }) => {
  // Provide default theme values if not passed
  const safeTheme = {
    background: theme.background || '#f8fafc',
    happy: theme.happy || '#10b981',
    neutral: theme.neutral || '#f59e0b',
    sad: theme.sad || '#ef4444',
    palette: theme.palette || {
      background: { paper: '#ffffff' },
      action: { hover: '#f1f5f9' },
      text: { primary: '#334155' },
      grey: { 200: '#e2e8f0' }
    }
  };

  const recentMoods = moods.filter(mood => 
    mood.date >= subDays(new Date(), 7)
  );

  const moodDistribution = recentMoods.reduce((stats, { mood }) => {
    stats[mood] = (stats[mood] || 0) + 1;
    return stats;
  }, { happy: 0, neutral: 0, sad: 0 });

  const totalRecordedDays = recentMoods.length;
  const moodScore = recentMoods.reduce(
    (total, { mood }) => total + moodImpactValues[mood],
    0
  );

  const getMoodAssessment = (score) => {
    if (score > 3) return {
      message: "You've had a wonderful week!",
      emoji: "😊"
    };
    if (score > 0) return {
      message: "Your week has been balanced",
      emoji: "🙂"
    };
    return {
      message: "Every week has its challenges",
      emoji: "🤗"
    };
  };

  const assessment = getMoodAssessment(moodScore);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Box sx={{
        backgroundColor: safeTheme.palette.background.paper,
        borderRadius: 3,
        padding: 3,
        boxShadow: 2
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          marginBottom: 2
        }}>
          Weekly Insights
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 500,
            marginBottom: 1
          }}>
            Mood Distribution
          </Typography>
          
          {Object.entries(moodDistribution).map(([mood, count]) => (
            <Box key={mood} sx={{ 
              display: 'flex',
              alignItems: 'center',
              marginBottom: 1
            }}>
              <Typography sx={{ 
                minWidth: 80,
                textTransform: 'capitalize',
                fontWeight: 500
              }}>
                {mood}:
              </Typography>
              <LinearProgress
                variant="determinate"
                value={totalRecordedDays ? (count / totalRecordedDays) * 100 : 0}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  flexGrow: 1,
                  backgroundColor: safeTheme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: safeTheme[mood],
                    borderRadius: 4
                  }
                }}
              />
              <Typography sx={{ 
                minWidth: 30,
                textAlign: 'right',
                fontWeight: 600
              }}>
                {count}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{
          backgroundColor: safeTheme.palette.action.hover,
          borderRadius: 2,
          padding: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Weekly Mood Score: {moodScore}
          </Typography>
          <Typography variant="h4" sx={{ 
            marginY: 1,
            fontWeight: 700,
            color: safeTheme.palette.text.primary
          }}>
            {assessment.emoji}
          </Typography>
          <Typography variant="body2">
            {assessment.message}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

MoodSummary.propTypes = {
  moods: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    mood: PropTypes.oneOf(['happy', 'neutral', 'sad']).isRequired
  })),
  theme: PropTypes.shape({
    background: PropTypes.string,
    happy: PropTypes.string,
    neutral: PropTypes.string,
    sad: PropTypes.string,
    palette: PropTypes.shape({
      background: PropTypes.shape({
        paper: PropTypes.string
      }),
      action: PropTypes.shape({
        hover: PropTypes.string
      }),
      text: PropTypes.shape({
        primary: PropTypes.string
      }),
      grey: PropTypes.object
    })
  })
};

MoodSummary.defaultProps = {
  moods: [],
  theme: {}
};

export default MoodSummary;