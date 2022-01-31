import NowPlaying from '../NowPlaying';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 text-sm w-full">
      <NowPlaying showLink />

      <div className="font-semibold pb-4 px-4 text-center tracking-tight">
        © {new Date().getFullYear()} By Wan Saleh.{' '}
        <a href="https://tally.so/r/w2Z0Dw">Let’s work together.</a>
      </div>
    </footer>
  );
}
