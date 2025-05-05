import { UnqVerifyConfig } from "./types";
import { setConfig } from "./state";
import { startVerificationFlow } from "./start/start";

export function init(config: UnqVerifyConfig) {
  setConfig(config);
}

export function start() {
  return startVerificationFlow();
}

export { resetVerification } from "./verify/resetVerification";

export { isVerified } from "./verify/isVerified";
