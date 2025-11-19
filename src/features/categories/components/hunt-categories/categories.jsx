import style from "./category.module.css";
import { useEffect, useState, useRef } from "react";
import { cn } from "../../../../utils/utils";

export default function HuntCategories({ text, img }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setLoaded(true),
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const src = img.includes("?")
    ? img
    : `${img}?auto=format&fit=crop&w=600&h=600`;

  return (
    <div className={style.item}>
      <h2 className={cn(style.text)}>{String(text).toUpperCase()}</h2>

      <img
        src={src}
        alt={text}
        loading="lazy"
        decoding="async"
        className={`${style.img} ${loaded ? style.imgLoaded : ""}`}
        ref={ref}
      />
    </div>
  );
}
