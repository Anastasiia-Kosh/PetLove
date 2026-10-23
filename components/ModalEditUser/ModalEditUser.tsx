"use client";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import css from "./ModalEditUser.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadAvatar } from "@/lib/cloudinary/cloudinary";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/authStore";
import { currentUserFullInfo, updateUser } from "@/lib/api/clientApi";
import axios from "axios";

interface ModalEditUserProps {
  onClose: () => void;
}
interface EditUserForm {
  name: string;
  avatar: string;
  email: string;
  phone: string;
}
const EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const PHONE_REGEXP = /^\+38\d{10}$/;
const AVATAR_REGEXP = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;

const schema = yup.object({
  name: yup.string().trim().required("Name is required"),

  email: yup
    .string()
    .required("Email is required")
    .matches(EMAIL_REGEXP, "Invalid email format"),

  avatar: yup
    .string()
    .required("Avatar is required")
    .matches(AVATAR_REGEXP, "Enter a valid image URL"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(PHONE_REGEXP, "Phone must have the format +38XXXXXXXXX"),
});

export default function ModalEditUser({ onClose }: ModalEditUserProps) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      avatar: user?.avatar ?? "",
      phone: user?.phone ?? "",
    },
  });

  const avatarValue = watch("avatar");
  const nameValue = watch("name");
  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Choose a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setIsUploading(true);

    try {
      const imageUrl = await uploadAvatar(file);

      setValue("avatar", imageUrl, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      toast.success("Photo uploaded successfully!");
    } catch (error) {
      setAvatarPreview(null);
      toast.error(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

    const onSubmit = async (data: EditUserForm) => {
        const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Your session has expired. Please log in again.");
    return;
  }
    try {
      await updateUser(data);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Your session has expired. Please log in again.");
        return;
      }

      const updatedUser = await currentUserFullInfo(token);

      dispatch(setUser(updatedUser));
      toast.success("Your information has been updated!");
      onClose();
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to update your information. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Modal onClose={onClose} className={css.modalEditUser}>
      <button
        type="button"
        onClick={onClose}
        className={css.modalClose}
        aria-label="Close modal"
      >
        <Icon name="close" className={css.icon_close} />
      </button>
      <h2 className={css.title}>Edit information</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarWrap}>
          <div className={css.avatarPreview}>
            {avatarPreview || user?.avatar ? (
              <Image
                src={avatarPreview ?? user!.avatar}
                alt="Your avatar"
                fill
                sizes="(min-width: 768px) 86px, 80px"
                unoptimized
              />
            ) : (
              <Icon name="user" className={css.avatarIcon} />
            )}
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            hidden
          />

          <div className={css.avatarControls}>
            <input
              type="text"
              {...register("avatar")}
              placeholder="Enter URL"
              className={`${css.input} ${
                errors.avatar
                  ? css.inputError
                  : avatarValue
                    ? css.inputValid
                    : ""
              }`}
              readOnly
            />

            <button
              type="button"
              className={css.uploadButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload photo"}
              <Icon name="cloud" className={css.uploadIcon} />
            </button>
          </div>

          {errors.avatar && (
            <p className={css.error}>{errors.avatar.message}</p>
          )}
        </div>
        <div className={css.fieldsWrap}>
          <div className={css.field}>
            <label htmlFor="name" className="visually-hidden">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`${css.input} ${
                errors.name
                  ? css.inputError
                  : nameValue?.trim()
                    ? css.inputValid
                    : ""
              }`}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
          <div className={css.field}>
            <label htmlFor="email" className="visually-hidden">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`${css.input} ${
                errors.email
                  ? css.inputError
                  : emailValue?.trim()
                    ? css.inputValid
                    : ""
              }`}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.field}>
            <label htmlFor="phone" className="visually-hidden">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+38"
              className={`${css.input} ${
                errors.phone
                  ? css.inputError
                  : phoneValue?.trim()
                    ? css.inputValid
                    : ""
              }`}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`${css.button} ${css.buttonSub}`}
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </form>
    </Modal>
  );
}
