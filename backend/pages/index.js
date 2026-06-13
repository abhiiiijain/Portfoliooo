export default function Home() {
  return null;
}

export async function getServerSideProps() {
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) {
    return {
      redirect: { destination: `${frontendUrl.replace(/\/$/, "")}/admin`, permanent: false },
    };
  }
  return { props: {} };
}
