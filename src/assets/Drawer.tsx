"use client"

import { X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

// Replacement for cn function
function combineClassNames(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

interface DrawerProps {
  children: React.ReactNode
  className?: string
  initialHeight?: number
  minHeight?: number
  maxHeight?: number
  isOpen?:boolean
  setIsOpen: any,
 
}

export default function Drawer({
  isOpen,
  setIsOpen,
  children,
  className,
  initialHeight = 200,
  minHeight = 100,
  maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.9 : 800,
}: DrawerProps) {
  const [height, setHeight] = useState(initialHeight)
  const [isDragging, setIsDragging] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const startHeight = useRef(0)

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement
    const dragHandle = dragHandleRef.current

    // Only start dragging if the user clicked/touched the drag handle
    if (!dragHandle?.contains(target)) return

    setIsDragging(true)
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
    startHeight.current = height
  }, [height])

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = startY.current - currentY
    const newHeight = Math.min(Math.max(startHeight.current + deltaY, minHeight), maxHeight)

    requestAnimationFrame(() => {
      setHeight(newHeight)
    })

    // Prevent default to stop scrolling while dragging
    e.preventDefault()
  }, [isDragging, maxHeight, minHeight])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return

    const handleTouchStart = (e: TouchEvent) => handleDragStart(e)
    const handleMouseDown = (e: MouseEvent) => handleDragStart(e)
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e)
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e)

    drawer.addEventListener('touchstart', handleTouchStart, { passive: false })
    drawer.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchend', handleDragEnd)
    window.addEventListener('mouseup', handleDragEnd)

    return () => {
      drawer.removeEventListener('touchstart', handleTouchStart)
      drawer.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchend', handleDragEnd)
      window.removeEventListener('mouseup', handleDragEnd)
    }
  }, [handleDragStart, handleDragMove, handleDragEnd])

  return (
    <div
      ref={drawerRef}
      className={combineClassNames(
        "fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl transition-shadow",
        isDragging && "shadow-3xl",
        className
      )}
      style={{
        height: `${height}px`,
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
        touchAction: 'none',
      }}
    >
      <div 
        ref={dragHandleRef}
        className="absolute top-0 left-0 bg-white right-0 h-9 cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="w-12 h-2 bg-muted-foreground/20 rounded-full mx-auto mt-3" />
        <X onClick={()=>setIsOpen(false)} className="absolute cursor-pointer right-3 top-2"/>
      </div>
      <div 
        className="h-full overflow-y-auto pt-8 pb-safe overscroll-contain"
        style={{ 
          touchAction: isDragging ? 'none' : 'pan-y',
        }}
      >
        {children}
      </div>
    </div>
  )
}