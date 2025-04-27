import { prisma } from "../../config/prisma";

export async function getCategoriesServices() {
    const categories = await prisma.category.findMany({
        include: {
            subcategories: {
                select: {
                    id: true,
                    name: true,
                },
            },
            skills: {
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    description: true,
                    categoryId: true,
                    subcategoryId: true,
                },
            },
        },
    });
    return categories;
}
