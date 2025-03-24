import BaseAPI from "../apiContext";
import Swal from "sweetalert2";

export class TestimonialAPI {
    
    constructor() {
        this._baseApi = new BaseAPI();
    }

    // Get Testimonials by User ID
    async getTestimonials() {
        const response = await this._baseApi.get(`api/testimonial`);
        if (response.status === 200) {
            return response.data;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return null;
        }
    }

    // Approve Testimonial by ID
    async approveTestimonial(testimonialId) {
        const response = await this._baseApi.update(`api/testimonial/approve/${testimonialId}`);
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Testimonial Approved!",
                text: "The testimonial has been successfully approved.",
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }

    // Change Status of a Testimonial by ID
    async changeStatus(testimonialId, status) {
        const response = await this._baseApi.update(`api/testimonial/status/${testimonialId}`, status);
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Status Updated!",
                text: `The testimonial status has been updated to ${status}.`,
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }

    async delete(testimonialId) {
        const response = await this._baseApi.delete(`api/testimonial/${testimonialId}`);
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Successfully Deleted!",
                text: `The testimonial has been successfully deleted.`,
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }
}
