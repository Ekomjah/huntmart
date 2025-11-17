import style from "./category.module.css";
import { cn } from "../../../../utils/utils";
export default function HuntCategories({ text, img }) {
  return (
    <div className={style.item}>
      <h2
        className={cn(
          style.text,
          "text-lg font-semibold text-(--hunt-surface)",
        )}
      >
        {text.toUpperCase()}
      </h2>
      <img src={img} alt={text} className={style.img} />
    </div>
  );
}
