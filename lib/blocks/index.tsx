import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";
import { HeroSchema } from "./Hero/schema";
import { TimerSchema } from "./Timer/schema";
import { FeaturesSchema } from "./Features/schema";
import { GallerySchema } from "./Gallery/schema";
import { FormSchema } from "./Form/schema";
import { FaqSchema } from "./Faq/schema";
import { CtaSchema } from "./CTA/schema";

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
    Gallery: GallerySchema,
    Form: FormSchema,
    Faq: FaqSchema,
    Cta: CtaSchema,
  },
  categories: {
    "Основные": {
      components: ["Heading", "Hero", "Cta"],
    },
    "Контент": {
      components: ["Features", "Gallery", "Faq"],
    },
    "Интерактив": {
      components: ["Timer", "Form"],
    },
  },
  root: {
    render: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
};
