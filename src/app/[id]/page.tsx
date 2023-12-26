import BlogPage from "@/components/blog";

export default async function SingleBlog({ params }: { params: { id: string } }) {
  return (
    <>
      <BlogPage id={params.id} />
    </>
  );
}
