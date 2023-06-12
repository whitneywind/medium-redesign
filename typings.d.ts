export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    comments: FormInput;
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
    intro: string;
}

export interface FormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
    }