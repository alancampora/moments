import { User } from "../../../providers";
import firebase from "firebase";
import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

type UploadProps = {
  user: User;
  description: string;
  file: File;
};

const convertToGif = async (video, ffmpeg) => {
  // Write the file to memory
  ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

  // Run the FFMpeg command
  await ffmpeg.run(
    "-i",
    "test.mp4",
    "-t",
    "2.5",
    "-ss",
    "2.0",
    "-f",
    "gif",
    "out.gif"
  );

  // Read the result
  const data = ffmpeg.FS("readFile", "out.gif");

  return new Blob([data.buffer], { type: "image/gif" })
};

export default async function onUpload(
  { user, description, file }: UploadProps,
  onSuccess: Function,
  ffmpeg: FFmpeg
) {
  const storageRef = firebase.storage().ref(`images/${file.name}`);
  let task;

  if (file?.type.indexOf("video") >= 0) {
    const videoToGif = await convertToGif(file, ffmpeg);
    task = storageRef.put(videoToGif);
  } else {
    task = storageRef.put(file);
  }

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
}
