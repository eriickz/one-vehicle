package utils

import (
	"crypto/rand"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/oklog/ulid/v2"
)

var (
	entropy = ulid.Monotonic(rand.Reader, 0)
	mu      sync.Mutex
)

func GenerateUUID() string {
	mu.Lock()
	defer mu.Unlock()

	now := time.Now()

	generated := ulid.MustNew(ulid.Timestamp(now), entropy)

	generatedAsUUID, err := uuid.FromBytes(generated.Bytes())
	if err != nil {
		panic(err)
	}

	return generatedAsUUID.String()
}
