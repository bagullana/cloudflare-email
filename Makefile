build:
	docker build -t cloudflare-email .

up:
	docker run -it -p 8976:8976 -v ${PWD}:/site cloudflare-email

bash:
	docker exec -it $(shell docker ps -q --filter ancestor=cloudflare-email) bash

stop:
	docker stop $(shell docker ps -q --filter ancestor=cloudflare-email)
