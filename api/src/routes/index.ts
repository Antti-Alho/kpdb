import express from 'express'
import inventoryChangeController from '../controllers/inventoryChangeController'
import cards from './cards'

const router = express.Router()

router.get('/', (_req,res) => {
  res.send('pong!')
})

router.use('/cc', costCenter)

if (process.env.NODE_ENV === 'test') {
  router.use('/test', test)
}

export default router