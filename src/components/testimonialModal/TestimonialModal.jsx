import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './testimonial.scss';
import { TestimonialAPI } from '../../api/testimonial/testimonial.api';
import Swal from 'sweetalert2';
const TestimonialModal = ({ data, show, setShow }) => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [theme, setTheme] = useState("light");

    const testimonialApi = new TestimonialAPI();

  const handleTestimonialDeletion = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await testimonialApi.delete(id);
          setShow(false);
          if (res) {
            Swal.fire("Deleted!", "Experience has been deleted.", "success");
          }

        } catch (error) {
          console.log(error);
          setShow(false);
        }
      }
    });
  };

    const approveTestimonial = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const res = await testimonialApi.approveTestimonial(id);
                    if (res) {
                        Swal.fire({
                            title: "Approved!",
                            text: "Successfully Approved.",
                            icon: "success"
                        });
                        setShow(false);

                    }
                } catch (error) {
                    console.log(error);
                }

            }
        });


    }
    useEffect(() => {
        if (show) {
            const storedTheme = localStorage.getItem("theme") || "light";
            setTheme(storedTheme);
            console.log("Theme fetched:", storedTheme);
        }
    }, [show]); // Runs only when `show` changes

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            className={theme === "dark" ? "dark-theme" : "light-theme"}
            data-bs-theme={theme}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="modal-title">Testimonial Profile</div>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="testimonial-profile-container">
                    <div className="testimonial-profile">
                        <img src={data.profile} alt={data.name} />
                        <div className="profile-info">
                            <div className="profile-name">{data.name}</div>
                            <div className="profile-email">{data.email}</div>
                            {data.linkedIn && <a className="profile-linkedin" href={data.linkedIn}>Linkedin</a>
                            }
                        </div>
                    </div>
                    <div className="testimonial-content">
                        <div className="content-title">Testimonial</div>
                        <div className="content">{data.review}</div>
                    </div>
                </div>
            </Modal.Body>
            {data.approval === "pending" && (
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => approveTestimonial(data.id)}>
                        Approve
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Decline
                    </Button>

                </Modal.Footer>
            )}


            {data.approval === "approved" && (
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleTestimonialDeletion(data.id)}>
                        Delete
                    </Button>

                </Modal.Footer>
            )}
        </Modal>
    )
}

export default TestimonialModal