import { getConfig } from "../state";
import { buildOidcUrl } from "./buildUrl";
import { callVerificationApi } from "./callApi";
import { isVerified } from "../verify/isVerified";
import { getCookie } from "../utils/cookies";
import { VERIFICATION_COOKIE_KEY } from "../constants";

export async function startVerificationFlow() {
  const config = getConfig();

  if (isVerified()) {
    const token = getCookie(VERIFICATION_COOKIE_KEY);
    if (token) {
      config.onVerified({ token });
    } else {
      console.warn(
        "[UNQVerify] Token missing even though isVerified() was true."
      );
    }
    return;
  }

  if (config.mode === "popup") {
    console.warn(
      "[UNQVerify] Popup mode not implemented. Falling back to redirect."
    );
  }

  try {
    const url = buildOidcUrl(config);
    const redirectUrl = await callVerificationApi(url, config.publicKey);

    window.location.href = redirectUrl;
  } catch (err) {
    console.error("[UNQVerify] Failed to start verification:", err);
    config.onFailure?.(err);
  }
}
