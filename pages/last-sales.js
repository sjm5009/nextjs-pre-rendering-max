import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  const { data, err } = useSWR('https://nextjs-course-max-73280-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json', fetcher);

  useEffect(() => {
    if (data) {
      console.log(data);

      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://nextjs-course-max-73280-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!sales) {
  //   return <p>No data</p>;
  // }

  if (err) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading ...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://nextjs-course-max-73280-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json');

  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
  };
}

export default LastSalesPage;
