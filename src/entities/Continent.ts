import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import Country from "./Country";

@Entity()
@ObjectType()
export default class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @OneToMany(() => Country, (c) => c.continent)
  @Field(() => [Country])
  countries: Country[];
}

@InputType()
export class NewContinentInput {
  @Field()
  name: string;

  @Field()
  code: string;
}
