import iEmailSchema, { IEmail } from '../schema/email';
import { corsHeaders } from '../corsHeaders';

export type EmailRequest = Request & {
	email?: IEmail;
};

/**
 * Middleware to validate the request body against the email schema
 * @param request
 * @constructor
 */
const EmailSchemaMiddleware = async (request: EmailRequest) => {
	const content = await request.json();
	const email = iEmailSchema.safeParse(content);
	if (email.success) {
		request.email = email.data;
		return;
	}

	return new Response('Bad Request', {
		status: 400,
		headers: corsHeaders(request.headers.get('referer'))
	});
};

export default EmailSchemaMiddleware;
