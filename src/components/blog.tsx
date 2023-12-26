import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { cosmic } from "@/lib/cosmic";

import { Container } from "./Container";
import { FadeIn, FadeInStagger } from "./FadeIn";
import { GridPattern } from "./GridPattern";
import { Border } from "./Border";
import { ArrowIcon } from "./IconArrow";
import { SectionIntro } from "./SectionIntro";
import { Button } from "./Button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.",
};

interface blogProps {
  slug: string;
}

export default async function BlogPage({ slug }: blogProps) {
  let blogs: any = [];
  let blog: any = {};

  await cosmic.objects
    .findOne({
      type: `${process.env.NEXT_PUBLIC_OBJECT_TYPES}`,
      slug: slug,
    })
    .then(({ object }) => {
      blog = object;
    });

  await cosmic.objects
    .find({ type: `${process.env.NEXT_PUBLIC_OBJECT_TYPES}` })
    .then(({ objects }) => {
      console.log(objects);
      blogs = objects;
    });

  return (
    <>
      {/* back to home */}
      <Link href={"/"} className="flex justify-center items-center pt-12">
        <Button>Back to home</Button>
      </Link>

      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {blog.metadata.blog_title}
            </h1>
            <time
              dateTime={blog.metadata.blog_published}
              className="order-first text-sm text-neutral-950"
            >
              {blog.metadata.blog_published}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {blog.metadata.author_name}, {blog.metadata.author_role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <div className="mx-auto mt-24 flex max-w-5xl flex-col sm:mt-32 lg:mt-40">
            {blog.metadata.blog_description}
          </div>
        </FadeIn>
      </Container>

      {/* More blogs */}
      {blogs.length > 0 && (
        <div className={clsx("relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40")}>
          <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
            <GridPattern
              className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
              yOffset={-270}
            />
          </div>

          <SectionIntro title="More articles" smaller></SectionIntro>

          <Container className={"mt-16"}>
            <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {blogs.map((blog: any) => (
                <FadeIn key={blog.id}>
                  <article key={blog.id}>
                    <Border position="left" className="relative flex flex-col items-start pl-8">
                      <h3 className="mt-6 text-base font-semibold text-neutral-950">
                        {blog.metadata.blog_title}
                      </h3>
                      <time
                        dateTime={blog.metadata.blog_published}
                        className="order-first text-sm text-neutral-600"
                      >
                        {blog.metadata.blog_published}
                      </time>
                      <p className="mt-2.5 text-base text-neutral-600">
                        {blog.metadata.blog_sub_title}
                      </p>
                      <Link
                        href={`${blog.slug}`}
                        className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
                        aria-label={`Read more: ${blog.metadata.blog_title}`}
                      >
                        Read more
                        <ArrowIcon className="w-6 flex-none fill-current" />
                        <span className="absolute inset-0" />
                      </Link>
                    </Border>
                  </article>
                </FadeIn>
              ))}
            </FadeInStagger>
          </Container>
        </div>
      )}
    </>
  );
}
