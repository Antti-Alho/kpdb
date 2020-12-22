import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { IsInt, Length, IsDate } from "class-validator";

@Entity()
export class CostCenter extends BaseEntity {

  @PrimaryColumn({ type: "varchar", length: 6 })
  @Length(6, 6)
  id: string = ''

  @Column({ type: "varchar", length: 30})
  @Length(1,30)
  neme: string = ''

  @Column({ type: "varchar", length: 40})
  @Length(1,30)
  personInCharge: string = ''

  @Column({ type: "number" })
  @IsInt()
  budget: number = 0

  @Column({ type: "number" })
  @IsInt()
  actual: number = 0

  @Column({ type: "datetime" })
  @IsDate()
  creationDate: Date = new Date()

  @Column({ type: "datetime" })
  @IsDate()
  changeDate: Date = new Date()

}
