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
        console.log(`error: ${e}`);
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
        title={`Share with your amigues ${user.displayName}`}
        show={show}
        actions={[
          {
            label: "Upload",
            onClick: () =>
              onUpload({ user, description, file }, () => {
                setDescription("");
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
          <div className="my-4">
            <textarea
              className="w-full p-4 bg-yellow-50 resize-none border rounded-md"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
      </Modal>
    )
  );
}
