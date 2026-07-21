const url = "https://jsonplaceholder.typicode.com/users";

async function getData(url) {
  try {
    if (!url) {
      throw new Error("Enter URL");
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

console.log(getData(url));

try {
  const response = await fetch(url);
  const users = await response.json();

  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
  }
} catch (error) {
  console.log(error.name);
}
