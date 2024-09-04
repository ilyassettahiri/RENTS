import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useCollapseNav(initialCollapseDesktop = false, initialOpenMobile = false) {
  const [openMobile, setOpenMobile] = useState(initialOpenMobile);
  const [collapseDesktop, setCollapseDesktop] = useState(initialCollapseDesktop);

  const onCollapseDesktop = useCallback(() => {
    setCollapseDesktop((prev) => !prev);
  }, []);

  const onCloseDesktop = useCallback(() => {
    setCollapseDesktop(false);
  }, []);

  const onOpenMobile = useCallback(() => {
    setOpenMobile(true);
  }, []);

  const onCloseMobile = useCallback(() => {
    setOpenMobile(false);
  }, []);

  return {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    //
    openMobile,
    onOpenMobile,
    onCloseMobile,
  };
}
