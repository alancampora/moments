import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal } from "../modal";
import { UserContext } from "../../providers";
import onUpload from "./helpers/on-upload";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { Progress } from "../progress";

const ffmpeg = createFFmpeg({ log: true });

type Props = {
  show: boolean;
  onClose: Function;
};
export function Upload({ show, onClose }: Props) {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<number>(0);
  const [file, setFile] = useState<File>();
  const fileRef = useRef();

  const load = async () => {
    await ffmpeg.load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    user && (
      <Modal
        title={`Share with your amigues ${user.displayName}`}
        show={show}
        actions={[
          {
            label: "Upload",
            onClick: async () =>
              await onUpload(
                { user, description, file, setCompleted },
                () => {
                  setDescription("");
                  setFile(null);
                  onClose();
                },
                ffmpeg
              ),
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
          {!!completed && <Progress completed={completed} />}
        </div>
      </Modal>
    )
  );
}
