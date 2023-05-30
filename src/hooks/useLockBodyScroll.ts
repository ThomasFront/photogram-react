import { useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

type UseLockedBodyOutput = [boolean, (locked: boolean) => void]

function useLockBodyScroll(
  initialLocked = false,
  rootId = '___gatsby',
): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked)

  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return
    }

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'

    const root = document.getElementById(rootId) 
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
  }, [initialLocked])

  return [locked, setLocked]
}

export default useLockBodyScroll
