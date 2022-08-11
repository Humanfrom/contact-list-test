# Тестовое задание - список контактов
Используемый стек фронт: Webpack + TypeScript + React + Redux + Consta UI + React Router Dom

Используемый стек бэк: NodeJS + Express
(изначально хотел сделать базу на PG, но это не часть тестового, поэтому все элементы БД определены переменными)

## Версия ноды: Node.js v16.15.0.

## Запуск дэв сервера
Команда запускаемая в папке сервера: `npm run dev` (дэв сервер на нодмон)

## Запуск фронта
Команда запускаемая в папке фронта: `npm start`

Фронт и сервер разворачиваются на http://localhost:5000 и http://localhost:8080, на фронте в Вэбпаке происходит редирект на 5000 порт для обхода CORS браузера.

---

Дерево проекта:

```
client
   |-- .gitignore
   |-- package-lock.json
   |-- package.json
   |-- src
   |   |-- AppRouter.tsx
   |   |-- components
   |   |   |-- Footer.tsx
   |   |   |-- Header.tsx
   |   |   |-- ModalCreateUser.tsx
   |   |   |-- Navbar.tsx
   |   |-- constants.tsx
   |   |-- hooks
   |   |   |-- redux.ts
   |   |   |-- useToken.tsx
   |   |-- index.html
   |   |-- index.tsx
   |   |-- models
   |   |   |-- InterfaceItem.ts
   |   |-- pages
   |   |   |-- About.tsx
   |   |   |-- App.tsx
   |   |   |-- Error.tsx
   |   |   |-- Login.tsx
   |   |   |-- css
   |   |   |   |-- App.css
   |   |-- routes
   |   |   |-- index.tsx
   |   |-- store
   |   |   |-- reducers
   |   |   |   |-- ItemsSlice.ts
   |   |   |-- store.ts
   |-- tsconfig.json
   |-- webpack.config.js
server
   |-- .gitignore
   |-- controller
   |   |-- table_controller.js
   |-- db.js
   |-- index.js
   |-- package-lock.json
   |-- package.json
   |-- routes
   |   |-- table_routes.js

```
---

На этом всё. Пара-пара-пам фиу!

По остальным вопросам в телегу: https://t.me/humanfrom
