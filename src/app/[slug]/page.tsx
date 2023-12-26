import BlogPage from "@/components/blog";

export default async function SingleBlog({ params }: { params: { slug: string } }) {
  return (
    <>
      <BlogPage slug={params.slug} />
    </>
  );
}
