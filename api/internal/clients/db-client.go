package clients

import (
	"context"
	"log"
	"time"

	"github.com/eriickz/one-vehicle/api/internal/config"
	"github.com/eriickz/one-vehicle/api/migrations"
	catalogcontracts "github.com/eriickz/one-vehicle/api/modules/catalog/contracts"
	maintenancecontracts "github.com/eriickz/one-vehicle/api/modules/maintenance/contracts"
	vehiclescontracts "github.com/eriickz/one-vehicle/api/modules/vehicles/contracts"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/extra/bundebug"
	"github.com/uptrace/bun/migrate"
)

func LoadDBClient(url string) *bun.DB {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	pool, err := pgxpool.New(ctx, url)
	if err != nil {
		panic(err)
	}

	sqldb := stdlib.OpenDBFromPool(pool)
	dbClient := bun.NewDB(sqldb, pgdialect.New())

	dbClient.AddQueryHook(bundebug.NewQueryHook(
		bundebug.FromEnv("BUN_DEBUG"),
	))

	createDBTables(ctx, dbClient)
	runMigrations(dbClient)

	err = config.SeedLookupData(ctx, dbClient)
	if err != nil {
		panic(err)
	}

	return dbClient
}

func runMigrations(dbClient *bun.DB) {
	migrator := migrate.NewMigrator(dbClient, migrations.Migrations)

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()

	if err := migrator.Init(ctx); err != nil {
		log.Println("migration init:", err)
		return
	}

	if err := migrator.Lock(ctx); err != nil {
		log.Println("migration lock:", err)
		return
	}

	defer migrator.Unlock(ctx)

	migrationGroup, err := migrator.Migrate(ctx)
	if err != nil {
		log.Println("migration run:", err)
		return
	}

	if migrationGroup.IsZero() {
		log.Println("There are no new migrations to run (database is up to date)")
		return
	}

	for _, migration := range migrationGroup.Migrations {
		log.Printf("Migration '%v' was applied successfully at %v", migration.Name, migration.MigratedAt)
	}
}

func createDBTables(ctx context.Context, dbClient *bun.DB) {
	_, err := dbClient.NewCreateTable().
		IfNotExists().
		Model((*catalogcontracts.Currency)(nil)).
		Exec(ctx)
	if err != nil {
		panic(err)
	}

	_, err = dbClient.NewCreateTable().
		IfNotExists().
		Model((*catalogcontracts.Category)(nil)).
		Exec(ctx)
	if err != nil {
		panic(err)
	}

	_, err = dbClient.NewCreateTable().
		IfNotExists().
		WithForeignKeys().
		Model((*vehiclescontracts.Vehicle)(nil)).
		Exec(ctx)
	if err != nil {
		panic(err)
	}

	_, err = dbClient.NewCreateTable().
		IfNotExists().
		WithForeignKeys().
		Model((*maintenancecontracts.MaintenanceLog)(nil)).
		Exec(ctx)
	if err != nil {
		panic(err)
	}
}
