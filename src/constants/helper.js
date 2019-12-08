
import moment from "moment";

export const getAge = (birthday) => moment().diff(birthday, 'years');

export const getBMRMen = (weight, height, age) => 10 * weight + 6.25 * height - 5 * age + 5;

export const getBMRWomen = (weight, height, age) => 10 * weight + 6.25 * height - 5 * age - 161;


