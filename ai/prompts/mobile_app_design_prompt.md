# Product Design Brief: Vehicle Maintenance Tracker Mobile App

## Objective
Design a mobile application that enables users to track vehicle maintenance, operational costs, repairs, and any relevant events or notes across their vehicles directly from their smartphone.

You are responsible for designing the complete mobile user experience, navigation model, screen layouts, and interaction patterns. Do not write implementation code; produce the comprehensive mobile UI/UX design specification.

---

## Global Requirements
- **Platform:** Mobile (iOS / Android).
- **Language:** All application copy, labels, and documentation must be in English.
- **Theme:** Single dark theme.

---

## Domain & Data Architecture
The design must support four entities:
1. **Currencies:** System-level currency options (the only data seeded initially: USD, EUR, GBP, etc.).
2. **Vehicles:** Each vehicle has make, model, year, license plate, initial mileage, and an assigned preferred currency. (Starts with 0 records).
3. **Categories:** User-defined categories to classify maintenance and events. (Starts with 0 records).
4. **Maintenance Logs:** Core records containing date, mileage, category, title/concept, cost, and optional notes. (Starts with 0 records).

---

## Technical UX & Functional Rules

### 1. Vehicle Context & Metrics
- The user can manage multiple vehicles (create, view, edit, delete).
- The mobile interface must clearly communicate the currently active vehicle context and allow easy switching between vehicles.
- Key vehicle metrics must update dynamically:
  - **Current Mileage:** Evaluated as the highest value between the vehicle's initial mileage and the mileage of its latest log.
  - **Total Expenses:** Aggregated cost of all logs for the active vehicle, formatted with its assigned currency.
  - **Service History:** Quick indicators of total logs recorded and date of the most recent service.

### 2. Maintenance & Event Logging
- Full management of logs (create, read, edit, delete).
- Search and filtering capabilities (by category and text query).
- **Frictionless Creation Flow:** When logging an event on mobile, if no categories exist yet, allow the user to create a category on the fly without losing their current input progress.
- Validations: Costs cannot be negative; mileage cannot be lower than the vehicle's initial mileage.

### 3. Comprehensive Zero States (Empty States)
Because only currencies are pre-seeded, design dedicated mobile empty state experiences for:
1. **No vehicles registered:** First-time onboarding screen/state.
2. **Vehicle with no logs:** Active vehicle has zero maintenance history.
3. **No categories created:** When categorizing an event with an empty catalog.
4. **No search/filter results:** When a query yields no matching logs.

---

## Deliverables Required
1. **Mobile Information Architecture & Navigation:** Define the screens, navigation structure, and hierarchy optimized for one-handed mobile use.
2. **Screen-by-Screen UI Design:** Complete layout breakdown and component specifications for all mobile views and states.
3. **User Flows & Touch Interactions:** Step-by-step user interactions for onboarding, logging an event quickly, and looking up past records.
4. **Empty State & Edge Case Handling:** Detailed visual layout and copy for all mobile zero states and validation errors.
