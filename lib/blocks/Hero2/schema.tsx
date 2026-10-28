import type { ComponentConfig } from "@puckeditor/core";
import { Hero2 } from "./index";
import type { Hero2Props } from "./index";

export const Hero2Schema: ComponentConfig<Hero2Props> = {
  fields: {
    imageProfile: { type: "text", label: "Картинка 1 (Профиль) — путь" },
    imageFace: { type: "text", label: "Картинка 2 (Лицо) — путь" },
    quoteText: { type: "text", contentEditable: true, label: "Текст (Солнце Египта...)" },
    sphereSize: { type: "number", label: "Размер сферы (px)", min: 100, max: 800 },
    sphereTop: { type: "number", label: "Сфера по вертикали (%)", min: 0, max: 100 },
    sphereLeft: { type: "number", label: "Сфера по горизонтали (%)", min: 0, max: 100 },
  },
  defaultProps: {
    imageProfile: "/hero/zorg-cabinet.png",
    imageFace: "/hero/zorg-cabinet2.png",
    quoteText: "Солнце Египта, Угаснет",
    sphereSize: 380,
    sphereTop: 42,
    sphereLeft: 44,
  },
  render: (props) => <Hero2 {...props} />,
};