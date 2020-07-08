import { Length, IsEmail, Min } from "class-validator";
import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Length(1, 200)
  @Field()
  firstName!: string;

  @Length(1, 200)
  @Field()
  lastName!: string;

  @IsEmail()
  @Field()
  email!: string;
}
