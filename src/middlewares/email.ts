import iEmailSchema, { IEmail } from '../schema/email';

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
		'Access-Control-Allow-Origin': 'https://www.fh-renovation.fr'
	});
};

export default EmailSchemaMiddleware;
