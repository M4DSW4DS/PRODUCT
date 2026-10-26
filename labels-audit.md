# Labels Audit — 2026-10-26

## Summary
- Total fields across all blocks: 76
- Fields with NO label: 4
- Fields with technical/unclear label: 0
- Fields with clear RU label: 70
- Fields with vague/unclear label: 2

## Per block

### Heading
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | NO LABEL | MISSING | Заголовок (основной текст заголовка) |
| level | radio | NO LABEL | MISSING | Уровень заголовка (H1, H2, H3) |
| align | radio | NO LABEL | MISSING | Выравнивание (по левому краю, центру или правому краю) |

### Hero
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| eyebrow | text | Надзаголовок (маленький текст сверху) | CLEAR | Надзаголовок (маленький текст сверху) |
| title | text | Главный заголовок (H1) | CLEAR | Главный заголовок (H1) |
| subtitle | textarea | Подзаголовок | CLEAR | Подзаголовок |
| quote | textarea | Цитата Зорга | CLEAR | Цитата Зорга |
| quoteAttribution | text | Автор цитаты | CLEAR | Автор цитаты |
| ctaLabel | text | Текст кнопки (если нужно) | CLEAR | Текст кнопки (если нужно) |
| ctaHref | text | Ссылка кнопки | CLEAR | Ссылка кнопки |
| showTimer | radio | Показывать таймер | CLEAR | Показывать таймер |
| showCalendar | radio | Показывать календарь | CLEAR | Показывать календарь |
| sunTop | text | Положение Солнца по вертикали (напр. 40%, 75%) | CLEAR | Положение Солнца по вертикали (напр. 40%, 75%) |
| sunLeft | text | Положение Солнца по горизонтали (напр. 50%) | CLEAR | Положение Солнца по горизонтали (напр. 50%) |
### PartnerWidget
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок | CLEAR | Заголовок |
| subtitle | textarea | Подзаголовок | CLEAR | Подзаголовок |
| src | text | URL виджета (iframe) | CLEAR | URL виджета (iframe) |
| height | text | Высота iframe (px) | CLEAR | Высота iframe (px) |
| fallbackUrl | text | Резервная ссылка | CLEAR | Резервная ссылка |
| fallbackText | text | Текст резервной ссылки | CLEAR | Текст резервной ссылки |

### Faq
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок секции | CLEAR | Заголовок секции |
| items | array | Вопросы | CLEAR | Вопросы |
| items.question | text | Вопрос | CLEAR | Вопрос |
| items.answer | textarea | Ответ | CLEAR | Ответ |

### Cta
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок | CLEAR | Заголовок |
| subtitle | textarea | Подзаголовок | CLEAR | Подзаголовок |
| buttonText | text | Текст кнопки | CLEAR | Текст кнопки |
### Scene
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| variant | radio | Тип сцены (Вариант) | CLEAR | Тип сцены (Вариант) |
| overlay | radio | Затемнение фона (Vignette) | CLEAR | Затемнение фона (Vignette) |
| eyebrowPrefix | text | Префикс сцены (напр. SCENE 01 //) | CLEAR | Префикс сцены (напр. SCENE 01 //) |
| eyebrowSuffix | text | Текст после префикса | CLEAR | Текст после префикса |
| headingLines | array | Заголовок (Строки) | CLEAR | Заголовок (Строки) |
| headingLines.text | text | Текст строки | CLEAR | Текст строки |
| headingLines.color | radio | Цвет | CLEAR | Цвет |
| textBlocks | array | Текстовые абзацы | CLEAR | Текстовые абзацы |
| textBlocks.text | textarea | Текст | CLEAR | Текст |
| accent | radio | Акцентный цвет | CLEAR | Акцентный цвет |
| backgroundImage | custom | NO LABEL | MISSING | Фоновое изображение (загружается через медиа-пicker) |
| quote | textarea | Цитата (если есть) | CLEAR | Цитата (если есть) |
| quoteAttribution | text | Автор цитаты | CLEAR | Автор цитаты |
| ctaLabel | text | Текст кнопки CTA | CLEAR | Текст кнопки CTA |
| ctaHref | text | Ссылка CTA | CLEAR | Ссылка CTA |
| svg_caption | text | Подпись к SVG (Scene 2) | CLEAR | Подпись к SVG (Scene 2) |
| microcopy | text | Микрокопия (Scene 7) | VAGUE | Микрокопия Scene 7 (маленький поясняющий текст для седьмой сцены) |
| anchor | text | ID-якорь для ссылок (напр. register) | CLEAR | ID-якорь для ссылок (напр. register) |
| artifacts | array | Карточки-числа (Scene 3) | CLEAR | Карточки-числа (Scene 3) |
| artifacts.title | text | Заголовок | CLEAR | Заголовок |
| artifacts.sub | text | Подпись | CLEAR | Подпись |
| plates | array | Плиты стихий (Scene 4) | CLEAR | Плиты стихий (Scene 4) |
| plates.name | text | Название | CLEAR | Название |
| plates.text | textarea | Текст | CLEAR | Текст |
| plates.color | radio | Цвет | CLEAR | Цвет |
| voices | array | Голоса (Scene 5) | CLEAR | Голоса (Scene 5) |
| voices.name | text | Имя голоса | CLEAR | Имя голоса |
| additional_ctas | array | Доп. ссылки (Scene 7) | CLEAR | Доп. ссылки (Scene 7) |
### Conversion
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок блока | CLEAR | Заголовок блока |
| tabs | array | Вкладки | CLEAR | Вкладки |
| tabs.label | text | Название вкладки | CLEAR | Название вкладки |
| tabs.title | text | Заголовок | CLEAR | Заголовок |
| tabs.body | textarea | Текст | CLEAR | Текст |
| additional_ctas.label | text | Текст ссылки | CLEAR | Текст ссылки |
| additional_ctas.href | text | URL / якорь | CLEAR | URL / якорь |
| buttonHref | text | Ссылка кнопки | CLEAR | Ссылка кнопки |
| sunSize | text | Размер Солнца (напр. 400px, 300px) | CLEAR | Размер Солнца (напр. 400px, 300px) |
| sunGlow | text | Свечение Солнца (напр. rgba(255,120,20,0.8)) | CLEAR | Свечение Солнца (напр. rgba(255,120,20,0.8)) |

### Timer
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок | CLEAR | Заголовок |
| targetDate | text | Целевая дата (ISO) | CLEAR | Целевая дата (ISO) |
| endMessage | text | Сошение по истечении | VAGUE | Сообщение после истечения таймера (текст, который показывается когда время вышло) |
| hint_text | text | Подсказка для UTC+3 | CLEAR | Подсказка для UTC+3 |
| accent_color | text | Акцентный цвет (#00e5ff) | CLEAR | Акцентный цвет (#00e5ff) |
| post_countdown_text | text | Текст после отсчёта | CLEAR | Текст после отсчёта |

### Features
| Field key | Type | Current label | Verdict | Suggested label |
|-----------|------|---------------|---------|-----------------|
| title | text | Заголовок секции | CLEAR | Заголовок секции |
| items | array | Преимущества | CLEAR | Преимущества |
| items.icon | text | Иконка (эмодзи) | CLEAR | Иконка (эмодзи) |
| items.title | text | Заголовок | CLEAR | Заголовок |
| items.description | textarea | Описание | CLEAR | Описание |