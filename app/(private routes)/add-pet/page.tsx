"use client";
import Image from "next/image";
import css from "./AddPet.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/Icon/Icon";
import { useEffect, useRef, useState } from "react";
import { uploadPetImage } from "@/lib/cloudinary/cloudinary";
import { addPet } from "@/lib/api/clientApi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PetBlock from "@/components/PetBlock/PetBlock";
import { getNoticeSpecies } from "@/lib/api/clientApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/authStore";
import { currentUserFullInfo } from "@/lib/api/clientApi";

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
      .required("Photo is required. Click please Upload photo.")
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
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AddPetForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const router = useRouter();
  const titleValue = watch("title");
  const nameValue = watch("name");
  const imgURLValue = watch("imgURL");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isSpeciesTouched, setIsSpeciesTouched] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const species = await getNoticeSpecies();
        setSpeciesOptions(species);
      } catch {
        toast.error("Failed to load pet types.");
      }
    };

    fetchSpecies();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

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
      const imageUrl = await uploadPetImage(file);

      setValue("imgURL", imageUrl, {
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

  const onSubmit = async (data: AddPetForm) => {
    try {
      await addPet(data);
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to add pet. Please try again.",
        );
      } else {
        toast.error("Something went wrong while adding the pet.");
      }

      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const updatedUser = await currentUserFullInfo(token);
        dispatch(setUser(updatedUser));
      } catch {
        toast.error(
          "Pet added successfully, but the profile could not be refreshed.",
        );
      }
    }

    toast.success("Pet added successfully!");
    router.push("/profile");
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
                  <div className={css.avatarPreview}>
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Pet photo preview"
                        width={68}
                        height={68}
                        unoptimized
                      />
                    ) : (
                      <Icon name="pet-avatar" className={css.avatarIcon} />
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
                      {...register("imgURL")}
                      placeholder="Enter URL"
                      className={`${css.input} ${
                        errors.imgURL
                          ? css.inputError
                          : imgURLValue
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

                  {errors.imgURL && (
                    <p className={css.error}>{errors.imgURL.message}</p>
                  )}
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
                    className={`${css.input} ${
                      errors.title
                        ? css.inputError
                        : titleValue?.trim()
                          ? css.inputValid
                          : ""
                    }`}
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
                    placeholder="Pet’s Name"
                    className={`${css.input} ${
                      errors.name
                        ? css.inputError
                        : nameValue?.trim()
                          ? css.inputValid
                          : ""
                    }`}
                  />
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </div>
                <div className={css.wrapBthD_Type}>
                  <div className={css.field}>
                    <label htmlFor="birthday" className={css.dateLabel}>
                      {!watch("birthday") && (
                        <span className={css.datePlaceholder}>00.00.0000</span>
                      )}

                      <input
                        id="birthday"
                        type="date"
                        {...register("birthday")}
                        className={`${css.input} ${css.dateInput} ${
                          errors.birthday
                            ? css.inputError
                            : watch("birthday")
                              ? css.inputValid
                              : ""
                        } ${!watch("birthday") ? css.dateEmpty : ""}`}
                      />

                      <Icon name="calendar" className={css.calendarIcon} />
                    </label>

                    {errors.birthday && (
                      <p className={css.error}>{errors.birthday.message}</p>
                    )}
                  </div>
                  <div className={css.field}>
                    <label htmlFor="species" className="visually-hidden">
                      Type of pet
                    </label>

                    <div className={css.speciesSelect}>
                      <button
                        id="species"
                        type="button"
                        className={`${css.input} ${css.speciesButton} ${
                          !watch("species") ? css.speciesPlaceholder : ""
                        } ${
                          errors.species && isSpeciesTouched
                            ? css.inputError
                            : watch("species")
                              ? css.inputValid
                              : ""
                        }`}
                        onClick={() => {
                          if (isSpeciesOpen) {
                            setIsSpeciesTouched(true);
                            trigger("species");
                          }

                          setIsSpeciesOpen((prev) => !prev);
                        }}
                        aria-expanded={isSpeciesOpen}
                      >
                        <span>{watch("species") || "Type of pet"}</span>
                        <Icon
                          name="chevron-down"
                          className={`${css.speciesArrow} ${
                            isSpeciesOpen ? css.speciesArrowOpen : ""
                          }`}
                        />
                      </button>
                      {errors.species && (
                        <p className={css.error}>{errors.species.message}</p>
                      )}
                      {isSpeciesOpen && (
                        <ul className={css.speciesDropdown}>
                          {speciesOptions.map((species) => (
                            <li key={species}>
                              <button
                                type="button"
                                className={css.speciesOption}
                                onClick={() => {
                                  setValue("species", species, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  });
                                  setIsSpeciesOpen(false);
                                }}
                              >
                                {species}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <input type="hidden" {...register("species")} />
                </div>
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
