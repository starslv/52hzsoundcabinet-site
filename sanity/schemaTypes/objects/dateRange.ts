import { defineField, defineType } from "sanity";

export const dateRangeType = defineType({
  name: "dateRange",
  title: "Date Range",
  type: "object",
  fields: [
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date"
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date"
    })
  ]
});
