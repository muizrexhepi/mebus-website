export type DataProps = {
  value: string;
  label: string;
}[];

const FilterBlock = ({ title, data }: { title: string; data: DataProps }) => {
  return (
    <div className="rounded-xl flex flex-col gap-4 p-6 bg-white">
      <h1 className="font-medium text-black text-xl">{title}</h1>
      <div className="flex flex-col gap-2 items-start">
        {data.map((item, index) => (
          <div key={index} className="text-black">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBlock;
