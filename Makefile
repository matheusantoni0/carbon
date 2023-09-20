include .env

#
# Start & Shutdown
#
up:
#	docker network create ${APP_NAME}
	docker-compose up -d

logs:
	docker-compose logs -f app

down:
	docker-compose kill
	docker-compose rm -f

restart-%:
	docker-compose restart $*

#
# Database Migrations
#
new-migration-%:
	yarn knex migrate:make $* -x ts

migrate-up:
	docker-compose run --rm -w ${PWD}/src/configs/database/migrations app yarn knex migrate:latest

migrate-down:
	docker-compose run --rm -w ${PWD}/src/configs/database/migrations app yarn knex migrate:rollback

#
# Lint
#
lint:
	docker-compose run --rm --no-deps -w ${PWD} app yarn lint --fix

#
# Tests
#
test:
	docker-compose run --rm -w ${PWD} app yarn test --coverage

test-%:
	docker-compose run --rm -w ${PWD} app yarn test $* --coverage

test-watch:
	docker-compose run --rm -w ${PWD} app yarn test --watchAll
