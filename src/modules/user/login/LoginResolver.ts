import { Resolver, Query, Arg, Ctx } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../../entity/User";
import { Context } from "../../../types/Context";

@Resolver()
export class LoginResolver {
  @Query(() => User, { nullable: true })
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() context: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const validUser = bcrypt.compare(password, user.password);

    if (!validUser) {
      return null;
    }

    context.req.session!.userId = user.id;

    return user;
  }
}
