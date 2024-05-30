import axios from "axios";
import {Participant} from "@/models/Participant.js";

export default class Category {
    constructor(id, name, capacity, participants = []) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.participants = participants;
    }

    static async getCategoriesById(id) {
        try {
            const response = await axios.get(`/category/${id}`);
            console.log(response.data)
            return response.data.map(category => {
                // Mapping participants array into Participant objects
                const participants = category.participants.map(participant => {
                    return new Participant(participant.id, participant.username);
                });
                return new Category(category.id, category.name, category.capacity, participants);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error; // Propagate the error
        }
    }

}