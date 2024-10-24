# Построение пути между точками

## Последние обновления

1. Появилась возможность управлять положением прямоугольника с помощью мыши. 
2. Ошибки пересечения прямоугольников обрабатываются отдельно и не вляют на их пересечение.  

## Основной функционал

Данное приложение предназначено для работы с прямоугольниками и вычисления ломаной линии, которая соединяет. Пользователь задает прямоугольники, определяя центр и размеры. Программа обеспечивает проверку корректности заданных данных и визуализирует результат на холсте с помощью Canvas API.

Основной функционал приложения:
1. Задание прямоугольников:
   - Пользователь может задать прямоугольники, указывая их центры и размеры. 
2. Проверка условий соединения:
   - Программа осуществляет контроль за тем, чтобы углы подсоединения (в градусах) были перпендикулярны и направлены наружу относительно границ прямоугольников. 
3. Обработка ошибок:
   - На этапе преобразования данных приложение выявляет и обрабатывает потенциальные ошибки, такие как:
     - Неправильное определение точки подсоединения — программа проверяет, лежит ли данная точка на грани прямоугольника.
     - Ошибки в определении угла соединения — приложение следит за тем, чтобы угол был направлен перпендикулярно и наружу от грани прямоугольника.
4. Вычисление ломаной линии:
   - Программа вычисляет массив точек, представляющий собой ломаную линию, соединяющую два прямоугольника с учётом заданных пользователем точек и углов.
5. Визуализация результата:
   - Итогом работы приложения является создание холста с отрисованными двумя прямоугольниками и рассчитанной ломаной линией. Для этого используется Canvas API.

## Начало работы

Следуйте этим инструкциям, чтобы развернуть копию проекта на своем локальном компьютере для разработки и тестирования.

### Предварительные требования

Убедитесь, что у вас установлены следующие инструменты:

- Node.js (https://nodejs.org/) 
- npm (https://www.npmjs.com/) (поставляется вместе с Node.js)
- git (https://git-scm.com/)

### Установка

1. Склонируйте репозиторий:
   `git clone https://github.com/FrauRitosika/graph-app.git`

2. Перейдите в каталог проекта:
   `cd ваш-репозиторий`

3. Установите зависимости:
   `npm install`
   
### Запуск приложения

Для запуска приложения в режиме разработки отобразите терминал и выполните следующую команду:
`npm run dev`

Откройте веб-браузер и введите url `Local` из сообщения Vite для доступа к приложению.

### Тестирование приложения

Для запуска Jest тестов в режиме разработки отобразите терминал и выполните следующую команду:
`npm run test`

### Сборка

Для сборки версии приложения, готовой к развертыванию, выполните:
`npm run build`

Сборка будет сохранена в папке `dist`.

## Структура проекта

Вот краткое описание структуры проекта:

```
/репозиторий
│
├── /public          # Папка для статических файлов
│   └── /components  # Стилизация 
│
├── /src             # Исходный код приложения
│   ├── /data-handle # Функции обработки геометрических данных
│      ├── /classes  # Описание основных классов
│      ├── oneDRepresentation  # Функции обработки геометрических данных в одномерном пространстве
│            ├── # Функции
│            └── test # Тесты
│      ├── twoDRepresentation  # Функции обработки геометрических данных в двумерном пространстве
│            ├── # Функции
│            └── test # Тесты
│      ├── findPathBetweenPoints  # Функции поиска промежуточных точек на отрезках в двумерном пространстве
│            ├── # Функции
│            └── test # Тесты
│      ├── dataConverter.ts # Фунция полученя пути между точками по параметрам из интерфейса
│      └── types.ts # Описание типов
│   ├── /visio-handle # Функции управления данными отображения 
│   ├── graphSettings.json # Параметры отображения
│   └── main.tsx    # Описание работы интерфейса
│
├── package.json     # Файл зависимостей и скриптов
└── tsconfig.json    # Конфигурация TypeScript
└── vite.config.ts   # Конфигурация Vite
└── /index.html 

```
### Настройка отображения 

В файле graphSettings можно изменить параметры отображения. Сейчас в файле хранятся следующий параметры:
- rectGap - минимальное расстояние между прямоугольниками.

## Используемые технологии

- TypeScript - надмножество JavaScript с строгой типизацией
- CSS - для стилизации
- Canvas API - для отображения граффических элементов
- Jest - для тестирования
