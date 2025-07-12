export default function Loading() {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
      <span className="text-base-content/70 text-lg">Загрузка...</span>
    </div>
  )
}
