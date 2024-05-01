export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-center align-middle">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
}
