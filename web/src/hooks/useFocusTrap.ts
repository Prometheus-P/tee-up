import { useEffect, RefObject, useCallback } from 'react';

interface UseFocusTrapOptions {
  onClose?: () => void;
}

const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
  options: UseFocusTrapOptions = {}
) => {
  const { onClose } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      if (e.key === 'Escape') {
        onClose?.();
      }
    },
    [containerRef, onClose]
  );

  useEffect(() => {
    if (isActive && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      console.log('Focus trap activated. First element:', firstElement);
      if (firstElement) {
        firstElement.focus();
        console.log('Attempted to focus first element:', firstElement);
      } else {
        console.log('No first element found to focus.');
      }
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, containerRef, handleKeyDown]);
};

export default useFocusTrap;
