# Проект: Тестовое задание для покупки товаров

## Описание проекта

Этот проект был создан как тестовое задание и служит для того, чтобы пользователи из таблицы `users` могли покупать товары из предоставленного API. 

## Установка и настройка

### Шаг 1: Настройка переменных окружения

Создайте файл `.env` в корне проекта и добавьте в него следующие данные:

```env
# Среда разработки
NODE_ENV=development

# Данные для тестовой базы данных
DB_HOST_DEV=хост базы данных
DB_USER_DEV=имя пользователя базы данных
DB_PASS_DEV=пароль пользователя базы данных
DB_NAME_DEV=имя базы данных
DB_PORT_DEV=порт базы данных
PORT_DEV=порт проекта, обычно это 3000 или 8000

# Данные для продуктивной базы данных
DB_HOST_PROD=хост базы данных
DB_USER_PROD=имя пользователя базы данных
DB_PASS_PROD=пароль пользователя базы данных
DB_NAME_PROD=имя базы данных
DB_PORT_PROD=порт базы данных
PORT_PROD=порт проекта, обычно это 3000 или 8000

# Данные для подключения API
clientId=client_id
clientSecret=client_secret
API_HOST=api_host
```
## Шаг 2: Создание таблицы users

В своей базе данных создайте таблицу users с полями:
- id: int
- balance: int

## Пример SQL-запроса для создания таблицы:
```
CREATE TABLE users (
    id INT PRIMARY KEY,
    balance INT
);
```
## Шаг 3: Установка зависимостей и запуск проекта

Выполните следующие команды в терминале:

```
npm install
npm install -g typescript @types/node
ts-node index.ts
```

## Доступные маршруты

После запуска проект будет доступен на указанном в файле .env порту. Используйте следующие маршруты для взаимодействия с приложением:

- GET http://localhost:${port}/users/ - Показать всех пользователей
- POST http://localhost:${port}/user/buy - передаются параметры:
```
{
    "userId": 1, // id пользователя который покупает
    "amount": 10 // сумма покупки
}
```
- GET http://localhost:${port}/users/1 - Получить пользователя по id
- GET http://localhost:${port}/skin/ - Показать массив объектов из API (/v1/items)