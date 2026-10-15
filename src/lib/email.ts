import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey);

export const NOT_CONFIGURED =
	"Email service is not configured. Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.";

/** Sends a form submission through the shared EmailJS template (see README). */
export async function sendEmail(params: Record<string, string>): Promise<void> {
	if (!isEmailConfigured) throw new Error(NOT_CONFIGURED);
	await emailjs.send(serviceId!, templateId!, params, { publicKey: publicKey! });
}
