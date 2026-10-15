import { getFriends } from "@/lib/api/clientApi";
import css from "./FriendsPage.module.css";
import FriendsList from "@/components/FriendsList/FriendsList";

export default async function FriendsPage() {
  const friends = await getFriends();
  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Our friends</h1>
        <FriendsList friends={friends} />
      </div>
    </section>
  );
}
