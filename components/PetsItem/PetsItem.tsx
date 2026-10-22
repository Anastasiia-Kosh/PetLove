import { Pet } from "@/types/pet";
import css from "./PetsItem.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { currentUserFullInfo, removePet } from "@/lib/api/clientApi";
import { setUser } from "@/lib/store/authStore";
import { useAppDispatch } from "@/lib/store/hooks";
import toast from "react-hot-toast";

interface PetsItemProps {
  pet: Pet;
}

export default function PetsItem({ pet }: PetsItemProps) {
  const dispatch = useAppDispatch();

  const handleRemovePet = async () => {
    try {
      await removePet(pet._id);
    } catch {
      toast.error("Failed to remove pet.");
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const updatedUser = await currentUserFullInfo(token);
        dispatch(setUser(updatedUser));
      } catch {
        toast.error(
          "Pet removed successfully, but the profile could not be refreshed.",
        );
      }
    }

    toast.success("Pet removed successfully.");
  };

  const formattedDate = pet.birthday
    ? new Date(pet.birthday.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"))
        .toLocaleDateString("en-GB")
        .replaceAll("/", ".")
    : "Unknown";

  return (
    <article className={css.card}>
      <div className={css.photoWrapper}>
        <Image
          src={pet.imgURL}
          alt={pet.title}
          fill
          className={css.photo}
          loading="eager"
          sizes="(min-width: 1280px) 315px, (min-width: 768px) 294px, 66px"
        />
      </div>
      <div className={css.content}>
        <h2 className={css.title}>{pet.title}</h2>

        <ul className={css.features}>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Name</p>
            <p className={css.featuresDescr}>{pet.name}</p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Birthday</p>
            <p className={css.featuresDescr}>{formattedDate}</p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Sex</p>

            <p className={css.featuresDescr}>
              {pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)}
            </p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Species</p>
            <p className={css.featuresDescr}>
              {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
            </p>
          </li>
        </ul>
      </div>
      <button
        type="button"
        className={css.buttonTrash}
        onClick={handleRemovePet}
      >
        <Icon name="trash" className={css.trash} />
      </button>
    </article>
  );
}
