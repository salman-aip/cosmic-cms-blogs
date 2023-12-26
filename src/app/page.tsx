import BlogsPage from "@/components/blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.",
};

export default function Home() {
  return (
    <div className="mb-24">
      <BlogsPage />
    </div>
  );
}
