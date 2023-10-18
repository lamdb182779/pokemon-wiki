import { ReactNode } from "react"

export interface Pagination {
    children: ReactNode,
    className: string,
    onClick: () => any,
    page: number,
}

export interface Page {
    dark: boolean,
    total: number,
    pagesize: number,
    size: string,
    onChange: (pg: number) => any,
}

export interface OverlayTrigger {
    children: ReactNode,
    className: string,
    dark: boolean,
    overlay: () => ReactNode,
    placement: string,
    trigger: string,
    rounded: string,
    animation: string,
}