import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../../entity/User";
import { redis } from "../../../redis";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { FORGOTPASSWORD_PREFIX } from "../../constants";
import { Context } from "../../../types/Context";

@Resolver()
export class ChangePassword {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() context: Context
  ): Promise<User | undefined> {
    const userId = await redis.get(FORGOTPASSWORD_PREFIX + token);

    if (!userId) {
      return undefined;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return undefined;
    }

    await redis.del(FORGOTPASSWORD_PREFIX + token);
    user.password = await bcrypt.hash(password, 12);
    await user.save();

    context.req.session!.userId = user.id;

    return user;
  }
}
