const container = document.getElementById("container");

async function fetchData() {
  const response = await fetch("/todos");
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    container.innerHTML += `<div>
      <h4><a href="/todo/${data[i].id}">
        ${data[i].text}
      </a></h4>
      <form method="POST" action="/todo/delete">
        <input type="text" name="id" value="${data[i].id}" hidden >
        <button type="submit">X</button>
      </form>
    </div>`;
  }
}

fetchData();
