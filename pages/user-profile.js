function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// getServerSideProps: 배포된 서버와 개발 서버에서만 실행
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('Server side code');

  return {
    props: {
      username: 'Summer',
    },
  };
}
