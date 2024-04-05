import { Metadata } from "next";

async function getData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60, //время в секундах с которым запрос будет обновляться
      },
    }
  );
  return response.json();
}

type Props = {
  params: {
    id: string;
  };
};

// генерация метаданных для динамического роутинга
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  //возврат промиса. хз чё это
  const post = await getData(id); //запрос данных
  return {
    title: post.title, //динамическая генерация поста
  };
}

export default async function Post({ params: { id } }: Props) {
  const post = await getData(id);
  console.log(post);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
