console.log("SCRIPT RUN")
const evtSource = new EventSource("events");
const eventList = document.querySelector("ul");
console.log(eventList)

evtSource.onmessage = (e) => {
    console.log("message", e)
    const newElement = document.createElement("li");
    newElement.textContent = `messa ge: ${e.data}`;
    eventList.appendChild(newElement);
};
