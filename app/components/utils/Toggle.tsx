type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  title?: string;
};

export default function Toggle({ checked, onChange, title }: ToggleProps) {
  return (
    <div className="flex flex-row gap-2 items-center mb-2">
      <label className="group relative inline-flex w-11 shrink-0 rounded-full bg-neutral-200 p-0.5 inset-ring inset-ring-white/10 outline-offset-2 outline-secondary transition-colors duration-200 ease-in-out has-checked:bg-primary has-focus-visible:outline-2 cursor-pointer">
        <span className="size-5 rounded-full  bg-neutral-600 shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
        <input
          name="setting"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label="Use setting"
          className="absolute inset-0 appearance-none focus:outline-hidden cursor-pointer"
        />
      </label>
      {title && <p className="text-xs">{title}</p>}
    </div>
  );
}
