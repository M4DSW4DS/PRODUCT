import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";
import { HeroSchema } from "./Hero/schema";
import { TimerSchema } from "./Timer/schema";
import { FeaturesSchema } from "./Features/schema";
import { PartnerWidgetSchema } from "./PartnerWidget/schema";
import { FaqSchema } from "./Faq/schema";
import { CtaSchema } from "./CTA/schema";
import { SceneSchema } from "./Scene/schema";

/**
 * РЕЕСТР БЛОКОВ.
 * Единая точка регистрации всех блоков.
 * При добавлении нового блока добавь его сюда и в categories.
 * ДВИЖОК при этом не меняется.
 */
export const blocksConfig: Config = {
  components: {
    Heading: HeadingSchema,
    Hero: HeroSchema,
    Timer: TimerSchema,
    Features: FeaturesSchema,
    PartnerWidget: PartnerWidgetSchema,
    Faq: FaqSchema,
    Cta: CtaSchema,
    Scene: SceneSchema,
  },
  categories: {
    "Основные": {
      components: ["Heading", "Hero", "Cta"],
    },
    "Контент": {
      components: ["Features", "Faq"],
    },
    "Интерактив": {
      components: ["Timer", "PartnerWidget"],
    },
    "Сцены": {
      components: ["Scene"],
    },
  },
  root: {
    render: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
};
