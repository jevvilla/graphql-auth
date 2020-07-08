import { v4 } from "uuid";
import { redis } from "../redis";
import { CONFIRMUSER_PREFIX } from "../modules/constants";

export const createConfirmationUrl = async (
  userId: number
): Promise<string> => {
  const token = v4();
  await redis.set(CONFIRMUSER_PREFIX + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
