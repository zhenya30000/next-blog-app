'use client' //обязаельно на стороне клиента

export default function ErrorWraper({error} : {error: Error}) {
  return <h1>Error... {error.message}</h1>
}