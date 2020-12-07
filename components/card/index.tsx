type Props = {
  image: string;
  description: string;
  avatar: string;
  username: string;
};

export function Card({ image, description, avatar, username }: Props) {
  return (
    <article className="m-4">
      <div className="border-2 border-solid border-black ">
        <img src={image}></img>
      </div>
      <footer className="border-2 border-solid border-black my-2 p-4">
        <div className="flex items-center">
          <div>
            <img className="h-8 w-8 rounded-full" src={avatar}></img>
          </div>
          <div className="px-2">
            <p className="font-bold">{username}</p>
          </div>
        </div>
        <div className="p-2">
          <p className="">{description}</p>
        </div>
      </footer>
    </article>
  );
}
