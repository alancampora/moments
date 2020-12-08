import { useContext, useState, useRef } from "react";
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
  file: File;
};

const onUpload = (
  { user, description, file }: UploadProps,
  onSuccess: Function
) => {
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
      try {
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
      } catch (e) {
        console.log(`error: ${error}`);
      } finally {
        onSuccess();
      }
    }
  );
};

export function Upload({ show, onClose }: Props) {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File>();
  const fileRef = useRef();
  return (
    user && (
      <Modal
        title={`Upload New Moment ${user.displayName}`}
        show={show}
        actions={[
          {
            label: "Upload",
            onClick: () =>
              onUpload({ user, description, file }, () => {
                setDescription("");
                console.log({fileRef})
                setFile(null);
                onClose();
              }),
          },
          {
            label: "Close",
            onClick: onClose,
          },
        ]}
      >
        <div className="m-2">
          <div>This is your place to upload a new image!</div>
          <div className="">
            <textarea
              className="bg-yellow-50 p-4 m-4"
              id="description"
              rows={3}
              cols={50}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="p-4">
            <div className="p-2">
              <label htmlFor="file">Upload: </label>
              <input
                ref={fileRef}
                id="file"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  );
}
