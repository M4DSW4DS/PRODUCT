import type { ComponentConfig } from "@puckeditor/core";
import { Hero4 } from "./index";
import type { Hero4Props } from "./index";

export const Hero4Schema: ComponentConfig<Hero4Props> = {
  fields: {
    imageProfile: { type: "text", label: "Картинка 1 (Профиль) — путь" },
    imageFace: { type: "text", label: "Картинка 2 (Лицо) — путь" },
    quoteText: { type: "text", contentEditable: true, label: "Текст (Солнце Египта...)" },
    sunSize: { type: "number", label: "Размер EclipseScene (px)", min: 100, max: 800 },
    sunTop: { type: "number", label: "Позиция EclipseScene по вертикали (%)", min: 0, max: 100 },
    sunLeft: { type: "number", label: "Позиция EclipseScene по горизонтали (%)", min: 0, max: 100 },
  },
  defaultProps: {
    imageProfile: "/hero/zorg-cabinet.png",
    imageFace: "/hero/zorg-cabinet2.png",
    quoteText: "Солнце Египта, Угаснет",
    sunSize: 380,
    sunTop: 42,
    sunLeft: 44,
  },
  render: (props) => <Hero4 {...props} />,
};