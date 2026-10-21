-- One-shot migration: clear content so page.json becomes source of truth.
-- Run manually on prod DB before first deploy of feat/visual-rebuild.
DELETE FROM page_content;
