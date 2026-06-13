export type CategoryConfig = {
  label: string;
  slug: string;
  dbValue: string;
};

export const CATEGORY_CONFIG: CategoryConfig[] = [
  { label: "CAFE/BAR", slug: "cafe-bar", dbValue: "CAFE/BAR" },
  { label: "Wings", slug: "wings", dbValue: "Wings" },
  { label: "Cars", slug: "cars", dbValue: "Cars" },
  { label: "Aesthetic", slug: "aesthetic", dbValue: "Aesthetic" },
  { label: "Gaming", slug: "gaming", dbValue: "Gaming" },
  { label: "Anime/Pop", slug: "anime-pop", dbValue: "Pop Culture" },
  { label: "Under 4K", slug: "under-4k", dbValue: "Under 4K" },
  { label: "Sports", slug: "sports", dbValue: "Sports" },
];

export const CATEGORY_BY_SLUG = new Map(
  CATEGORY_CONFIG.map((c) => [c.slug, c])
);

export const CATEGORY_BY_DB_VALUE = new Map(
  CATEGORY_CONFIG.map((c) => [c.dbValue.toLowerCase(), c])
);

export function mapSlugToDbCategory(slug: string): string {
  return CATEGORY_BY_SLUG.get(slug.toLowerCase())?.dbValue ?? slug;
}

export function mapDbCategoryToLabel(dbValue: string): string {
  return CATEGORY_BY_DB_VALUE.get(dbValue.toLowerCase())?.label ?? dbValue;
}

