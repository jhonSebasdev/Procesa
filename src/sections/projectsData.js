import { imageProjects } from "./imagesManifest";

function toProject(p) {
  const gallery = (p.images ?? []).map((src) => {
    const isVideo = /\.mp4$|\.webm$|\.ogg$|\.mov$/i.test(src);
    return { type: isVideo ? "video" : "image", src };
  });
  return {
    slug: p.slug,
    title: p.title,
    location: "",
    year: "",
    image: gallery.find((m) => m.type === "image")?.src ?? gallery[0]?.src ?? "/imagenes/logo.png",
    description: "",
    gallery,
  };
}

export const projects = imageProjects.map(toProject);

