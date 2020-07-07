import { Resolver, Arg, Mutation } from "type-graphql";

import { User } from "../../../entity/User";
import { redis } from "../../../redis";

@Resolver()
export class UserConfirmationResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token", () => String) token: string
  ): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}