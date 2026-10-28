import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";
import { HeroSchema } from "./Hero/schema";
import { Hero2Schema } from "./Hero2/schema";
import { TimerSchema } from "./Timer/schema";
import { FeaturesSchema } from "./Features/schema";
import { PartnerWidgetSchema } from "./PartnerWidget/schema";
import { FaqSchema } from "./Faq/schema";
import { SceneSchema } from "./Scene/schema";
import { eclipseSceneConfig } from "./EclipseScene/schema";

/**
 * РЕЕСТР БЛОКОВ.
 * Единая точка регистрации всех блоков.
 * При добавлении нового блока добавь его сюда и в categories.
 * ДВИЖОК при этом не меняется.
 */
export const blocksConfig: Config = {
  components: {
    Scene: SceneSchema,
    Heading: HeadingSchema,
    Hero: HeroSchema,
    Hero2: Hero2Schema,
    Features: FeaturesSchema,
    Timer: TimerSchema,
    Faq: FaqSchema,
    PartnerWidget: PartnerWidgetSchema,
    EclipseScene: eclipseSceneConfig,
  },
  categories: {
    primary: {
      title: "Основные",
      components: ["Scene", "Heading", "Hero", "Hero2"],
    },
    content: {
      title: "Контент",
      components: ["Features", "Timer", "Faq", "PartnerWidget"],
    },
    effects: {
      title: "Эффекты",
      components: ["EclipseScene"],
    },
  },
  root: {
    render: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
};
