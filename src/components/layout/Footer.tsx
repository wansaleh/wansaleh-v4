import NowPlaying from '../NowPlaying';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 text-sm w-full">
      <NowPlaying showLink />

      <div className="font-semibold pb-4 px-4 text-center text-gray-500 tracking-tight">
        © {new Date().getFullYear()} By Wan Saleh
      </div>
    </footer>
  );
}
