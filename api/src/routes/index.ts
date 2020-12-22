import express from 'express'
import costCenter from './costCenter'

const router = express.Router()

router.get('/', (_req,res) => {
  res.send('pong!')
})

router.use('/cc', costCenter)

export default router