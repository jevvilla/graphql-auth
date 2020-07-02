import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ type: "text", unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Field()
  name(@Root() user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
