export default function IdeaSkeleton() {
  return (
    <section className="flex items-center justify-between p-5 text-white bg-[#10162F] rounded-lg animate-pulse">
      <div className="flex flex-col gap-2 w-10/12">
        <div className="h-8 bg-[#363E5F] rounded-md w-1/3"></div>

        <div className="space-y-2">
          <div className="h-4 bg-[#363E5F] rounded w-5/6"></div>
          <div className="h-4 bg-[#363E5F] rounded w-4/6"></div>
          <div className="h-4 bg-[#363E5F] rounded w-3/6"></div>
        </div>

        <div className="mt-5">
          <div className="h-8 bg-[#363E5F] rounded-lg w-[10rem]"></div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg p-2">
        <div className="h-8 w-8 bg-[#363E5F] rounded-md"></div>
        <div className="h-6 w-6 bg-[#363E5F] rounded"></div>
        <div className="h-8 w-8 bg-[#363E5F] rounded-md"></div>
      </div>
    </section>
  );
}
