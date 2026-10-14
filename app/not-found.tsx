import Image from "next/image";
import css from "./not-found.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.content}>
          <div className={css.code}>
            <p className={css.codeNumber}>4</p>
            <div className={css.photoWpap}>
              <Image
                src="/images/auth/404_page.png"
                alt="This page not found"
                fill
                className={css.photo}
                sizes="(min-width: 768px) 280px, 109px"
              />
            </div>
            <p className={css.codeNumber}>4</p>
          </div>
          <div className={css.textWpap}>
            <h1 className={css.title}>Ooops! This page not found</h1>

            <Link href="/" className={css.homeLink}>
              To home page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
