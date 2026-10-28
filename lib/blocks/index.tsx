import type { ReactNode } from "react";
import type { Config } from "@puckeditor/core";
import { HeadingSchema } from "./Heading/schema";
import { HeroSchema } from "./Hero/schema";
import { TimerSchema } from "./Timer/schema";
import { Timer1Schema } from "./Timer1/schema";
import { Timer2Schema } from "./Timer2/schema";
import { FeaturesSchema } from "./Features/schema";
import { PartnerWidgetSchema } from "./PartnerWidget/schema";
import { FaqSchema } from "./Faq/schema";
import { SceneSchema } from "./Scene/schema";
import { eclipseSceneConfig } from "./EclipseScene/schema";
import { EclipseAnimationSchema } from "./EclipseAnimation/schema";
import { Hero2Schema } from "./Hero2/schema";
import { TextBlockSchema } from "./TextBlock/schema";
import { GridBlockSchema } from "./GridBlock/schema";

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
    Timer2: Timer2Schema,
    Faq: FaqSchema,
    PartnerWidget: PartnerWidgetSchema,
    EclipseScene: eclipseSceneConfig,
    EclipseAnimation: EclipseAnimationSchema,
    Hero2: Hero2Schema,
    TextBlock: TextBlockSchema,
    GridBlock: GridBlockSchema,
  },
  categories: {
    primary: {
      title: "Основные",
      components: ["Scene", "Heading", "Hero", "Hero2"],
    },
    content: {
      title: "Контент",
      components: ["Features", "Timer", "Timer1", "Timer2", "Faq", "PartnerWidget", "TextBlock", "GridBlock"],
    },
    effects: {
      title: "Эффекты",
      components: ["EclipseScene", "EclipseAnimation"],
    },
  },
  root: {
    render: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
};
