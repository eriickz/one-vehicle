# Walkthrough: Backend Implementation for One-Vehicle API

The backend for the Vehicle Maintenance Tracker is built with Go, Echo v5, and Bun ORM using a clean, modular, and layered architecture.

---

## Architecture & Code Structure

The backend is located in [`api/`](file:///home/eriicx0/projects/one-vehicle/api) with Go module name `github.com/eriickz/one-vehicle/api`:

```
api/
├── internal/
│   ├── clients/
│   │   └── db-client.go          # pgxpool + Bun DB client + auto create tables + auto seed
│   ├── config/
│   │   ├── create-lookup-data.go # Idempotent Currency seeder (USD, EUR, GBP, CAD, DOP)
│   │   └── load-env.go           # godotenv + caarlos0/env loader
│   ├── contracts/
│   │   ├── constants.go          # Default constants
│   │   └── types.go              # APIResponse[T], EntityTimestamps, Environment
│   └── utils/
│       ├── generate-uuid.go      # Monotonic ULID-based UUID generator
│       ├── pagination-filters.go # Pagination, search query normalization
│       ├── parse-positive-int.go # Integer parsing helpers
│       ├── get-app-origin-host.go
│       └── utils_test.go         # Unit tests
│
├── modules/
│   ├── catalog/                  # Currencies & Categories
│   │   ├── contracts/            # Models, Interfaces, Request DTOs
│   │   ├── repositories/         # Bun ORM data layer
│   │   ├── services/             # Business logic & validator
│   │   ├── controllers/          # Echo v5 handlers returning APIResponse[T]
│   │   └── router.go             # /api/catalog, /api/currencies, /api/categories
│   │
│   ├── vehicles/                 # Vehicles & Real-Time Metrics
│   │   ├── contracts/
│   │   ├── repositories/         # CRUD + dynamic metrics query
│   │   ├── services/
│   │   ├── controllers/
│   │   └── router.go             # /api/vehicles
│   │
│   └── maintenance/              # Maintenance Logs
│       ├── contracts/
│       ├── repositories/         # Filtered query (vehicle, category, text search)
│       ├── services/             # Date, positive cost & mileage validations
│       ├── controllers/
│       └── router.go             # /api/maintenance-logs
│
├── migrations/
│   └── main.go                   # Bun migration discover caller
├── .env.example & .env           # Dev environment configuration
├── go.mod & go.sum               # Includes 'tool github.com/air-verse/air'
└── main.go                       # Echo v5 entry point
```

---

## Endpoints Implemented

All endpoints return uniform JSON matching `contracts.APIResponse[T]`:
```json
{
  "message": "Optional feedback message",
  "data": ...,
  "page": 1,
  "pageSize": 10,
  "totalCount": 25
}
```

### 1. Catalog & Currencies
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/catalog/:name` | Fast lookup: `/api/catalog/currencies` or `/api/catalog/categories` |
| `GET` | `/api/currencies` | Paginated/searchable list of active currencies |
| `GET` | `/api/currencies/:id` | Get currency by ID |
| `POST` | `/api/currencies` | Create currency |
| `PUT` | `/api/currencies/:id` | Update currency |
| `DELETE` | `/api/currencies/:id` | Delete currency |

### 2. Categories
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/categories` | List user categories (supports `?search=...`, `?page=...`) |
| `GET` | `/api/categories/:id` | Get category by ID |
| `POST` | `/api/categories` | Create category (`{"name": "Brakes"}`) |
| `PUT` | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Delete category |

### 3. Vehicles
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/vehicles` | List all vehicles with related Currency |
| `GET` | `/api/vehicles/:id` | Get vehicle by UUID |
| `GET` | `/api/vehicles/:id/metrics` | **Calculates vehicle KPIs**: `currentMileage`, `totalExpenses`, `totalLogsCount`, `lastServiceDate` |
| `POST` | `/api/vehicles` | Create vehicle |
| `PUT` | `/api/vehicles/:id` | Update vehicle |
| `DELETE` | `/api/vehicles/:id` | Delete vehicle (cascades logs) |

### 4. Maintenance Logs
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/maintenance-logs` | Filter logs by `?vehicleId=...`, `?categoryId=...`, `?search=...`, `?page=...` |
| `GET` | `/api/maintenance-logs/:id` | Get log by UUID |
| `POST` | `/api/maintenance-logs` | Create log (validates positive cost, mileage $\ge$ vehicle.initialMileage, date) |
| `PUT` | `/api/maintenance-logs/:id` | Update log |
| `DELETE` | `/api/maintenance-logs/:id` | Delete log |

---

## Verification & Tests Passed

1. **Compilation Test**:
   ```bash
   cd api && go build -v ./...
   ```
   *Result:* All packages compiled cleanly (`exit 0`).

2. **Hot-Reloading Tool (`air`) Test**:
   ```bash
   cd api && go tool air -v
   ```
   *Result:* `v1.67.4, built with Go go1.27.0` executed and verified via the `tool` directive.

3. **Unit Tests**:
   ```bash
   cd api && go test -v ./...
   ```
   *Result:* `TestGenerateUUID`, `TestPaginationFilters`, and `TestParsePositiveInt` all passed (`PASS`).

---

## How to Run Locally

1. Set your PostgreSQL database in [`api/.env`](file:///home/eriicx0/projects/one-vehicle/api/.env):
   ```env
   DB_URL=postgresql://user:password@localhost:5432/one_vehicle?sslmode=disable
   ```
2. Start the server with live reloading:
   ```bash
   cd api
   go tool air
   ```
   The tables will be automatically created on startup via Bun (`IfNotExists()`), and currencies (`USD`, `EUR`, `GBP`, `CAD`, `DOP`) will be automatically seeded.
