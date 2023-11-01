interface Props {
    profilePicture: string;
    user: string;
    text: string;
    sendedByMe: boolean;
}

export default function Message({ profilePicture, user, text, sendedByMe }:Props) {
    return (
        <div className={`w-fit max-w-[400px] flex flex-row p-2 gap-2 rounded-xl bg-gray-600 ${sendedByMe ? 'ml-auto bg-gray-700' : ''}`}>
            {!sendedByMe && 
                <img 
                    src={profilePicture} 
                    // width={50} 
                    alt="Avatar" 
                    className="h-10 rounded-full" 
                />
            }
            <div className="flex flex-col">
                {!sendedByMe && <span className="text-xs">{user}</span>}
                <p>{text}</p>
            </div>
        </div>
    );
}
