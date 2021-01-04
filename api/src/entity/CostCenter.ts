import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { IsInt, Length, IsDate, IsString } from "class-validator";

@Entity()
export class CostCenter extends BaseEntity {

  @PrimaryColumn({ type: "varchar", length: 6, unique: true })
  @IsString()
  @Length(6, 6)
  id: string = ''

  @Column({ type: "varchar", length: 30})
  @IsString()
  @Length(1,30)
  name: string = ''

  @Column({ type: "varchar", length: 40})
  @IsString()
  @Length(1,30)
  personInCharge: string = ''

  @Column({ type: "integer" })
  @IsInt()
  budget: number = 0

  @Column({ type: "integer" })
  @IsInt()
  actual: number = 0

  @Column({ type: "datetime" })
  @IsDate()
  creationDate: Date = new Date()

  @Column({ type: "datetime", nullable: true })
  @IsDate()
  changeDate: Date = new Date()

}
