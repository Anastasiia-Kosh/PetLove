import Image from "next/image";
import Link from "next/link";
import css from "./Auth.module.css"

export default function Login() {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.imageWrapper}>
            <picture className={css.authPicture}>
              <source
                media="(min-width: 1280px)"
                srcSet="/images/auth/desc-reg.webp"
              />

              <source
                media="(min-width: 768px)"
                srcSet="/images/auth/tabl-reg.webp"
              />

              <Image
                src="/images/auth/mob-reg.webp"
                alt="woman with a dog"
                width={335}
                height={280}
                sizes="100vw"
                className={css.authImage}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            
          </div>
          <form className={css.form} >
            <div className={css.field}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                className={css.input}
                required
              />
            </div>

            <div className={css.field}>
              <label htmlFor="password" className={css.label}>
                Пароль
              </label>

              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                className={css.input}
                required
              />
            </div>

            {/* {error && <p className={css.error}>{error}</p>} */}

            <button type="submit" className={css.button} >
              REGISTRATION
            </button>

            <p className={css.switchText}>
              Already have an account?
              <Link href="/sign-in" className={css.switchLink}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
