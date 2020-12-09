type Props = {
  completed: number;
};
export function Progress({ completed }: Props) {
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
        <div
          style={{ width: `${completed}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
        ></div>
      </div>
    </div>
  );
}
