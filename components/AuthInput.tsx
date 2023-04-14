interface Props {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

export default function AuthInput({ id, onChange, value, label, type }: Props) {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="bg-gray-700/20 text-sm font-bold outline-none rounded-md w-full appearance-none peer px-6 pt-6 pb-1 focus:outline-blue-600/80 h-[70]"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0   peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
}
