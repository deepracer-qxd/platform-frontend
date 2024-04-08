export async function fetchWrapper(url: string, body: any) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }, 
    body: body
  });
  console.log(data)
  const result = await data.json();

  return result;
}