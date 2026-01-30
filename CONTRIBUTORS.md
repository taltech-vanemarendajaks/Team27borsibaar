# Contributing to Börsibaar

## Prerequisites

- **Docker** (for backend/database)
- **Node.js** 18+ and npm (for frontend)
- **Java 21** (optional, backend runs in Docker)
- **Git** with SSH/HTTPS configured
- **Linear account** (for work item tracking)

## Local Setup

1. **Clone repository**
   ```bash
   git clone <repo-url>
   cd Team27borsibaar
   ```

2. **Environment setup**
   - Copy `.sample.env` to `.env` and fill in credentials
   - Generate JWT secret: `openssl rand -base64 32`

3. **Start backend + database**
   ```bash
   docker compose up
   ```

4. **Start frontend** (in separate terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Branching Strategy

### Linear Integration

All work must be tracked via **Linear work items** (e.g., VAN-123). PRs are automatically linked to Linear when you follow naming conventions.

### Branch Naming

Format: `van-123-short-description`

Examples:
- `van-45-add-product-categories`
- `van-78-fix-price-calculation`
- `van-102-refactor-inventory-service`

### Work Item States

- **Backlog** → Not yet committed/estimated
- **Todo** → Reviewed, estimated, ready to start
- **In Progress** → Actively being worked on (move when starting)
- **In Review** → PR submitted, under review
- **Done** → Merged to main
- **Canceled** / **Duplicate** → Will not be implemented

## Commit Guidelines

### Format

```
VAN-123: Brief description in imperative mood

Optional longer explanation of what/why if needed.
```

### Rules

- Reference Linear work item ID in every commit
- Use imperative mood: "Add feature" not "Added feature"
- Keep first line under 72 characters
- One logical change per commit
- No "WIP" or "fix typo" commits in final PR (squash if needed)

### Examples

✅ Good:
```
VAN-45: Add product category filtering to inventory page

Implements dropdown filter and updates API endpoint to support
category query parameter.
```

❌ Bad:
```
fixed bug
```

## Code Style

### Backend (Spring Boot / Java)

- **Lombok**: Use `@Getter`, `@Setter`, `@Builder`, `@RequiredArgsConstructor` to reduce boilerplate
- **Entities**: Use `UUID` for IDs, always include `organizationId` for multi-tenant isolation
- **Services**: Mark with `@Transactional` (write ops) or `@Transactional(readOnly = true)` (reads)
- **DTOs**: Use Java `record` classes for simple request/response objects
- **Mappers**: Use MapStruct with `componentModel = "spring"` for entity-DTO conversion
- **Exceptions**: Throw `ResponseStatusException` or custom exceptions; use `@RestControllerAdvice` for global handling
- **Validation**: Validate inputs in service layer, always check organization ownership

### Frontend (Next.js / TypeScript)

- **Components**: Use functional components with hooks, TypeScript strict mode
- **API calls**: All backend requests go through `/app/api/backend/*` proxy routes
- **Styling**: Use Tailwind CSS classes; use Radix UI components from `components/ui/`
- **Data fetching**: Use SWR for client-side fetching; handle loading/error states
- **Routing**: Follow App Router conventions; use `(protected)` and `(public)` route groups
- **Icons**: Use `lucide-react` for all icons

## Database Migrations

- **CRITICAL**: All schema changes go in `db/changelog/db.changelog-master.yaml`
- Never modify existing changesets—always add new numbered ones (e.g., `008-add-feature`)
- Use PostgreSQL features: `CITEXT`, `TIMESTAMPTZ`, `CHECK` constraints

## PR Submission

1. **Branch**: Follow naming convention `van-123-short-description` (see Branching Strategy)
2. **PR title**: `VAN-123 Brief description`
3. **PR description**: Explain what changed, why, and how to test
4. **Linear status**: Move work item to "In Review" when PR is submitted
5. **Testing before submission**:
   - Backend: `docker compose exec backend ./mvnw test`
   - Frontend: `cd frontend && npm run lint && npm run build`
6. **Multi-tenant**: Verify organization isolation—no data leaks across organizations
7. **Self-review**: Check your own diff for debug code, commented code, console.logs

## Code Review Checklist

### Backend

- [ ] Organization ownership validated before all data operations
- [ ] `@Transactional` used appropriately
- [ ] MapStruct mappers created/updated for new DTOs
- [ ] Exceptions handled with proper HTTP status codes
- [ ] Liquibase changeset added (if DB schema changed)
- [ ] Tests pass and cover new functionality

### Frontend

- [ ] API routes proxy to backend (not direct fetch to backend URL)
- [ ] TypeScript types defined (no `any` unless justified)
- [ ] Loading and error states handled
- [ ] Responsive design (works on mobile/tablet)
- [ ] Authentication/authorization checks in place
- [ ] Lint passes with no warnings

### General

- [ ] No hardcoded secrets or credentials
- [ ] Code follows existing patterns in the project
- [ ] No unnecessary dependencies added
- [ ] Documentation updated if needed (README, comments)

