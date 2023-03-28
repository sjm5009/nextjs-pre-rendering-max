import fs from 'fs/promises';
import path from 'path';
import { Fragment } from 'react';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // blocking 일경우 주석처리
  if (!loadedProduct) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  // 동적인 pid 구할 수 있음
  const { pid } = params;

  const data = await getData();

  const product = data.products.find((cur) => cur.id === pid);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((cur) => cur.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    // paths: [{ params: { pid: 'p1' } } /* , { params: { pid: 'p2' } }, { params: { pid: 'p3' } } */],
    paths: pathsWithParams,
    fallback: true,
    // fallback: 'blocking'
  };
}

export default ProductDetailPage;
