---
title: "Frontend development used to be simple"
date: "2025-11-18"
---

Frontend development used to be simple.

You had:

- A frontend
- Calling a backend API
- Clear boundaries

Then came SSR - server-rendered HTML. Still fine.

Then Server Actions - backend logic moves into the frontend server.

Then APIs disappeared. Auto-generated actions at build time. No endpoints. No contracts.

Then we started running SQL directly from React Server components (Drizzle, Prisma).

Your "frontend" is now your backend, executes commands, and talks to the database.

But with great power comes great attack surface.

React2Shell (CVE-2025-55182) — arbitrary code execution on RSC endpoints.

Source code exposure. Denial of service. All real. All patched now.

What a fun time to be a software developer.
