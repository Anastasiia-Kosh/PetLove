import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NewsPage.module.css";
import NewsList from "@/components/NewsList/NewsList";
import { getNews } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";

interface NewsPageProps {
  searchParams: Promise<{
    keyword?: string;
    page?: string;
  }>;
}

export default async function NewsPage(props: NewsPageProps) {
  const { keyword, page } = await props.searchParams;
  const currentPage = Number(page ?? 1);
  const { results, totalPages } = await getNews({ keyword, page: currentPage });
  console.log({ currentPage, totalPages, results: results.length });
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.titleWrap}>
          <h1 className={css.title}>News</h1>
          <SearchBox />
        </div>

        <NewsList results={results} />

        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </section>
  );
}
