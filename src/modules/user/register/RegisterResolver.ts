import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../../entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello There";
  }

  @Mutation(() => User)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput
  ): Promise<User> {
    const password = await bcrypt.hash(data.password, 12);

    const user = await User.create({
      ...data,
      password,
    }).save();

    return user;
  }
}
