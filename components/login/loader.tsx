export default function ConcentricLoader() {
    return (
      <div className="flex w-full flex-col items-center justify-center ">
        <div className="flex h-6 w-6 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400 text-4xl text-blue-400">
          <div className="flex h-4 w-4 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400 text-2xl text-red-400"></div>
        </div>
      </div>
    );
  }