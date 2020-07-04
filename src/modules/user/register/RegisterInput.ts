import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
  @Length(1, 200)
  @Field()
  firstName!: string;

  @Length(1, 200)
  @Field()
  lastName!: string;

  @IsEmail()
  @Field()
  email!: string;

  @Field()
  password!: string;
}
