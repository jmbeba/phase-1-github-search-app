const form = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = e.target[0].value;
    console.log(user);
    fetch(`https://api.github.com/search/users?q=${user}`).then(res => res.json()).then(data => {
        const items = data.items;
        items.map((item) => {
            const card = document.createElement("li");
            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            const a = document.createElement("a");

            card.classList.add("card");

            h2.textContent = item.login;
            img.src = item.avatar_url;
            a.href = item.url; 
            a.textContent = item.login;

            card.appendChild(img);
            card.appendChild(h2);
            card.appendChild(a);

            userList.appendChild(card);

            card.addEventListener("click", (e) => {
                fetch(`https://api.github.com/users/${h2.textContent}/repos`).then(res => res.json()).then(data => {
                    data.map((element) => {
                        const li = document.createElement("li");
                        li.textContent = element.name;

                        reposList.appendChild(li);
                    })
                })
            })
        })
    })
})