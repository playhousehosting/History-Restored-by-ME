"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { useAuthActions } from "@convex-dev/auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Eye, ImageIcon, FileText, Mail, Users, CheckCircle, Clock, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { ProjectForm } from "@/components/admin/ProjectForm"
import { BlogForm } from "@/components/admin/BlogForm"
import type { Id } from "@convex/_generated/dataModel"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  // All hooks MUST be called first, unconditionally (React 19 strict rules)
  // DO NOT DESTRUCTURE - causes SSR issues with React 19
  const router = useRouter();
  const authActions = useAuthActions();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const projects = useQuery(api.projects.getAll);
  const blogPosts = useQuery(api.blogPosts.getAll);
  const contactSubmissions = useQuery(api.contactSubmissions.getAll);
  const users = useQuery(api.users.getAll);
  const deleteProjectMutation = useMutation(api.projects.remove);
  const deleteBlogMutation = useMutation(api.blogPosts.remove);
  const deleteContactMutation = useMutation(api.contactSubmissions.remove);
  const updateContactStatusMutation = useMutation(api.contactSubmissions.updateStatus);
  const deleteUserMutation = useMutation(api.users.deleteUser);

  // Handle loading state
  if (!authActions || !authActions.signOut) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 w-48"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    )
  }

  if (projects === undefined || blogPosts === undefined || contactSubmissions === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  const deleteProject = async (id: Id<"projects">) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      await deleteProjectMutation({ id })
      toast.success("Project deleted successfully")
    } catch (error) {
      toast.error("Failed to delete project")
    }
  }

  const deleteBlogPost = async (id: Id<"blogPosts">) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      await deleteBlogMutation({ id })
      toast.success("Blog post deleted successfully")
    } catch (error) {
      toast.error("Failed to delete blog post")
    }
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog ({blogPosts.length})
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-700">Manage Projects</h2>
            <Button
              onClick={() => {
                setEditingProject(null)
                setShowProjectForm(true)
              }}
              className="bg-red-700 hover:bg-red-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {projects.length === 0 ? (
            <Alert>
              <AlertDescription>
                No projects yet. Create your first restoration project to showcase your work!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project._id} className="overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {project.featured && (
                      <Badge className="absolute top-2 right-2 bg-red-700">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{project.status}</Badge>
                      <Badge variant="outline">
                        {project.images?.length || 0} images
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/gallery/${project._id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProject(project)
                          setShowProjectForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProject(project._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-700">Manage Blog Posts</h2>
            <Button
              onClick={() => {
                setEditingBlog(null)
                setShowBlogForm(true)
              }}
              className="bg-red-700 hover:bg-red-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {blogPosts.length === 0 ? (
            <Alert>
              <AlertDescription>
                No blog posts yet. Share your restoration stories and expertise!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {post.title}
                          {post.published ? (
                            <Badge className="bg-green-600">Published</Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {post.excerpt}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/blog/${post.slug}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingBlog(post)
                          setShowBlogForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteBlogPost(post._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-700">Contact Form Submissions</h2>
          </div>

          {!contactSubmissions || contactSubmissions.length === 0 ? (
            <Alert>
              <AlertDescription>
                No contact submissions yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {contactSubmissions.map((submission: any) => (
                <Card key={submission._id} className={submission.status === "new" ? "border-red-200 bg-red-50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {submission.subject}
                          {submission.status === "new" && (
                            <Badge className="bg-red-600">New</Badge>
                          )}
                          {submission.status === "read" && (
                            <Badge variant="outline">Read</Badge>
                          )}
                          {submission.status === "responded" && (
                            <Badge className="bg-green-600">Responded</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="space-y-1">
                            <p><strong>From:</strong> {submission.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${submission.email}`} className="text-red-700 hover:underline">{submission.email}</a></p>
                            {submission.phone && <p><strong>Phone:</strong> <a href={`tel:${submission.phone}`} className="text-red-700 hover:underline">{submission.phone}</a></p>}
                            <p><strong>Date:</strong> {new Date(submission.createdAt).toLocaleString()}</p>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {submission.status === "new" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              await updateContactStatusMutation({ id: submission._id, status: "read" })
                              toast.success("Marked as read")
                            } catch (error) {
                              toast.error("Failed to update status")
                            }
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      {submission.status !== "responded" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              await updateContactStatusMutation({ id: submission._id, status: "responded" })
                              toast.success("Marked as responded")
                            } catch (error) {
                              toast.error("Failed to update status")
                            }
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Mark as Responded
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          if (!confirm("Are you sure you want to delete this submission?")) return
                          try {
                            await deleteContactMutation({ id: submission._id })
                            toast.success("Submission deleted")
                          } catch (error) {
                            toast.error("Failed to delete submission")
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-700">User Management</h2>
            <Button
              onClick={() => router.push("/auth/register")}
              className="bg-red-700 hover:bg-red-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          {!users || users.length === 0 ? (
            <Alert>
              <AlertDescription>
                No users found. Create your first user via the /auth/register page.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user: any) => (
                <Card key={user._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {user.name || "Unnamed User"}
                    </CardTitle>
                    <CardDescription>
                      {user.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <strong>Joined:</strong> {new Date(user._creationTime).toLocaleDateString()}
                      </p>
                      {user.emailVerificationTime && (
                        <p className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Email Verified
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={async () => {
                          if (!confirm(`Are you sure you want to delete user ${user.name || user.email}?`)) return
                          try {
                            await deleteUserMutation({ id: user._id })
                            toast.success("User deleted successfully")
                          } catch (error) {
                            toast.error("Failed to delete user")
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowProjectForm(false)
            setEditingProject(null)
          }}
          onSave={() => {
            setShowProjectForm(false)
            setEditingProject(null)
          }}
        />
      )}

      {showBlogForm && (
        <BlogForm
          post={editingBlog}
          onClose={() => {
            setShowBlogForm(false)
            setEditingBlog(null)
          }}
          onSave={() => {
            setShowBlogForm(false)
            setEditingBlog(null)
          }}
        />
      )}
    </div>
  )
}
