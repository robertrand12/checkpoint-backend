import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import Continent from "./Continent";
import { ObjectId } from "../types";

@Entity()
@ObjectType()
export default class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  emoji: string;

  @ManyToOne(() => Continent, (c) => c.countries, {
    cascade: true,
  })
  @Field(() => Continent)
  continent: Continent;
}

@InputType()
export class NewCountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  emoji: string;

  @Field()
  continent: ObjectId;
}
