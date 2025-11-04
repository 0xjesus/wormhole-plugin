import { implement } from "@orpc/server";
import { Effect } from "every-plugin/effect";
import { contract } from "@every-plugin/template/src/contract";
import { DataProviderService } from "@every-plugin/template/src/service";

const DEFAULT_BASE_URL =
  process.env.DATA_PROVIDER_BASE_URL ?? "https://api.wormholescan.io/api/v1";
const DEFAULT_TIMEOUT = parseTimeout(process.env.DATA_PROVIDER_TIMEOUT);

const API_KEY = process.env.DATA_PROVIDER_API_KEY ?? "not-required";

const service = new DataProviderService(DEFAULT_BASE_URL, API_KEY, DEFAULT_TIMEOUT);
const builder = implement(contract).$context();

export const dataProviderRouter = {
  getSnapshot: builder.getSnapshot.handler(async ({ input }) => {
    return await Effect.runPromise(service.getSnapshot(input));
  }),
  ping: builder.ping.handler(async () => {
    return await Effect.runPromise(service.ping());
  }),
};

function parseTimeout(rawTimeout: string | undefined) {
  if (!rawTimeout) {
    return 15_000;
  }

  const parsed = Number.parseInt(rawTimeout, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 15_000;
}
