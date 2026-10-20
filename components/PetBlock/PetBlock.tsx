import Image from "next/image";
import css from "./PetBlock.module.css"

export default function PetBlock() {
return (
    <picture >
        <source
            media="(min-width: 1280px)"
            srcSet="/images/addPets/addPets_desc.webp"
        />

        <source
            media="(min-width: 768px)"
            srcSet="/images/addPets/addPets_tab.webp"
        />

        <Image
            src="/images/addPets/addPets_mob.webp"
            alt="dog"
            width={335}
            height={213}
            sizes="100vw"
            className={css.image}
            loading="eager"
            fetchPriority="high"
        />
    </picture>
    )
}