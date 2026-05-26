type Props = {
  tags: string[];
};

export default function BookmarkTags({ tags }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-md bg-muted px-2 py-1 text-sm">
          {tag}
        </span>
      ))}
    </div>
  );
}
