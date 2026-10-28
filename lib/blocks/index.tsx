import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";
import { HeroSchema } from "./Hero/schema";
import { TimerSchema } from "./Timer/schema";
import { Timer1Schema } from "./Timer1/schema";
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
    Features: FeaturesSchema,
    Timer: TimerSchema,
    Timer1: Timer1Schema,
    Faq: FaqSchema,
    PartnerWidget: PartnerWidgetSchema,
    EclipseScene: eclipseSceneConfig,
  },
  categories: {
    primary: {
      title: "Основные",
      components: ["Scene", "Heading", "Hero"],
    },
    content: {
      title: "Контент",
      components: ["Features", "Timer", "Timer1", "Faq", "PartnerWidget"],
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
