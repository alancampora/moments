type Props = {
  image: string;
  description: string;
  avatar: string;
  username: string;
  isLoading: boolean;
};

export function Card({
  image,
  description,
  avatar,
  username,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 w-64 bg-gray-200"></div>
        <footer className="my-2 p-4">
          <div className="flex items-center ">
            <div>
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
            <div className="mx-2 w-32 h-3 bg-gray-200"></div>
          </div>
          <div className="my-2 w-full h-8 bg-gray-200"></div>
        </footer>
      </div>
    );
  }

  return (
    <article className="m-4 border border-grey-50 bg-white">
      <div className="p-4 flex items-center">
        <div>
          <img className="h-8 w-8 rounded-full" src={avatar}></img>
        </div>
        <div className="px-2">
          <p className="font-bold">{username}</p>
        </div>
      </div>
      <div className="">
        <img src={image}></img>
      </div>
      <footer className="p-4">
        <div className="p-2">
          <p className="">{description}</p>
        </div>
      </footer>
    </article>
  );
}
