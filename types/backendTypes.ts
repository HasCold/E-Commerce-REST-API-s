export type userTypes = {
    _id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export type productTypes = {
    title: string;
    desc: string;
    image: string;
    categories: any[];
    size: string;
    color: string;
    price: number;
}