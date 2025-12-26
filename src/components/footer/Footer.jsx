import { useFetch } from "../../hooks/useFetch";
export default function Footer() {
  const { data: products, isLoading, isError, refetch } = useFetch();
  if (isLoading) {
    return (
      <div className="mx-auto my-8 h-8 w-8 animate-spin rounded-full border-4 border-(--hunt-primary) border-t-transparent"></div>
    );
  }
  if (isError) {
    return (
      <>
        <p>Error fetching footer</p>
        <button onClick={refetch}>Retry</button>
      </>
    );
  }

  const entries = Object.entries(products).map(
    ([, products]) => products.category,
  );
  const myArr = [...new Set(entries)];
  return (
    <div className="mx-auto grid max-w-[1300px] grid-cols-4 items-center justify-center gap-3">
      {myArr.map((el) => {
        return <div>{el}</div>;
      })}
    </div>
  );
}
