import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { CostCenter } from '../entity/CostCenter'
import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const invRepository = getRepository(CostCenter)
    const all = await invRepository.find({})
    res.send(all)
  } catch (error) {
    next(error)
  }
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const invRepository = getRepository(CostCenter)
    const one = await invRepository.find({ where: { id: id }})
    res.send(one)
  } catch (error) {
    next(error)
  }
}

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newCostCenter = new CostCenter();
    newCostCenter = Object.assign(newCostCenter, req.body)

    const errors = await validate(newCostCenter)
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
      res.status(400).send(errors)
    } else {
      
    }
    const invRepository = getRepository(CostCenter)
    newCostCenter = await invRepository.save(newCostCenter)
    res.status(200).send(newCostCenter)
  } catch (error) {
    next(error)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const invRepository = getRepository(CostCenter)
    const one = await invRepository.find({ where: { id: id } })
    res.send(one)
  } catch (error) {
    next(error)
  }
}

const changeOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const invRepository = getRepository(CostCenter)
    const one = await invRepository.find({ where: { id: id } })
    res.send(one)
  } catch (error) {
    next(error)
  }
}

export default {
  getAll,
  getOne,
  deleteOne,
  changeOne,
  createOne
}