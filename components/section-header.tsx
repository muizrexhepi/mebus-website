export const SectionHeader = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-medium text-black">{title}</h1>
      <p className="text-lg text-black/70">{desc}</p>
    </div>
  );
};
