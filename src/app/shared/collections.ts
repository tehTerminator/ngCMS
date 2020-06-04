export interface Post {
    id: number;
    title: string;
    body: string;
    slug: string;
    author_id: number;
    revision_date?: string;
    category_id?: number;
}

export interface Comment {
    id: number;
    body: string;
    author_id: number;
    post_id: number;
}

export interface Page {
    id: number;
    title: string;
    body: string;
    slug: string;
    author_id: number;
    revision_date?: string;
}

export interface Category {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}
