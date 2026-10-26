"use client";

import { CountdownTimer } from "@/lib/components/CountdownTimer";
import { ECLIPSE } from "@/lib/core/constants/eclipse";

/** Props HUD-панели Hero. */
export type HeroHUDProps = {
  /** Ref на обёртку таймера — родитель анимирует её смещение. */
  timerRef?: React.Ref<HTMLDivElement>;
  /** Показывать обратный отсчёт. */
  showTimer?: boolean;
};

/** HUD-панель Hero: только таймер. */
export function HeroHUD({ timerRef, showTimer }: HeroHUDProps) {
  return (
    <div className="hero-desk-ui">
      {showTimer ? (
        <div ref={timerRef} className="hero-desk-ui w-full text-neon-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.9)]">
          <CountdownTimer
            target_utc={ECLIPSE.targetDateISO}
            timezones={[{ label: "", tz: "Africa/Cairo" }]}
            hint_text=""
            accent_color="#00e5ff"
            post_countdown_text=""
          />
        </div>
      ) : null}
    </div>
  );
}
