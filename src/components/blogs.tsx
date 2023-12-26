"use client";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { cosmic } from "@/lib/cosmic";

import { PageIntro } from "./PageIntro";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { Border } from "./Border";
import { Button } from "./Button";

const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.",
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const blogPerPage = 3;
  const pagesVisited = pageNumber * blogPerPage;
  const pageCount = Math.ceil(blogs.length / blogPerPage);

  useEffect(() => {
    cosmic.objects
      .find({ type: `${process.env.NEXT_PUBLIC_OBJECT_TYPES}` })
      .then(({ objects }) => {
        setBlogs(objects);
      });
  }, []);

  const handleChangePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams
          finds new ways to re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {blogs
            .slice(pagesVisited, pagesVisited + blogPerPage)
            .map((blog: any) => {
              return (
                <FadeIn key={blog.id}>
                  <article>
                    <Border className="pt-16">
                      <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                        <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                          <h2 className="font-display text-2xl font-semibold text-neutral-950">
                            <Link
                              href={`/${blog.slug}`}
                              // as={`/blog/${blog.fields.blog_title}`}
                            >
                              {blog.metadata.blog_title}
                            </Link>
                          </h2>
                          <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                            <dt className="sr-only">Published</dt>
                            <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                              <time dateTime={blog.metadata.blog_published}>
                                {blog.metadata.blog_published}
                              </time>
                            </dd>
                            <dt className="sr-only">Author</dt>
                            <dd className="mt-6 flex gap-x-4">
                              <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                                <Image
                                  alt=""
                                  src={`${blog.metadata.author_image.url}`}
                                  className="h-12 w-12 object-cover grayscale"
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <div className="text-sm text-neutral-950">
                                <div className="font-semibold">
                                  {blog.metadata.author_name}
                                </div>
                                <div>{blog.metadata.author_role}</div>
                              </div>
                            </dd>
                          </dl>
                          <p className="mt-6 max-w-2xl text-base text-neutral-600">
                            {blog.metadata.blog_sub_title}
                          </p>
                          <Button
                            href={`/${blog.slug}`}
                            aria-label={`Read more: ${blog.metadata?.blog_title}`}
                            className="mt-8"
                            // as={`/blog/${blog.fields.blog_title}`}
                          >
                            Read more
                          </Button>
                        </div>
                      </div>
                    </Border>
                  </article>
                </FadeIn>
              );
            })}
        </div>

        {/* pagination */}
        {blogs?.length > 3 && (
          <div className="mt-20">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handleChangePage}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
        )}
      </Container>
    </>
  );
}
