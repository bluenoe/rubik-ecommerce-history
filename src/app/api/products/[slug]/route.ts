import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const product = await prisma.product.findUnique({
      where: {
        slug,
        status: 'ACTIVE',
      },
      include: {
        category: true,
        attributes: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

    // Calculate rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => {
      const count = product.reviews.filter(review => review.rating === rating).length
      const percentage = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0
      return { rating, count, percentage }
    })

    const productWithRating = {
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: product._count.reviews,
      ratingDistribution,
      _count: undefined,
    }

    return NextResponse.json(productWithRating)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    const {
      name,
      description,
      price,
      comparePrice,
      sku,
      inventory,
      images,
      categoryId,
      featured,
      status,
      attributes,
    } = body

    // Find existing product
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Generate new slug if name changed
    let newSlug = slug
    if (name && name !== existingProduct.name) {
      newSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Update product
    const product = await prisma.product.update({
      where: { slug },
      data: {
        ...(name && { name }),
        ...(newSlug !== slug && { slug: newSlug }),
        ...(description !== undefined && { description }),
        ...(price && { price }),
        ...(comparePrice !== undefined && { comparePrice }),
        ...(sku && { sku }),
        ...(inventory !== undefined && { inventory }),
        ...(images && { images }),
        ...(categoryId && { categoryId }),
        ...(featured !== undefined && { featured }),
        ...(status && { status }),
        ...(attributes && {
          attributes: {
            deleteMany: {},
            create: attributes.map((attr: any) => ({
              name: attr.name,
              value: attr.value,
            })),
          },
        }),
      },
      include: {
        category: true,
        attributes: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const product = await prisma.product.findUnique({
      where: { slug },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { slug },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}