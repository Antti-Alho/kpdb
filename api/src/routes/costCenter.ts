import express from 'express'
import costCenterController from '../controllers/costCenterController'

const router = express.Router()

router.get('/', costCenterController.getAll)
router.get('/:id', costCenterController.getOne)
router.post('/', costCenterController.createOne)
router.post('/:id', costCenterController.changeOne)
router.delete('/:id', costCenterController.deleteOne)

export default router