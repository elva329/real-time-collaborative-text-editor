import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.string(),
    organizationId: v.optional(v.string())
  })
  .index('by_owner_id', ['ownerId'])
  .index('organization_id', ['organizationId'])
  .searchIndex('search_title', {
    searchField: 'title',
    filterFields: ['ownerId', 'organizationId']
  })
});