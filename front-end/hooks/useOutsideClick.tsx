import { useEffect, useRef } from 'react';

const useOutsideClick = (
  callback: () => void,
  exceptionExists: boolean,
  exceptionNodes?: HTMLElement[] | null
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (
          exceptionNodes &&
          exceptionNodes.some((node) => node.contains(event.target as Node))
        ) {
          return; // Don't trigger callback if clicked inside the exceptionNodes
        }

        callback();
      }
    };
    if (exceptionNodes || !exceptionExists) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (exceptionNodes || !exceptionExists) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [callback, exceptionNodes, exceptionExists]);

  return ref;
};

export default useOutsideClick;
