# Contributing to Börsibaar

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

1. **Branch naming**: `feature/description`, `fix/description`, or `refactor/description`
2. **Commits**: Clear, descriptive commit messages; one logical change per commit
3. **Testing**:
   - Backend: Run `docker compose exec backend ./mvnw test` before submitting
   - Frontend: Run `npm run lint` and verify `npm run build` succeeds
4. **Multi-tenant**: Verify organization isolation—no data leaks across organizations
5. **PR description**: Include what changed, why, and how to test it

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

