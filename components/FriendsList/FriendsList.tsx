"use client";

import { Friend } from "@/types/friends";
import css from "./FriendsList.module.css";
import FriendsItem from "../FriendsItem/FriendsItem";

interface FriendsListProps {
  friends: Friend[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <ul className={css.list}>
      {friends.map((friend) => (
        <li key={friend._id} className={css.item}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
}
