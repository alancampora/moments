import { useContext } from "react";
import { useList } from "react-firebase-hooks/database";
import { User, UserContext, UserContextT } from "../../providers";
import { Card } from "../../components";
import firebase from "firebase";

type Props = {
  onLogout: any;
  onUpload: any;
};

export function Feed({ onLogout, onUpload }: Props) {
  const { user } = useContext<UserContextT>(UserContext);
  const db = firebase.database();
  const dbRef = db.ref("uploads");
  const [snapshots, loading, error] = useList(dbRef);

  if (loading) return <div>Loading Feed</div>;
  if (error) return <div>"There was an error while loading feed"</div>;
  return (
    <div className="bg-gray-50">
      <header className="bg-white text-gray-700 body-font fixed w-full z-1 top-0 left-0 shadow-sm">
        <div className="flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Amigues</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <img className="mr-4 w-8 h-8 rounded-full" src={user?.photoURL}></img>
            <button className="mr-4" onClick={onUpload}>
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </button>

            <button className="mr-4" onClick={onLogout}>
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <div id="separator" className="py-4"></div>

      <section className="text-gray-700 body-font max-w-614 container mx-auto max-width-614px">
        <div className="flex flex-col items-center">
          {snapshots.map((v, index) => {
            const { username, avatar, description, image } = v.val();
            return (
              <div key={index}>
                <Card
                  description={description}
                  image={image}
                  avatar={avatar}
                  username={username}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
