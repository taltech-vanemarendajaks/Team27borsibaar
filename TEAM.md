# Team Practices

## Work Item Tracking & Workflow (Linear)

We use Linear for work item tracking and GitHub integration. All work should be tracked via Linear work items (e.g. VAN-123) and linked to pull requests so status updates happen automatically.

### Work Item Workflow

Work items move through the following states:
- Backlog – Reported work item, not yet committed or estimated
- Todo – Reviewed, estimated, and agreed by the team
- In Progress – Actively being worked on
- In Review – Implementation finished, PR under review
- Done – Merged into main
- Canceled – Will not be implemented
- Duplicate – Duplicate of another work item (reference the work item)

### GitHub ↔ Linear Conventions

To ensure work items and pull requests are linked correctly, every PR must reference a Linear work item ID (e.g. VAN-123).

Preferred ways to link:
- Branch name: `van-123-short-description`
- PR title: `VAN-123 Short description`
- PR description: Your description of what/why was done

