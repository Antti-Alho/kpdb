import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { CostCenter } from '../entity/CostCenter'
import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { parseInput } from '../util/parseCCinput'

const getAll = async (_req: Request, res: Response) => {
  try {
    const invRepository = getRepository(CostCenter)
    const allcc = await invRepository.find({})
    res.status(200).send(allcc)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const invRepository = getRepository(CostCenter)
    const onecc = await invRepository.findOneOrFail({ where: { id: id }})
    res.status(200).send(onecc)
  } catch (error) {
    res.status(404).send(`${id} not found or valid`)
  }
}

const createOne = async (req: Request, res: Response) => {
  try {
    let newCostCenter: CostCenter
    newCostCenter = parseInput(req.body)
    console.log(newCostCenter)
    const errors = await validate(newCostCenter)

    if (errors.length > 0) {
      res.status(400).send(errors)
    } else {
      const invRepository = getRepository(CostCenter)
      await invRepository.insert(newCostCenter)
      res.status(200).send('OK')
    }
  } catch (error) {
    res.status(500).send('Something went wrong you probalby tried to insert duplicate key')
  }
}

const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const invRepository = getRepository(CostCenter)
    await invRepository.delete({ id: id } )
    res.status(200).send('OK')
  } catch (error) {
    res.status(404).send(`${id} not found or valid`)
  }
}

const changeOne = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const invRepository = getRepository(CostCenter)
    let ccToChange = await invRepository.findOneOrFail({ where: { id: id } })
    ccToChange = parseInput(req.body)
    await invRepository.save(ccToChange)
    res.status(200).send('OK')
  } catch (error) {
    res.status(404).send(`${id} not found or valid`)
  }
}

export default {
  getAll,
  getOne,
  deleteOne,
  changeOne,
  createOne
}