import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'

const Quote = ({ theme }) => {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.quotable.io/random?tags=motivational|inspirational')
      const data = await response.json()
      setQuote({
        text: data.content,
        author: data.author,
      })
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote({
        text: "Every day may not be good, but there's something good in every day.",
        author: "Anonymous",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        p: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Daily Inspiration
      </Typography>
      {loading ? (
        <Typography>Loading wisdom...</Typography>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              position: 'relative',
              '&:before, &:after': {
                content: '"\\""',
                fontSize: '2rem',
                color: theme.primary,
                opacity: 0.3,
                position: 'absolute',
              },
              '&:before': {
                top: -15,
                left: -10,
              },
              '&:after': {
                bottom: -25,
                right: -10,
              },
            }}
          >
            {quote?.text}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'right',
              fontWeight: 500,
              color: theme.text,
              opacity: 0.8,
            }}
          >
            — {quote?.author}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="outlined"
              onClick={fetchQuote}
              sx={{
                color: theme.text,
                borderColor: theme.text,
                '&:hover': {
                  backgroundColor: theme.background,
                  borderColor: theme.text,
                },
              }}
            >
              New Quote
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Quote