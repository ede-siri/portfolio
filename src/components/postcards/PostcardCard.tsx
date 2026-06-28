import type { Postcard } from "@/lib/data";

import PostcardCardEditorial from "@/components/postcards/PostcardCardEditorial";

export default function PostcardCard({ postcard }: { postcard: Postcard }) {
  return <PostcardCardEditorial postcard={postcard} />;
}
