import { AuthErrorCode } from "@/types/api";

export function getAuthErrorMessage(code: AuthErrorCode): string {
  const messages: Record<AuthErrorCode, string> = {
    anonymous_provider_disabled: "Anonymous sign-ins are disabled.",
    bad_code_verifier: "Invalid login attempt. Please try again.",
    bad_json: "Something went wrong. Please try again later.",
    bad_jwt: "Invalid session. Please sign in again.",
    bad_oauth_callback: "OAuth login failed. Please try again.",
    bad_oauth_state: "OAuth state mismatch. Please try again.",
    captcha_failed: "CAPTCHA verification failed. Please try again.",
    conflict: "Too many requests. Please try again later.",
    email_address_invalid: "This email address is not valid.",
    email_address_not_authorized:
      "This email address is not authorized. Please use another one.",
    email_conflict_identity_not_deletable:
      "Account conflict detected. Please contact support.",
    email_exists: "This email is already registered.",
    email_not_confirmed:
      "Your email is not confirmed. Please check your inbox.",
    email_provider_disabled: "Email sign-ups are disabled.",
    flow_state_expired: "Your session expired. Please sign in again.",
    flow_state_not_found: "Invalid login flow. Please try again.",
    hook_payload_invalid_content_type:
      "Unexpected error occurred. Please try again later.",
    hook_payload_over_size_limit: "Request too large. Please try again later.",
    hook_timeout: "Request timed out. Please try again.",
    hook_timeout_after_retry:
      "Request failed after multiple attempts. Try again later.",
    identity_already_exists:
      "This account is already linked to another identity.",
    identity_not_found: "Account not found.",
    insufficient_aal: "Additional authentication is required.",
    invalid_credentials: "Invalid email or password.",
    invite_not_found: "This invite link is no longer valid.",
    manual_linking_disabled:
      "Account linking is not available. Please contact support.",
    mfa_challenge_expired: "MFA code expired. Request a new one.",
    mfa_factor_name_conflict: "You already have an MFA method with this name.",
    mfa_factor_not_found: "MFA method not found.",
    mfa_ip_address_mismatch:
      "MFA enrollment must be completed on the same device.",
    mfa_phone_enroll_not_enabled: "Phone MFA enrollment is disabled.",
    mfa_phone_verify_not_enabled: "Phone MFA verification is disabled.",
    mfa_totp_enroll_not_enabled: "Authenticator app setup is disabled.",
    mfa_totp_verify_not_enabled: "Authenticator app login is disabled.",
    mfa_verification_failed: "Invalid MFA code. Please try again.",
    mfa_verification_rejected: "MFA verification rejected.",
    mfa_verified_factor_exists: "A phone number is already registered for MFA.",
    mfa_web_authn_enroll_not_enabled: "Security key setup is disabled.",
    mfa_web_authn_verify_not_enabled: "Security key login is disabled.",
    no_authorization: "You must be signed in to continue.",
    not_admin: "You do not have admin access.",
    oauth_provider_not_supported: "This login provider is not supported.",
    otp_disabled: "OTP login is disabled.",
    otp_expired: "Your code has expired. Request a new one.",
    over_email_send_rate_limit:
      "Too many emails sent. Please wait before trying again.",
    over_request_rate_limit: "Too many requests. Please try again later.",
    over_sms_send_rate_limit:
      "Too many SMS messages sent. Please wait before trying again.",
    phone_exists: "This phone number is already registered.",
    phone_not_confirmed:
      "Your phone number is not confirmed. Please verify it.",
    phone_provider_disabled: "Phone sign-ups are disabled.",
    provider_disabled: "This login provider is currently disabled.",
    provider_email_needs_verification:
      "Please verify your email to complete login.",
    reauthentication_needed: "Please reauthenticate to change your password.",
    reauthentication_not_valid:
      "Invalid reauthentication code. Please try again.",
    refresh_token_already_used:
      "Your session has expired. Please sign in again.",
    refresh_token_not_found: "Session not found. Please sign in again.",
    request_timeout: "Request took too long. Please try again.",
    same_password: "Your new password must be different from the old one.",
    saml_assertion_no_email:
      "Your SSO provider did not return an email address.",
    saml_assertion_no_user_id: "Your SSO provider did not return a user ID.",
    saml_entity_id_mismatch:
      "SSO configuration mismatch. Please contact support.",
    saml_idp_already_exists: "This SSO provider already exists.",
    saml_idp_not_found: "SSO provider not found.",
    saml_metadata_fetch_failed: "Could not fetch SSO provider configuration.",
    saml_provider_disabled: "SSO login is disabled.",
    saml_relay_state_expired: "Your SSO login expired. Please try again.",
    saml_relay_state_not_found: "Invalid SSO login flow. Please try again.",
    session_expired: "Your session has expired. Please sign in again.",
    session_not_found: "Your session was not found. Please sign in again.",
    signup_disabled: "Sign-ups are disabled.",
    single_identity_not_deletable: "You cannot delete your only login method.",
    sms_send_failed: "Failed to send SMS. Please try again later.",
    sso_domain_already_exists: "This SSO domain already exists.",
    sso_provider_not_found: "SSO provider not found.",
    too_many_enrolled_mfa_factors: "You have too many MFA methods enrolled.",
    unexpected_audience: "Unexpected error. Please try again.",
    unexpected_failure: "An unexpected error occurred. Please try again later.",
    user_already_exists: "User already exists.",
    user_banned: "Your account has been banned. Please contact support.",
    user_not_found: "User not found.",
    user_sso_managed: "This account is managed by your SSO provider.",
    validation_failed: "Some information is not in the correct format.",
    weak_password: "Your password is too weak. Please use a stronger one.",
  };

  return messages[code] ?? "An unknown error occurred.";
}
