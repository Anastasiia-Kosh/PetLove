import { Pet } from "@/types/pet";
import css from "./PetsList.module.css";
import PetsItem from "../PetsItem/PetsItem";

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets }: PetsListProps) {
return pets.length === 0 ? (
  <p className={css.itemEmpty}>You haven`t added any pets yet.</p>
) : (
  <ul className={css.list}>
    {pets.map((pet) => (
      <li key={pet._id} className={css.item}>
        <PetsItem pet={pet} />
      </li>
    ))}
  </ul>
);}
