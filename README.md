# апка спеціально зуповільнена, щоб ми мали відчуття реального реквесту на сервер, який знаходиться далеко

# якщо щось не так, то з сервера повертатимуться ерор меседжі з підказками

# ендпоінти + http метод, який потрібно юзати для їх використання:

## /get-todos
GET
повертає всі тудушки масивом

## /todo/:id
GET
приймає id тудушки в параметр урли
повертає об'єкт тудушки, чий айді дорівнює тому, що ми вкинули в урлу

## /create-todo
POST
приймає body, в нього обов'язкові поля- title, description, вони мають бути типу string

приклад
{
title: 'title1',
description: 'description1'
}

поверне новостворену тудушку з деякими додатковими полями

## /update-todo/:id
PATCH
приймає боді, який може змінити одне або декілька полів - title, description, completed
title - string
description - string

використовуться для оновлення одного або кількох полів

поверне оновлену тудушку

## /delete-todo/:id
DELETE
приймає id в урлі як параметр

видалить тудушку, яку ми вказали в урлі

поверне повідомлення, що тудушка видалена


# щоб запустити сервер
npm i

npm start
