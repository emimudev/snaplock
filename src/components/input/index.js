export default function Input({
  label,
  labelProps = {},
  className = '',
  ...inputProps
}) {
  return (
    <div>
      {label && (
        <label
          for="first_name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus-visible:outline-none  focus-visible:ring-2 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400/60  dark:focus-visible:ring-blue-400 ${className}`}
        {...inputProps}
      />
    </div>
  )
}
