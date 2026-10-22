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
const schema = yup
  .object({
    name: yup.string(),
    avatar: yup
      .string()
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        "Enter a valid image URL",
      ),
    email: yup.string().matches(EMAIL_REGEXP, "Invalid email format"),
    phone: yup.string().matches(PHONE_REGEXP, "Invalid phone format"),
  })
  .required();

export default function ModalEditUser({ onClose }: ModalEditUserProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(schema),
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
      <form className={css.form}>
        <div className={css.avatarWrap}>
          <div className={css.avatarPreview}>
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Your avatar"
                width={80}
                height={80}
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
                errors.name
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
              type="phone"
              {...register("phone")}
              placeholder="+380"
              className={`${css.input} ${
                errors.name
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
        <button type="submit" className={`${css.button} ${css.buttonSub}`}>
          Go to profile
        </button>
      </form>
    </Modal>
  );
}
