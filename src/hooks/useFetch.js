import { useCallback, useState, useEffect } from 'react';

const useFetch = (url, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setPending(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch(url);
      const d = await response.json();
      setData(d);
    } catch (e) {
      setError(e);
    }
    setPending(false);
  }, [url]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, data, error };
};

export default useFetch;
