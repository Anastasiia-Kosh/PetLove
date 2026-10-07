import Image from "next/image";
import css from "./page.module.css";

export default function Home() {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.wrap_hero}>
          <div className={css.wrap_title}>
            <h1 className={css.title}>
              Take good <span className={css.title_accent}>care</span> of your
              small pets
            </h1>
            <p className={css.subtitle}>
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
          </div>
          <div className={css.photoWrapper}>
            <picture className={css.heroPicture}>
              <source
                media="(min-width: 1280px)"
                srcSet="/images/home/hero-desktop.webp"
              />

              <source
                media="(min-width: 768px)"
                srcSet="/images/home/hero-tablet.webp"
              />

              <Image
                src="/images/home/hero-mobile.webp"
                alt="woman with a dog"
                width={335}
                height={402}
                sizes="100vw"
                className={css.heroImage}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
