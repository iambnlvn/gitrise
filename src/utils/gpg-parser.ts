import { GPGKeyMetadata } from "@/app/settings/developer/developer-types";
import * as openpgp from "openpgp";

export async function parseGPGKey(
  content: string,
): Promise<GPGKeyMetadata | { error: string }> {
  try {
    // Check if this looks like a private key
    if (/BEGIN PGP PRIVATE KEY BLOCK/.test(content)) {
      throw new Error(
        "Private keys are not allowed. Please upload only public keys.",
      );
    }

    // Parse the key
    const key = await openpgp.readKey({ armoredKey: content });

    // Safety check: ensure it’s actually a public key
    if (key.isPrivate()) {
      throw new Error(
        "This appears to be a private key. Please upload only public keys.",
      );
    }

    const user = await key.getPrimaryUser();

    const expirationTime = await key.getExpirationTime();
    const metadata = {
      name: user?.user?.userID?.name || undefined,
      email: user?.user?.userID?.email || undefined,
      comment: user?.user?.userID?.comment || undefined,
      keyId: key.getKeyID().toHex().toUpperCase(),
      fingerprint: key.getFingerprint().toUpperCase(),
      algorithm: key.getAlgorithmInfo().algorithm,
      createdAt: key.getCreationTime().toUTCString(),
      expiresAt: expirationTime
        ? new Date(expirationTime).toUTCString()
        : undefined,
    };

    return metadata;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
