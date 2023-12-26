import { createBucketClient } from "@cosmicjs/sdk";

export const cosmic = createBucketClient({
  bucketSlug: `${process.env.NEXT_PUBLIC_BUCKET_SLUG}`,
  readKey: `${process.env.NEXT_PUBLIC_BUCKET_READ_KEY}`,
  writeKey: `${process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY}`,
});
