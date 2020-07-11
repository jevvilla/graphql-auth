import { Resolver, Mutation, Ctx } from "type-graphql";
import { Context } from "../../../types/Context";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: Context): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      context.req.session?.destroy((error) => {
        if (error) {
          console.log(error);
          return reject(false);
        }

        context.res.clearCookie("gqlidt");
        resolve(true);
      });
    });
  }
}
