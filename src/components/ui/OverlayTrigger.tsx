import clsx from "clsx"
import { OverlayTrigger } from "../../constains/interface"
import { FC, useEffect, useState, useRef } from "react"

const OverlayTrigger: FC<Partial<OverlayTrigger>> = (props) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const rounded: string = props?.rounded && props.rounded.startsWith("rounded") ? props.rounded : ""
    const animation: string = props?.animation ? props.animation : "fade"
    const trigger: string = props?.trigger && ["hover", "click"].includes(props.trigger) ? props.trigger : "hover"
    const [isHover, setIsHover] = useState<boolean>(false)
    const [isClick, setIsClick] = useState<boolean>(false)
    const placement: string = props?.placement && ["auto", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"].includes(props.placement) ? props.placement : "auto"
    const [position, setPosition] = useState<string>(placement !== "auto" ? placement : "")
    const [positionClasses, setPositionClasses] = useState<string>('')
    useEffect(() => {
        switch (position) {
            case "top-start":
                return setPositionClasses('bottom-full right-3/4')
            case "top":
                return setPositionClasses('bottom-full left-1/2 -translate-x-1/2')
            case "top-end":
                return setPositionClasses('bottom-full left-3/4')
            case "right-start":
                return setPositionClasses('bottom-3/4 left-full')
            case "right":
                return setPositionClasses('top-1/2 -translate-y-1/2 left-full')
            case "right-end":
                return setPositionClasses('top-3/4 left-full')
            case "bottom-start":
                return setPositionClasses('top-full right-3/4')
            case "bottom":
                return setPositionClasses('top-full left-1/2 -translate-x-1/2')
            case "bottom-end":
                return setPositionClasses('top-full left-3/4')
            case "left-start":
                return setPositionClasses('bottom-3/4 right-full')
            case "left":
                return setPositionClasses('top-1/2 -translate-y-1/2 right-full')
            case "left-end":
                return setPositionClasses('top-3/4 right-full')
            default: break
        }
    }, [position])
    useEffect(() => {
        const handleRootClose = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node) && overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setIsClick(false)
            }
            if (containerRef.current && containerRef.current.contains(event.target as Node) && overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setIsClick(true)
            }
        }
        document.addEventListener('click', (event) => handleRootClose(event))
    }, [])
    useEffect(() => {
        const calculateDistanceToEdges = () => {
            if (containerRef.current && overlayRef.current) {
                const { top, left, bottom, right } = containerRef.current.getBoundingClientRect()
                const distanceToTop = top
                const distanceToLeft = left
                const distanceToBottom = window.innerHeight - bottom
                const distanceToRight = window.innerWidth - right

                const width = overlayRef.current.offsetWidth
                const height = overlayRef.current.offsetHeight

                if (distanceToRight > width && distanceToTop >= 0 && distanceToBottom >= 0) {
                    setPosition("right")
                } else if (distanceToBottom > height && distanceToLeft >= 0 && distanceToRight >= 0) {
                    setPosition("bottom")
                } else if (distanceToLeft > width && distanceToTop >= 0 && distanceToBottom >= 0) {
                    setPosition("left")
                } else if (distanceToTop > height && distanceToLeft >= 0 && distanceToRight >= 0) {
                    setPosition("top")
                } else {
                    setPosition("bottom-end")
                }
            }
        }
        if (placement === "auto") {
            calculateDistanceToEdges()
            document.addEventListener('resize', calculateDistanceToEdges)
            document.addEventListener('scroll', calculateDistanceToEdges)
        }
    }, [])
    return (
        <div ref={containerRef} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
            className={clsx('overlay relative', props?.className && props.className)}>
            {props?.children}
            <div ref={overlayRef} className={clsx('absolute p-2', positionClasses)}>
                <div className={clsx('overlay-trigger border p-4', { 'bg-black text-white': props?.dark ? props.dark : false },
                    { 'bg-white text-black': props?.dark ? !props.dark : true },
                    { 'opacity-0': animation === "fade" ? trigger === "hover" ? !isHover : !isClick : false },
                    { 'scale-0': animation === "pulse" ? trigger === "hover" ? !isHover : !isClick : false },
                    { 'transition-all': animation }, rounded)}>
                    {props?.overlay && props.overlay()}
                </div>
            </div>
        </div>
    )
}

export default OverlayTrigger