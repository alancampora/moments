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
    <div>
      <header className="text-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="w-16 h-16 rounded-full" src={user?.photoURL}></img>
            <span className="ml-3 text-xl">{user?.displayName}</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button
              onClick={onLogout}
              className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </button>
            <button
              onClick={onUpload}
              className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              Upload Image
            </button>
          </nav>
        </div>
      </header>

      <section className="text-gray-700 body-font max-w-614 mx-auto">
        <div className="flex flex-col items-center">
          {snapshots.map((v, index) => {
            const { username, avatar, description, image } = v.val();
            return (
              <div key={index}>
                <Card description={description} image={image} avatar={avatar} username={username}/>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
