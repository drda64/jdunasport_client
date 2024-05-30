import axios from "axios";
import {Participant} from "@/models/Participant.js";

export default class Category {
    constructor(id, name, capacity, participants = []) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
    }
}