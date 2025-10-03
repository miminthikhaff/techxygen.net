export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A0519] dark:border-[#A53860] mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
