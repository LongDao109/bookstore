interface Book {
    _id: string;
    title: string;
    price: number;
}

interface OrderItem {
    book: Book;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
    total: number;
    status: string;
    createdAt: string;
}
