import { burstFrom, celebrateBig, floatFrom } from "./celebrate";
import type { Messages } from "./i18n";
import { currentLevel } from "./xp";

/**
 * Plays the reward for an action that just earned XP at `el`: confetti, "+N XP",
 * and a screen-wide celebration for `big` messages or a level up.
 */
export function rewardAt(el: Element, xp: number, levelBefore: number, t: Messages, big: string[] = []) {
  burstFrom(el, big.length ? 28 : 14);
  floatFrom(el, t.celebrate.xp(xp));
  const now = currentLevel();
  const messages = [...big];
  if (now.level > levelBefore) messages.push(t.celebrate.levelUp(now.level, now.name));
  if (messages.length) celebrateBig(messages);
}
