import { useState, FC, useRef, MouseEvent } from 'react'
import { Page, Pagination } from '../../constains/interface'
import clsx from 'clsx'
import OverlayTrigger from './OverlayTrigger'

const Page: FC<Partial<Page>> = (props) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const dark: boolean = props?.dark ? props.dark : false
    const size: string = props?.size && ["lg", "md", "sm"].includes(props.size) ? props.size : "md"
    const [page, setPage] = useState<number>(1)
    const length: number = props && props.total && props.pagesize ? Math.floor((props.total - 1) / props.pagesize) + 1 : 0
    const handleChange = (pg: number) => {
        if (pg <= length && pg >= 1) {
            props?.onChange && props.onChange(pg)
            setPage(pg)
        }
    }
    const handleEllipsis = () => {
        const handleGoto = (event: MouseEvent) => {
            const target = event.target as Node
            const parent = target.parentNode
            const input = parent?.querySelector('input')
            input && !isNaN(parseInt(input.value)) && handleChange(parseInt(input.value))
        }
        return (
            <div className='flex gap-1 h-6'>
                <p className='w-10 flex items-center'>Go to:</p>
                <input className='text-black w-10 px-1' />
                <div className='border cursor-pointer flex items-center px-1' onClick={event => handleGoto(event)}>Go</div>
            </div>
        )
    }

    const Pagination: FC<Partial<Pagination>> = (props) => {
        return (
            <div onClick={() => props?.onClick && props.onClick()} className={clsx(props?.className ? props.className : '', 'border flex items-center justify-center cursor-pointer hover:scale-105',
                { 'font-bold text-2xl': props?.page ? props.page === page : false },
                { 'shadow-light-even': dark && props?.page ? props.page === page : false },
                { 'shadow-dark-even': !dark && props?.page ? props.page === page : false },
                { 'bg-zinc-700 text-white': dark },
                { 'w-8 h-8': size === "sm" },
                { 'w-12 h-12': size === "md" },
                { 'w-16 h-16': size === "lg" },
                { 'bg-white text-black': !dark })}>
                {props?.children ? props.children : <></>}
            </div>
        )
    }
    const PaginationEllipsis: FC<Partial<Pagination>> = () => {
        return (
            <OverlayTrigger
                placement='top'
                trigger='click'
                dark
                animation='pulse'
                overlay={() => handleEllipsis()}>
                <Pagination className='ellipsis-page'>
                    ...
                </Pagination>
            </OverlayTrigger>
        )
    }
    const renderPages = () => {

        if (length < 2) {
            return <></>
        }
        if (length < 11) {
            return (
                <>
                    {Array.from({ length: length }, (_, index) => index + 1)?.map((item: number) => {
                        return (
                            <Pagination key={item} page={item} onClick={() => handleChange(item)}>
                                {item}
                            </Pagination>
                        )
                    })
                    }
                </>
            )
        }
        if (page < 5) {
            return (
                <>
                    {Array.from({ length: page + 1 }, (_, index) => index + 1)?.map((item: number) => {
                        return (
                            <Pagination key={item} page={item} onClick={() => handleChange(item)}>
                                {item}
                            </Pagination>
                        )
                    })
                    }
                    <PaginationEllipsis />
                    <Pagination page={length} onClick={() => handleChange(length)}>
                        {length}
                    </Pagination>
                </>
            )
        }
        if (page > length - 4) {
            return (
                <>
                    <Pagination page={1} onClick={() => handleChange(1)}>
                        {1}
                    </Pagination>
                    <PaginationEllipsis />
                    {Array.from({ length: length - page + 2 }, (_, index) => page + index - 1)?.map((item: number) => {
                        return (
                            <Pagination key={item} page={item} onClick={() => handleChange(item)}>
                                {item}
                            </Pagination>
                        )
                    })
                    }
                </>
            )
        }
        return (
            <>
                <Pagination page={1} onClick={() => handleChange(1)}>
                    {1}
                </Pagination>
                <PaginationEllipsis />
                <Pagination page={page - 1} onClick={() => handleChange(page - 1)}>
                    {page - 1}
                </Pagination>
                <Pagination page={page} onClick={() => handleChange(page)}>
                    {page}
                </Pagination>
                <Pagination page={page + 1} onClick={() => handleChange(page + 1)}>
                    {page + 1}
                </Pagination>
                <PaginationEllipsis />
                <Pagination page={length} onClick={() => handleChange(length)}>
                    {length}
                </Pagination>
            </>
        )
    }
    return (
        <div ref={containerRef} className='page-container flex gap-1 m-12 justify-center'>
            {length >= 2 &&
                <Pagination onClick={() => page > 1 && handleChange(page - 1)} className='previous-page'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Pagination>
            }
            {renderPages()}
            {length >= 2 &&
                <Pagination onClick={() => page < length && handleChange(page + 1)} className='previous-page'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </Pagination>
            }
        </div>
    )
}

export default Page