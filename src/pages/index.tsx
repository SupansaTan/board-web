import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/blog",
      permanent: false,
    },
  };
};

const Home: React.FC = () => null;
export default Home;
