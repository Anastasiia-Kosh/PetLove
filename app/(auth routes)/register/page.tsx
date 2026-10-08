"use client";
import Image from "next/image";
import Link from "next/link";
import css from "./Auth.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/Icon/Icon";
import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}
const EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .matches(EMAIL_REGEXP, "Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterForm) => {
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
                srcSet="/images/auth/desc_reg.webp"
              />

              <source
                media="(min-width: 768px)"
                srcSet="/images/auth/tabl_reg.webp"
              />

              <Image
                src="/images/auth/mob_reg.webp"
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
                  src="/images/avatar/cat.png"
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
                  <li className={css.catName}>Jack</li>
                  <li className={css.catBrthd}>
                    <span className={css.catBrthd_accent}>Birthday: </span>
                    18.10.2021
                  </li>
                </ul>
                <p className={css.catDescr}>
                  Jack is a gray Persian cat with green eyes. He loves to be
                  pampered and groomed, and enjoys playing with toys.
                </p>
              </div>
            </div>
          </div>

          <div className={css.formWrapper}>
            <h1 className={css.title}>Registration</h1>
            <p className={css.description}>
              Thank you for your interest in our platform.
            </p>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={css.fieldsWrap}>
                <div className={css.field}>
                  <label htmlFor="name" className="visually-hidden">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    autoComplete="name"
                    placeholder="Name"
                    className={`${css.input} ${
                      touchedFields.name
                        ? errors.name
                          ? css.inputError
                          : css.inputValid
                        : ""
                    }`}
                  />

                  {touchedFields.name && errors.name && (
                    <Icon name="nocheck" className={css.fieldIcon} />
                  )}
                  {touchedFields.name && !errors.name && (
                    <Icon name="check" className={css.fieldIcon} />
                  )}
                </div>
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}

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

                <div className={css.field}>
                  <label htmlFor="confirm" className="visually-hidden">
                    Confirm password
                  </label>

                  <input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    {...register("confirm")}
                    placeholder="Confirm password"
                    className={`${css.input} ${
                      touchedFields.confirm
                        ? errors.confirm
                          ? css.inputError
                          : css.inputValid
                        : ""
                    }`}
                  />

                  {touchedFields.confirm && errors.confirm && (
                    <Icon
                      name="nocheck"
                      className={css.passwordValidationIcon}
                    />
                  )}
                  {touchedFields.confirm && !errors.confirm && (
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
                {errors.confirm && (
                  <p className={css.error}>{errors.confirm.message}</p>
                )}
              </div>
              {/* {error && <p className={css.error}>{error}</p>} */}

              <button type="submit" className={css.button}>
                REGISTRATION
              </button>

              <p className={css.switchText}>
                Already have an account?{" "}
                <span className={css.switchLink}>
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
