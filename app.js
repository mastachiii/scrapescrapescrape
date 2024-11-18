const button = document.querySelector("button");
let list;

async function addToList() {
    let response;
    let input = document.querySelector("input").value;
    // list not empty == mutate to api list
    if (!list) {
        await fetch("http://localhost:3001/list")
            .then((r) => r.json())
            .then((r) => {
                response = r;
                list = r.items;
            });
    }

    input = input.split("/").at(-1);

    if (!list.includes(input)) {
        list.push(input);
    }

    response.items = list;

    fetch("http://localhost:3001/list", {
        method: "PUT",
        body: JSON.stringify(response),
    }).then((r) => r.json());

    list = null;
}

button.addEventListener("click", addToList);
