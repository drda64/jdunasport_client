import axios from "axios";

export default class EventModel {
    constructor(name, description, location, date, time, sport, categories, created_by_user) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
        this.sport = sport;
        this.categories = categories;
        this.created_by_user = created_by_user
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

    static async getAllEvents(history, date_up, page) {
        try {
            const response = await axios.get("/events", {
                params: {
                    history: history.value,
                    date_up: date_up.value,
                    page: page.value
                }
            });

            const responseData = response.data;

            // Extract pagination information from the response
            const totalPages = responseData.total_pages;
            const currentPage = responseData.current_page;
            const perPage = responseData.per_page;

            // Map event data to EventModel objects
            const events = responseData.events.map(event => {
                let fetchedDatetime = new Date(event.event_time);

                let dateStr = `${fetchedDatetime.getDate()}.${fetchedDatetime.getMonth() + 1}.${fetchedDatetime.getFullYear()}`;

                // Format the time
                let hours = String(fetchedDatetime.getHours()).padStart(2, '0');
                let minutes = String(fetchedDatetime.getMinutes()).padStart(2, '0');
                let timeStr = `${hours}:${minutes}`;

                const item = new EventModel(event.name, event.description, event.location, dateStr, timeStr, event.sport, event.categories, event.created_by_user);
                item.setId(event.id);

                return item;
            });

            return {
                events: events,
                totalPages: totalPages,
                currentPage: currentPage,
                perPage: perPage
            };
        } catch (error) {
            console.error("Error fetching events:", error);
            throw error; // Propagate the error for handling
        }
    }

    static async getEventById(id) {
        const response = await axios.get(`/event/${id}`);
        console.log(response.data)

        let fetchedDatetime = new Date(response.data.event_time);

        let dateStr = `${fetchedDatetime.getDate()}.${fetchedDatetime.getMonth() + 1}.${fetchedDatetime.getFullYear()}`;

        // Format the time
        let hours = String(fetchedDatetime.getHours()).padStart(2, '0');
        let minutes = String(fetchedDatetime.getMinutes()).padStart(2, '0');
        let timeStr = `${hours}:${minutes}`;

        const item = new EventModel(response.data.name, response.data.description, response.data.location, dateStr, timeStr, response.data.sport, response.data.categories, response.data.created_by_user);
        item.setId(response.data.id);

        return Promise.resolve(item);
    }

    static async joinEvent(id, categoryId) {
        const response = await axios.post(`/join_event/${id}`, {
            category_id: categoryId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async isUserInEvent(id) {
        const response = await axios.get(`/is_participant/${id}`);
        console.log(response.data);
        return response.data;
    }


    static async leaveEvent(id) {
        const response = await axios.post(`/leave_event/${id}`);
    }

    static async deleteEvent(id) {
        const response = await axios.delete(`/delete_event/${id}`).catch(
            function (error) {
                console.error(error.response.data);
                return error.response.data;
            }
        )
    }
}