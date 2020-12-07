import { useContext, useState } from "react";
import { Modal } from "../modal";
import { UserContext, User } from "../../providers";
import firebase from "firebase";

type Props = {
  show: boolean;
  onClose: Function;
};

type UploadProps = {
  user: User;
  description: string;
};
const onUpload = ({ user, description }: UploadProps, onSuccess: Function) => (
  e
) => {
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref(`images/${file.name}`);
  const task = storageRef.put(file);

  task.on(
    "state_changed",
    (taskData) => {
      const percentage = taskData.bytesTransferred / taskData.totalBytes;
      console.log({ percentage });
    },
    (error) => console.log({ error }),
    async () => {
      console.log("pasa por aca");
      const downloadURL = await task.snapshot.ref.getDownloadURL();
      const record = {
        avatar: user.photoURL,
        username: user.displayName,
        image: downloadURL,
        description: description,
      };

      const db = firebase.database();
      const dbRef = db.ref("uploads");

      const newUpload = dbRef.push();
      newUpload.set(record);
      onSuccess();
    }
  );
};

export function Upload({ show, onClose }: Props) {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState<string>("");
  return (
    user && (
      <Modal
        title={`Upload New Moment ${user.displayName}`}
        show={show}
        actions={[
          {
            label: "Upload",
            onClick: onClose,
          },
        ]}
      >
        <>
          <div>This is your place to upload a new image!</div>
          <div className="m-4">
            <div className="p-2">
              <label htmlFor="file">Upload: </label>
              <input
                id="file"
                type="file"
                onChange={onUpload({ user, description }, onClose)}
              />
            </div>
            <div className="p-2">
              <label htmlFor="description">Description: </label>
              <input
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </>
      </Modal>
    )
  );
}
