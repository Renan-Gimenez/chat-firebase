interface Props {
    icon: React.ReactNode;
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e:any) => void;
}

export default function Input({ icon, id, type, placeholder, value, onChange }:Props) {
    return (
        <label htmlFor={id} className="w-full">
            <div className="flex items-center gap-3 text-white bg-gray-900 px-3 py-2 rounded-lg transition-all focus-within:ring focus-within:ring-violet-500">
                {icon}
                <input 
                    id={id} 
                    type={type} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none" 
                />
            </div>
        </label>
    );
}