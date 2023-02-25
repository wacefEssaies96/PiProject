// Inside "pages/users.js"
export default function ListArticles({ articles }) {
  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {articles.map((article, index) => {
          return <li key={index}>{article.title}</li>
        })}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetching data
  const res = await fetch(`${process.env.backurl}/api/admin/articles/find-all`);
  const data = await res.json();
  // Passing data to the Product Page using props
  return {
    props: {
      articles: data
    }
  }


}