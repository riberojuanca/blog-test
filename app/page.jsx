// Importaciones

import Image from "next/image"; // Permite mostrar imágenes en la página.
import fs from "fs"; // Módulo nativo de Node.js para trabajar con archivos.
import path from "path"; // Módulo nativo de Node.js para trabajar con rutas de archivos.
import matter from "gray-matter"; // Biblioteca para extraer el frontmatter de archivos Markdown.
import Link from "next/link"; // Permite crear enlaces a otras páginas dentro del proyecto Next.js.

export default function Home() {
  const postsDir = "posts";

  const files = fs.readdirSync(path.join(postsDir));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");

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
          {posts.map((post) => (
            <Link href={"/blog/" + post.slug} passHref key={post.slug}>
              <div>
                <div>
                  <h3>{post.meta.title}</h3>
                </div>
                <div>
                  <p>{post.meta.description}</p>
                </div>
                <div>
                  <p>{post.meta.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
