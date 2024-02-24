import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  return paths;
}

function getPost({ slug }) {
  const markdownFile = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Page({ params }) {
  const props = getPost(params);

  return (
    <article className="postContainer">
      <h1 className="title-xl">{props.frontMatter.title}</h1>
      <h4>Por {props.frontMatter.autor}</h4>
      <MDXRemote source={props.content}></MDXRemote>
    </article>
  );
}
