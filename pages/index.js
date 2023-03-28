// fs : file system
// client side 에서는 노출되지 않음
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products &&
        products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('Re-Generationg...');

  // process: Node.js 에서 적역적으로 사용할 수 있는 process 객체
  // cwd: current working directory
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  // fs.readFile : 계속하려면 콜백해야함
  // fs.readFileSync : 파일을 동기적으로 읽고 완료될 때까지 실행을 차단
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return { redirect: { destination: '/' } };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // 10초
    redirect: '/', // data fetching에 실패했을 경우 redirect 경로
  };
}

export default HomePage;
