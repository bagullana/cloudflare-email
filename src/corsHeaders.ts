const allowedReferers = [
	'https://www.fh-renovation.fr',
	'https://www.elma-lab.tech',
	'http://localhost:3050', // Comment, or handle properly for dev
	'http://localhost:3051', // Comment, or handle properly for dev
];

export const corsHeaders = (referer: string | null) => {
	if (referer && referer.endsWith('/')) {
		referer = referer.slice(0, -1);
	}

	if (referer !== null && allowedReferers.includes(referer)) {
		return {
			'Access-Control-Allow-Origin': referer,
			'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
			'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
			'Access-Control-Allow-Credentials': 'true'
		};
	}

	return {};
};
