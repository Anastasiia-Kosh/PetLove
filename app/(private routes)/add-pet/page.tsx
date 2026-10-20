"use client";
import Image from "next/image";
import css from "./AddPet.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/Icon/Icon";
import { useState } from "react";
import { addPet } from "@/lib/api/clientApi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PetBlock from "@/components/PetBlock/PetBlock";

interface AddPetForm {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
}

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    name: yup.string().required("Name is required"),
    imgURL: yup
      .string()
      .required("Photo is required")
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        "Enter a valid image URL",
      ),
    species: yup.string().required("Species is required"),
    birthday: yup
      .string()
      .required("Birthday is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
    sex: yup.string().required("Sex is required"),
  })
  .required();

export default function AddPetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<AddPetForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const router = useRouter();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const onSubmit = async (data: AddPetForm) => {
    try {
      const pet = await addPet(data);
      toast.success(`The animal has been added successfully!`);
      router.push("/profile");
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ?? "Add pet failed. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.imageWrapper}>
            <PetBlock />
          </div>

          <div className={css.formWrapper}>
            <div className={css.titleWrapper}>
              <h1 className={css.title}>Add my pet / </h1>
              <p className={css.description}>Personal details</p>
            </div>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={css.fieldsWrap}>
                <div className={css.optionsList}>
                  <label
                    className={`${css.customRadio} ${css.customRadioFemale}`}
                  >
                    <input type="radio" {...register("sex")} value="female" />
                    <Icon
                      name="female"
                      className={`${css.iconRadio} ${css.iconFemale}`}
                    ></Icon>
                  </label>
                  <label
                    className={`${css.customRadio} ${css.customRadioMale}`}
                  >
                    <input type="radio" {...register("sex")} value="male" />
                    <Icon
                      name="male"
                      className={`${css.iconRadio} ${css.iconMale}`}
                    ></Icon>
                  </label>
                  <label className={`${css.customRadio} ${css.customMultiple}`}>
                    <input type="radio" {...register("sex")} value="multiple" />
                    <Icon
                      name="multiple"
                      className={`${css.iconRadio} ${css.iconMultiple}`}
                    ></Icon>
                  </label>
                  {errors.sex && (
                    <p className={css.error}>{errors.sex.message}</p>
                  )}
                </div>

                <div className={css.avatarWrap}>
                  {/* Тут буде місце прев'ю фото,що спочатку є іконкою */}
                  {/* Поле Enter URL */}
                  {/* Кнопка Upload  photo */}
                </div>
                <div className={css.field}>
                  <label htmlFor="title" className="visually-hidden">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    placeholder="Title"
                    className={css.input}
                  />
                  {errors.title && (
                    <p className={css.error}>{errors.title.message}</p>
                  )}
                </div>
                <div className={css.field}>
                  <label htmlFor="name" className="visually-hidden">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    className={css.input}
                  />
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </div>
                {/* Тут буде інпут з відкриваючимся календарем, для birthday  */}
                {/* Тут буде Type of pet з випадаючим списком */}
              </div>
              <div className={css.buttonsWrap}>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className={`${css.button} ${css.buttonBack}`}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className={`${css.button} ${css.buttonSub}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
