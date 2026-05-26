export type Bookmark = {
  id: string;
  title: string;
  url: string;
  favicon_url: string;
  description: string;
  tags: string[];
  visit_count: number;
  created_at: string;
  pinned: boolean;
  last_visited: string | null;
};
