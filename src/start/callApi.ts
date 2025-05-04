export async function callVerificationApi(
  url: string,
  publicKey: string
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-public-key": publicKey,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const { redirectUrl } = await res.json();

  if (!redirectUrl) {
    throw new Error("No redirectUrl returned from API");
  }

  return redirectUrl;
}
