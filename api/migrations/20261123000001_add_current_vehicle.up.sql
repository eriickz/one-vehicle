ALTER TABLE vehicles
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT false;

--bun:split

UPDATE vehicles
SET is_active = true
WHERE id = (SELECT id FROM vehicles ORDER BY created_at ASC LIMIT 1)
  AND NOT EXISTS (SELECT 1 FROM vehicles WHERE is_active = true);

--bun:split

CREATE UNIQUE INDEX IF NOT EXISTS vehicles_single_active
    ON vehicles (is_active)
    WHERE is_active = true;
