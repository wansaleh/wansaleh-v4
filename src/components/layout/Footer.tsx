import { tw } from 'twind';

export default function Footer() {
  return (
    <footer className={tw`p-4 text-sm font-semibold tracking-wide text-center`}>
      © {new Date().getFullYear()} By Wan Saleh
    </footer>
  );
}
