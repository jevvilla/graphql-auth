import { Resolver, Arg, Mutation } from "type-graphql";
import { v4 } from "uuid";

import { User } from "../../../entity/User";
import { redis } from "../../../redis";
import { sendEmail } from "../../../utils/mailer";
import { FORGOTPASSWORD_PREFIX } from "../../constants";

@Resolver()
export class ForgotPassword {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email", () => String) email: string
  ): Promise<boolean> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User was not found");
    }

    const token = v4();
    await redis.set(FORGOTPASSWORD_PREFIX + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(
      user.email,
      `http://localhost:3000/user/change-password/${token}`
    );
    return true;
  }
}
