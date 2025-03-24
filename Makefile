build: 
	docker compose up --build --remove-orphans -d

logs:
	docker compose logs -f

mk: 
	docker compose run --rm api poetry run python3 manage.py makemigrations

mg: 
	docker compose run --rm api poetry run python3 manage.py migrate

off: 
	docker compose down

off-v:
	docker compose down -v

sp: 
	docker compose run --rm api poetry run python3 manage.py createsuperuser

reset:
	make off-v && make build && make mk && make mg && make sp