import { responseValidator } from "@/lib/validator";
import { z } from "zod";

export type Redemption = z.infer<typeof responseValidator.redemptions>[0];
