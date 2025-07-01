import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
  documents: defineTable({
    title: v.string(),
  }),
});