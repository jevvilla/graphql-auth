import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../../entity/User";
import { RegisterInput } from "./RegisterInput";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { sendEmail } from "../../../utils/mailer";
import { createConfirmationUrl } from "../../../utils/createConfirmationUrl";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuthenticated)
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

    await sendEmail(user.email, await createConfirmationUrl(user.id));

    return user;
  }
}
