DROP INDEX IF EXISTS vehicles_single_active;

--bun:split

ALTER TABLE vehicles DROP COLUMN IF EXISTS is_active;
