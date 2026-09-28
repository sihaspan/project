import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Created lazily so `next build` still succeeds before the GitHub credentials
// are configured; a clear error is thrown on the first /admin request instead.
export const dynamic = "force-dynamic";

let handler;
const getHandler = () => (handler ??= makeRouteHandler({ config }));

export const GET = (request, ctx) => getHandler().GET(request, ctx);
export const POST = (request, ctx) => getHandler().POST(request, ctx);
