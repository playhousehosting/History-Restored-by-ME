import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

// POST new project
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, status, featured, images } = body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        status: status || "completed",
        featured: featured || false,
        images: {
          create: images?.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt || title,
            order: index,
          })),
        },
      },
      include: { images: true },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to create project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
