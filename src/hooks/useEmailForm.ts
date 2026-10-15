import { useState } from "react";
import { isEmailConfigured, NOT_CONFIGURED, sendEmail } from "../lib/email";

type Status = "idle" | "sending" | "sent";

/**
 * State for a form that submits by email: tracks sending / sent / error and
 * shows `failureMessage` if the request fails.
 */
export function useEmailForm(failureMessage: string) {
	const [status, setStatus] = useState<Status>("idle");
	const [error, setError] = useState<string | null>(null);

	const submit = async (params: Record<string, string>) => {
		setError(null);
		setStatus("sending");
		try {
			await sendEmail(params);
			setStatus("sent");
			return true;
		} catch (err) {
			console.error("Email submission failed", err);
			setError(isEmailConfigured ? failureMessage : NOT_CONFIGURED);
			setStatus("idle");
			return false;
		}
	};

	return { submit, error, sending: status === "sending", sent: status === "sent" };
}
