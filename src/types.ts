export interface UnqVerifyConfig {
  publicKey: string;
  ageToVerify: number;
  redirectUri: string;
  mode?: "redirect" | "popup";

  onVerified: (payload: Record<string, any>) => void;
  onFailure?: (error?: any) => void;
}
