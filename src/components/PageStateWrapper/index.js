export default function PageStateWrapper({
  icon,
  label,
  maxWidth = 'max-w-[160px]'
}) {
  return (
    <div className="m-auto flex  flex-col items-center justify-center gap-3 text-zinc-400 dark:text-zinc-400">
      <div className={`w-full ${maxWidth}`}>{icon}</div>
      <p className="text-center text-lg">{label}</p>
    </div>
  )
}
