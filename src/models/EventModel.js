import axios from "axios"

// EventModel class represents an event with various attributes and provides methods for event management
export default class EventModel {
    // Constructor to initialize an event object
    constructor(name, description, location, date, time, sport, categories, created_by_user) {
        this.name = name
        this.description = description
        this.location = location
        this.date = date
        this.time = time
        this.sport = sport
        this.categories = categories
        this.created_by_user = created_by_user
    }

    // Set the event ID
    setId(id) {
        this.id = id
    }

    // Submit a new event to the server
    async submitEvent() {
        return axios.post("/create_event", {
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
        }).catch(error => {
            console.error("Error submitting event:", error)
            throw error
        })
    }

    // Fetch all events with pagination and filtering options
    static async getAllEvents(history, date_up, page) {
        return axios.get("/events", {
            params: {
                history: history.value,
                date_up: date_up.value,
                page: page.value
            }
        }).then(response => {
            const responseData = response.data

            // Extract pagination information from the response
            const totalPages = responseData.total_pages
            const currentPage = responseData.current_page
            const perPage = responseData.per_page

            // Map event data to EventModel objects
            const events = responseData.events.map(event => {
                let fetchedDatetime = new Date(event.event_time)

                // Format the date
                let dateStr = `${fetchedDatetime.getDate()}.${fetchedDatetime.getMonth() + 1}.${fetchedDatetime.getFullYear()}`

                // Format the time
                let hours = String(fetchedDatetime.getHours()).padStart(2, '0')
                let minutes = String(fetchedDatetime.getMinutes()).padStart(2, '0')
                let timeStr = `${hours}:${minutes}`

                const item = new EventModel(event.name, event.description, event.location, dateStr, timeStr, event.sport, event.categories, event.created_by_user)
                item.setId(event.id)

                return item
            })

            return {
                events: events,
                totalPages: totalPages,
                currentPage: currentPage,
                perPage: perPage
            }
        }).catch(error => {
            console.error("Error fetching events:", error)
            throw error
        })
    }

    // Fetch event details by event ID
    static async getEventById(id) {
        return axios.get(`/event/${id}`).then(response => {
            console.log(response.data)

            let fetchedDatetime = new Date(response.data.event_time)

            // Format the date
            let dateStr = `${fetchedDatetime.getDate()}.${fetchedDatetime.getMonth() + 1}.${fetchedDatetime.getFullYear()}`

            // Format the time
            let hours = String(fetchedDatetime.getHours()).padStart(2, '0')
            let minutes = String(fetchedDatetime.getMinutes()).padStart(2, '0')
            let timeStr = `${hours}:${minutes}`

            const item = new EventModel(response.data.name, response.data.description, response.data.location, dateStr, timeStr, response.data.sport, response.data.categories, response.data.created_by_user)
            item.setId(response.data.id)

            return item
        }).catch(error => {
            console.error("Error fetching event by ID:", error)
            throw error
        })
    }

    // Join an event by ID and category ID
    static async joinEvent(id, categoryId) {
        return axios.post(`/join_event/${id}`, {
            category_id: categoryId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error("Error joining event:", error)
            throw error
        })
    }

    // Check if the user is a participant in an event
    static async isUserInEvent(id) {
        return axios.get(`/is_participant/${id}`).then(response => {
            console.log(response.data)
            return response.data
        }).catch(error => {
            console.error("Error checking user participation:", error)
            throw error
        })
    }

    // Leave an event by ID
    static async leaveEvent(id) {
        return axios.post(`/leave_event/${id}`).catch(error => {
            console.error("Error leaving event:", error)
            throw error
        })
    }

    // Delete an event by ID
    static async deleteEvent(id) {
        return axios.delete(`/delete_event/${id}`).catch(error => {
            console.error("Error deleting event:", error.response ? error.response.data : error)
            throw error
        })
    }

    // Download event details as an iCal file
    downloadICal() {
        const formatDate = date => {
            const year = date.getUTCFullYear()
            const month = String(date.getUTCMonth() + 1).padStart(2, '0')
            const day = String(date.getUTCDate()).padStart(2, '0')
            const hours = String(date.getUTCHours()).padStart(2, '0')
            const minutes = String(date.getUTCMinutes()).padStart(2, '0')
            const seconds = String(date.getUTCSeconds()).padStart(2, '0')
            return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
        }

        const [day, month, year] = this.date.split('.').map(Number)
        const [hours, minutes] = this.time.split(':').map(Number)
        const eventDate = new Date(Date.UTC(year, month - 1, day, hours, minutes))
        const endDate = new Date(eventDate.getTime() + 1 * 60 * 60 * 1000) // Assuming 1 hour duration

        const icsData =
            `BEGIN:VCALENDAR\n
            VERSION:2.0\n
            PRODID:-//jdunasport//NONSGML v1.0//EN\n
            BEGIN:VEVENT\n
            UID:${this.id || 'uid1@example.com'}\n
            DTSTAMP:${formatDate(new Date())}\n
            DTSTART:${formatDate(eventDate)}\n
            DTEND:${formatDate(endDate)}\n
            SUMMARY:${this.name}\n
            DESCRIPTION:${this.description}\n
            LOCATION:${this.location}\n
            URL:http://localhost:5173/event/${this.id}\n
            END:VEVENT\n
            END:VCALENDAR\n`

        const blob = new Blob([icsData], { type: 'text/calendar' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${this.name}.ics`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}
