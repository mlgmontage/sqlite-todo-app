const container = document.getElementById("container");

async function fetchData() {
  const response = await fetch("/todos");
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    container.innerHTML += `<li><a href="/todo/${data[i].id}">
      ${data[i].text}
    </a></li>`;
  }
}

fetchData();
