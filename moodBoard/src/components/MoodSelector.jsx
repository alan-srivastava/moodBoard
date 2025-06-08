import { Box, Typography, Dialog, DialogContent, IconButton } from '@mui/material'
import { moodsConfig } from '../styles/themes'
import { motion } from 'framer-motion'

const MoodSelector = ({ onSelect, onClose }) => {
  return (
    <Dialog 
      open 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h6" gutterBottom textAlign="center" sx={{ fontWeight: 600 }}>
          How are you feeling today?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            py: 3,
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(moodsConfig).map(([mood, config]) => (
            <Box
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={mood}
              onClick={() => onSelect(mood)}
              sx={{
                width: 80,
                height: 80,
                backgroundColor: config.color,
                color: config.text,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexDirection: 'column',
                boxShadow: 2,
              }}
            >
              <Typography variant="h3" sx={{ lineHeight: 1 }}>
                {config.emoji}
              </Typography>
              <Typography variant="caption" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                {mood}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default MoodSelector