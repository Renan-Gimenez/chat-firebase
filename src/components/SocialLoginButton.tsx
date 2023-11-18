interface Props {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

export default function SocialLoginButton({ icon, text, onClick }:Props) {
    return (
        <button 
            onClick={onClick} 
            className="w-full flex items-center justify-center gap-2 text-white bg-blue-500 px-4 py-2 rounded-lg transition-all hover:tracking-wider"
        >
            {icon} {text}
        </button>
    );
}