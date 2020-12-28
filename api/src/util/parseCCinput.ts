import { CostCenter } from '../entity/CostCenter'

export const parseInput = ( body: any ): CostCenter => {
  return Object.assign( new CostCenter(), {
    id: body.id,
    name: body.name,
    personInCharge: body.personInCharge,
    budget: body.budget,
    actual: body.actual,
    creationDate: body.creationDate ? new Date(body.creationDate) : new Date(),
    changeDate: new Date(),
  })
}
