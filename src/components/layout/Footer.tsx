import NowPlaying from '../NowPlaying';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full text-sm">
      <NowPlaying showLink />

      <div className="px-4 pb-4 text-center font-semibold tracking-tight">
        © {new Date().getFullYear()} By Wan Saleh.{' '}
        <a href="https://tally.so/r/w2Z0Dw">Let’s work together.</a>
      </div>
    </footer>
  );
}
