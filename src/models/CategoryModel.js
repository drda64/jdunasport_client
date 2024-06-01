import axios from "axios";
import {ParticipantModel} from "@/models/ParticipantModel.js";

export default class CategoryModel {
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
                // Mapping participants array into ParticipantModel objects
                const participants = category.participants.map(participant => {
                    const date = new Date(participant.created_at)
                    return new ParticipantModel(participant.id, participant.username, participant.substitute, date);
                });
                return new CategoryModel(category.id, category.name, category.capacity, participants);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error; // Propagate the error
        }
    }

}