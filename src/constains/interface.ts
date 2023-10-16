import { ReactNode } from "react"

export interface Pagination {
    children: ReactNode | undefined,
    className: string | undefined,
    onClick: () => any | undefined,
    page: number | undefined,
}

export interface Page {
    dark: boolean | undefined,
    total: number | undefined,
    pagesize: number | undefined,
    onChange: (pg: number) => any | undefined,
}

export interface OverlayTrigger {
    children: ReactNode | undefined,
    className: string | undefined,
    dark: boolean | undefined,
    overlay: () => ReactNode | undefined,
    placement: string | undefined,
    trigger: string | undefined,
    rounded: string | undefined,
    animation: string | undefined,
}