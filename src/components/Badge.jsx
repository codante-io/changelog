export function Badge({
  className,
  compact = false,
  large = false,
  type = 'Código',
  ...props
}) {
  return (
    <div>
      <span
        className={`${
          type === 'Código'
            ? 'bg-blue-200 text-blue-800'
            : 'bg-purple-300 text-purple-800'
        }  rounded-full p-1 px-2 text-xs ${className}`}
      >
        {type}
      </span>
    </div>
  )
}
