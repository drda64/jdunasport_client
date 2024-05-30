import axios from "axios";

export default class EventItem {
    constructor(name, description, location, date, time, sport, categories) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
        this.sport = sport;
        this.categories = categories;
    }

    setId(id) {
        this.id = id;
    }

    async submitEvent() {
        await axios.post("/create_event", {
            name: this.name,
            description: this.description,
            location: this.location,
            event_time: this.date + " " + this.time.toString(),
            sport_id: this.sport,
            categories: this.categories
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static async getAllEvents() {
        const response = await axios.get("/events");
        console.log(response.data)

        // we returning an array of EventItem objects
        return Promise.resolve(response.data.map(event => {
            let fetchedDatetime = new Date(event.event_time);

            let dateStr = `${fetchedDatetime.getDate()}.${fetchedDatetime.getMonth() + 1}.${fetchedDatetime.getFullYear()}`;

            // Format the time
            let hours = String(fetchedDatetime.getHours()).padStart(2, '0');
            let minutes = String(fetchedDatetime.getMinutes()).padStart(2, '0');
            let timeStr = `${hours}:${minutes}`;

            const item = new EventItem(event.name, event.description, event.location, dateStr, timeStr, event.sport, event.categories);
            item.setId(event.id);

            return item;
        }));
    }
}