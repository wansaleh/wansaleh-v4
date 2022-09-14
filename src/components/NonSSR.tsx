import { useEffect, useState } from 'react';

export default function NonSSR({ children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser ? children : null;
}

// const NonSSR = dynamic(() => Promise.resolve(NonSSRWrapper), {
//   ssr: false,
// });
