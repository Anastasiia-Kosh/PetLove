"use client";
import Image from "next/image";
import Link from "next/link";
import css from "./Login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/Icon/Icon";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}
const EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const schema = yup
  .object({
    email: yup
      .string()
      .matches(EMAIL_REGEXP, "Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
  })
  .required();

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.imageWrapper}>
            <picture className={css.authPicture}>
              <source
                media="(min-width: 1280px)"
                srcSet="/images/auth/desc_log.webp"
              />

              <source
                media="(min-width: 768px)"
                srcSet="/images/auth/tabl_log.webp"
              />

              <Image
                src="/images/auth/mob_log.webp"
                alt="cat"
                width={335}
                height={280}
                sizes="100vw"
                className={css.authImage}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <div className={css.card}>
              <div className={css.cardImage}>
                <Image
                  src="/images/avatar/dog.png"
                  alt="cat"
                  width={32}
                  height={32}
                  sizes="100vw"
                  loading="eager"
                  fetchPriority="high"
                  className={css.image}
                />
              </div>
              <div className={css.cardInfo}>
                <ul className={css.cardName}>
                  <li className={css.catName}>Rich</li>
                  <li className={css.catBrthd}>
                    <span className={css.catBrthd_accent}>Birthday: </span>
                    21.09.2020
                  </li>
                </ul>
                <p className={css.catDescr}>
                  Rich would be the perfect addition to an active family that
                  loves to play and go on walks. I bet he would love having a
                  doggy playmate too!
                </p>
              </div>
            </div>
          </div>

          <div className={css.formWrapper}>
            <h1 className={css.title}>Log in</h1>
            <p className={css.description}>
              Welcome! Please enter your credentials to login to the platform:
            </p>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={css.fieldsWrap}>
                <div className={css.field}>
                  <label htmlFor="email" className="visually-hidden">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    placeholder="Email"
                    className={`${css.input} ${
                      touchedFields.email
                        ? errors.email
                          ? css.inputError
                          : css.inputValid
                        : ""
                    }`}
                  />

                  {touchedFields.email && errors.email && (
                    <Icon name="nocheck" className={css.fieldIcon} />
                  )}
                  {touchedFields.email && !errors.email && (
                    <Icon name="check" className={css.fieldIcon} />
                  )}
                </div>
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}

                <div className={css.field}>
                  <label htmlFor="password" className="visually-hidden">
                    Password
                  </label>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    autoComplete="new-password"
                    placeholder="Password"
                    className={`${css.input} ${
                      touchedFields.password
                        ? errors.password
                          ? css.inputError
                          : css.inputValid
                        : ""
                    }`}
                  />

                  {touchedFields.password && errors.password && (
                    <Icon
                      name="nocheck"
                      className={css.passwordValidationIcon}
                    />
                  )}
                  {touchedFields.password && !errors.password && (
                    <Icon name="check" className={css.passwordValidationIcon} />
                  )}
                  <button
                    type="button"
                    className={css.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon name={showPassword ? "eye" : "eye-off"} />
                  </button>
                </div>
                {errors.password && (
                  <p className={css.error}>{errors.password.message}</p>
                )}
              </div>
              {/* {error && <p className={css.error}>{error}</p>} */}

              <button type="submit" className={css.button}>
                LOG IN
              </button>

              <p className={css.switchText}>
                Don`t have an account?
                <span className={css.switchLink}>
                  <Link href="/register"> Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
