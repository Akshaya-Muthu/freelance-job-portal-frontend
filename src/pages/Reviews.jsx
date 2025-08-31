import { useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

export const Reviews = ({ freelancerId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${freelancerId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async () => {
    if (!comment) return toast.error("Comment required");
    try {
      await axios.post("/reviews", { freelancerId, rating, comment });
      toast.success("Review added");
      setComment("");
      fetchReviews();
    } catch (err) { console.error(err); toast.error("Failed to add review"); }
  };

  const handleRespond = async (id) => {
    if (!response) return toast.error("Response required");
    try {
      await axios.put(`/reviews/respond/${id}`, { response });
      toast.success("Responded to review");
      setResponse("");
      fetchReviews();
    } catch (err) { console.error(err); toast.error("Failed to respond"); }
  };

  useEffect(() => { fetchReviews(); }, [freelancerId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="mb-4">
        <select value={rating} onChange={e=>setRating(e.target.value)} className="input">
          {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Star</option>)}
        </select>
        <textarea placeholder="Write a review" value={comment} onChange={e=>setComment(e.target.value)} className="input"/>
        <button onClick={handleAddReview} className="bg-green-600 text-white px-3 py-1 rounded">Add Review</button>
      </div>
      {reviews.map(r => (
        <div key={r._id} className="bg-gray-800 p-3 rounded mb-2">
          <p><b>{r.clientId.name}</b> rated {r.rating} stars</p>
          <p>{r.comment}</p>
          {r.response ? <p className="text-green-400">Response: {r.response}</p> : (
            <div>
              <textarea placeholder="Respond..." value={response} onChange={e=>setResponse(e.target.value)} className="input"/>
              <button onClick={()=>handleRespond(r._id)} className="bg-blue-600 text-white px-3 py-1 rounded mt-1">Respond</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
