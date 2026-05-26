import supabase from "../../lib/supabase";
import { getFavicon } from "../../utils/getFavicon";
import type { BookmarkFormValues } from "../../components/bookmark.schema";
import { normalizeTags } from "../../utils/utils";

export async function getBookmarks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("is_archived", false)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((bookmark) => ({
    ...bookmark,
    tags: normalizeTags(bookmark.tags),
  }));
}

export async function getArchivedBookmarks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("is_archived", true)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((item) => ({
    ...item,
    tags: normalizeTags(item.tags),
  }));
}

export async function createBookmark(values: BookmarkFormValues) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const tags = values.tags.split(",").map((tag) => tag.trim());

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        title: values.title,
        description: values.description,
        url: values.url,
        tags,
        favicon_url: getFavicon(values.url),
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBookmark(id: string, values: BookmarkFormValues) {
  const tags = values.tags.split(",").map((tag) => tag.trim());

  const { data, error } = await supabase
    .from("bookmarks")
    .update({
      title: values.title,
      description: values.description,
      url: values.url,
      tags,
      favicon_url: getFavicon(values.url),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function archiveBookmark(id: string) {
  const { error } = await supabase
    .from("bookmarks")
    .update({ is_archived: true })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function unarchiveBookmark(id: string) {
  const { error } = await supabase
    .from("bookmarks")
    .update({ is_archived: false })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteBookmark(id: string) {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
