import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const blogDir = "blogs";

  const files = fs.readdirSync(path.join(blogDir));

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  return (
    <main>
      <h1>My Next.js Blog Site</h1>
      <section>
        <h2>Latest Posts</h2>
        <div>
          {blogs.map((blog) => (
            <Link href={"/blogs/" + blog.slug} passHref key={blog.slug}>
              <div>
                <div>
                  <h3>{blog.meta.title}</h3>
                </div>
                <div>
                  <p>{blog.meta.description}</p>
                </div>
                <div>
                  <p>{blog.meta.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
