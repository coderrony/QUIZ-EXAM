// ✅ Force Node.js runtime for this route
export const runtime = "nodejs";

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
