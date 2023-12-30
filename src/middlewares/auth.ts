/**
 * Middleware to check if the user is authenticated
 * @param request
 * @constructors
 */
const AuthMiddleware = (request: Request, env: Env) => {
	const token = request.headers.get('Authorization');

	// Strict check for token existence
	if (!env.TOKEN || env.TOKEN.length === 0) {
		return new Response('You must set the TOKEN environment variable.', {
			status: 401,
			'Access-Control-Allow-Origin': 'https://www.fh-renovation.fr'
		});
	}

	if (token !== env.TOKEN) {
		return new Response('Unauthorized', { status: 401, 'Access-Control-Allow-Origin': 'https://www.fh-renovation.fr' });
	}
};

export default AuthMiddleware;
