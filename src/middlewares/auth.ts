import { corsHeaders } from '../corsHeaders';

/**
 * Middleware to check if the user is authenticated
 * @param request
 * @constructors
 */
const AuthMiddleware = (request: Request, env: Env) => {
	const token = request.headers.get('Authorization');
	const referer = request.headers.get('referer');

	// Strict check for token existence
	if (!env.TOKEN || env.TOKEN.length === 0) {
		return new Response('You must set the TOKEN environment variable.', {
			status: 401,
			headers: corsHeaders(referer)
		});
	}

	if (token !== env.TOKEN) {
		return new Response('Unauthorized', { status: 401, headers: corsHeaders(referer) });
	}
};

export default AuthMiddleware;
