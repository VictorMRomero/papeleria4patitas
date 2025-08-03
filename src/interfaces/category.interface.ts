export interface Category {
    id: string
    title: string
    slug: string
    description: string
    parentId: string | null
    parent?: Category | null
    subcategories?: Category[]
}

export interface CategoriesResponse {
    ok: boolean
    total: number
    allCategories: Category[]
}