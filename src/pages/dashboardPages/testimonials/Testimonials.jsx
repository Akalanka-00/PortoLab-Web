import React, { useEffect, useState } from 'react';
import './testimonials.scss';
import { data, useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { TestimonialAPI } from '../../../api/testimonial/testimonial.api';
import TestimonialModal from '../../../components/testimonialModal/TestimonialModal';

const TestimonialsPage = () => {
  const navigate = useNavigate();
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);
  const [declinedTestimonials, setDeclinedTestimonials] = useState([]);
  const [testimonialLoading, setTestimonialLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [approvedMenuOptionIndex, setApprovedMenuOptionIndex] = useState(-1);
  const [declinedMenuOptionIndex, setDeclinedMenuOptionIndex] = useState(-1);

  const testimonialApi = new TestimonialAPI();

  const closeModal = () => {
    setShowModal(false);
    fetchTestimonials(); // Refresh data when modal closes
  };

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialApi.getTestimonials();
      setPendingTestimonials(data.filter((test) => test.approval === 'pending'));
      setApprovedTestimonials(data.filter((test) => test.approval === 'approved'));
      setDeclinedTestimonials(data.filter((test) => test.approval === 'declined'));
    } catch (error) {
      console.log(error);
    } finally {
      setTestimonialLoading(false);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);

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
          if (res) {
            Swal.fire("Deleted!", "Experience has been deleted.", "success");
            setApprovedTestimonials(approvedTestimonials.filter(test => test.id !== id));
            setDeclinedTestimonials(declinedTestimonials.filter(test => test.id !== id));
          }

        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const openTestimonialModal = (testimonial) => {
    setApprovedMenuOptionIndex(-1);
    setModalData(testimonial);
    setShowModal(true);
  }

  const handleStatusChange = async (id, status) => {
    setApprovedMenuOptionIndex(-1);
    try {
      const newStatus = status === 'public' ? 'private' : 'public';
      const res = await testimonialApi.changeStatus(id, newStatus);
      if (res) {
        setApprovedTestimonials(approvedTestimonials.map(test => test.id === id ? { ...test, status: newStatus } : test));

      }
    } catch (error) {
      console.log(error);
    };
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.testimonial-options')) {
        setDeclinedMenuOptionIndex(-1);
        setApprovedMenuOptionIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-content-container testimonial-container">
      {testimonialLoading ? (
        <div className="loading-spinner">Loading testimonials...</div>
      ) : (
        ['Pending', 'Approved', 'Declined'].map((status, index) => {
          const testimonials = status === 'Pending' ? pendingTestimonials : status === 'Approved' ? approvedTestimonials : declinedTestimonials;
          if (status === "Declined" && testimonials.length === 0) return <div key={index}></div>
          if (status === "Pending" && testimonials.length === 0) return <div key={index}></div>
          else return (
            <div className='mt-4' key={index}>
              <div className="header"><div className="header-title">{status} Testimonials</div></div>
              {testimonials.length === 0 ? (
                <div className="empty-data-message">No {status.toLowerCase()} testimonials available.</div>
              ) : (
                <table className="testimonial-table">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Email</th>
                      {status === 'Approved' && <th>Visibility</th>}
                      <th>Review</th>
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((test, idx) => (
                      <tr key={test.id} onClick={() => openTestimonialModal(test)}>
                        <td><img src={test.profile} alt={test.name} width="50" /></td>
                        <td>{test.name}</td>
                        <td>{test.email}</td>
                        {status === 'Approved' && <td>{test.status}</td>}
                        <td>{test.review.length > 50 ? test.review.slice(0, 50) + "..." : test.review}</td>
                        <td>
                          <div className='testimonial-options'>
                            {status === 'Pending' && (
                              <>

                              </>
                            )}
                            {status === 'Approved' && (
                              <>
                                <SlOptionsVertical onClick={(e) => { e.stopPropagation(); setApprovedMenuOptionIndex(idx) }} />
                                {approvedMenuOptionIndex === idx && (
                                  <div className="testimonial-options-dropdown">
                                    <div className="testimonial-option" onClick={() => openTestimonialModal(test)}>View</div>
                                    <div className="testimonial-option" onClick={(e) => { e.stopPropagation(); handleTestimonialDeletion(test.id) }}>Delete</div>
                                    <div className="testimonial-option" onClick={(e) => { e.stopPropagation(); handleStatusChange(test.id, test.status) }}>{test.status == "public" ? "Make it private" : "Make it public"}</div>

                                  </div>
                                )}
                              </>
                            )}
                            {status === 'Declined' && (
                              <>

                                <SlOptionsVertical onClick={() => handleTestimonialDeletion(test.id)} />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })
      )}
      <TestimonialModal show={showModal} setShow={closeModal} data={modalData} />
    </div>
  );
};

export default TestimonialsPage;