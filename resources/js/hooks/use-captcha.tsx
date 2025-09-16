import { useEffect, useState } from 'react';

export function useCaptcha(config: string = 'default') {
  const [imageUrl, setImageUrl] = useState('');

  const refresh = () => {
    setImageUrl(`/captcha/${config}?t=${Date.now()}`);
  };

  useEffect(() => {
    refresh();
  }, [config]);

  return { imageUrl, refresh };
}
