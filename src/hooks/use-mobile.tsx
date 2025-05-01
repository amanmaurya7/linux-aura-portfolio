
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Set initial state
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileDevice)
    }
    
    // Check on mount
    checkIfMobile()
    
    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern event listener approach
    const handleResize = () => checkIfMobile()
    window.addEventListener('resize', handleResize)
    
    // Also listen to orientation change for mobile devices
    window.addEventListener('orientationchange', handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return isMobile
}
