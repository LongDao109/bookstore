export interface BookCategory {
    _id: string;
    name: string;
    id: string;
}
export interface CategoryBook {
    _id: string;
    title: string;
    category: string;
    id: string;
}
export interface Category {
    _id: string;
    name: string;
    description: string;
    image: string;
    featured: boolean;
    order?: number;
    createdAt: string;
    updatedAt: string;
    slug: string;
    __v: number;
    books: CategoryBook[];
    id: string;
}
