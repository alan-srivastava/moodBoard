import { useState, useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Calendar from './components/Calendar'
import Summary from './components/Summary'
import Quote from './components/Quote'
import useMoodTracker from './hooks/useMoodTracker'
import { themes } from './styles/themes'
import { motion } from 'framer-motion'

function App() {
  const { moods, addMood, removeMood, dominantMood } = useMoodTracker()
  const [currentTheme, setCurrentTheme] = useState(themes.neutral)
  const isMobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    setCurrentTheme(themes[dominantMood] || themes.neutral)
  }, [dominantMood])

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${currentTheme.background} 0%, ${currentTheme.backgroundSecondary} 100%)`,
        color: currentTheme.text,
        transition: 'all 0.5s ease',
        padding: isMobile ? 2 : 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ textAlign: 'center', marginBottom: 0 }}
        >
          MoodBoard
        </motion.h1>
        <Calendar moods={moods} addMood={addMood} removeMood={removeMood} />
        <Summary moods={moods} theme={currentTheme} />
        <Quote theme={currentTheme} />
      </Box>
    </Box>
  )
}

export default App