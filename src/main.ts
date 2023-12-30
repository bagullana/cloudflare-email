import { Router } from 'itty-router';
import Email from './controllers/email';
import AuthMiddleware from './middlewares/auth';
import EmailSchemaMiddleware, { EmailRequest } from './middlewares/email';
import { IEmail } from './schema/email';
import { corsHeaders } from './corsHeaders';

const router = Router();

// POST /api/email
router.post<EmailRequest>('/api/email', AuthMiddleware, EmailSchemaMiddleware, async (request) => {
	const email = request.email as IEmail;

	try {
		await Email.send(email);
	} catch (e) {
		console.error(`Error sending email: ${e}`);
		return new Response('Internal Server Error', {
			status: 500,
			headers: corsHeaders
		});
	}

	return new Response('OK', {
		status: 200,
		headers: corsHeaders
	});
});

router.all('*', (request) => {
	if (request.method === 'OPTIONS') {
		return handleOptions(request);
	}

	new Response('Not Found', {
		status: 404,
		headers: corsHeaders
	});
});

function handleOptions(request) {
	return new Response(null, {
		headers: corsHeaders
	});
}

export default {
	fetch: router.handle
};
