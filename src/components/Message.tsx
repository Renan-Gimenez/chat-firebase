interface Props {
  createdAt: string;
  profilePicture: string;
  user: string;
  text: string;
  userUid: string;
  sendedByMe: boolean;
}

export default function Message({
  createdAt,
  profilePicture,
  user,
  text,
  userUid,
  sendedByMe,
}: Props) {
  const { seconds, nanoseconds }: any = createdAt;

  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <div
      className={`w-fit max-w-[80%] flex flex-row p-2 gap-2 rounded-xl bg-gray-100 dark:bg-gray-600 ${
        sendedByMe ? "ml-auto bg-gray-200 dark:bg-gray-700" : ""
      }`}
    >
      {!sendedByMe && (
        <img
          alt="Avatar"
          src={`${profilePicture}`}
          className="h-10 w-10 rounded-full"
        />
      )}
      <div className="flex flex-col">
        {!sendedByMe && <span className="text-xs">{user}</span>}
        <p>{text}</p>
        <p className="text-xs text-gray-500 dark:text-gray-300 self-end">
          {formattedTime}
        </p>
      </div>
    </div>
  );
}
