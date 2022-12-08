import axios from "../api/axios";

const Ticket = async (mode: number, id: string) => {
  return await axios.get(`/ticket/mode/${mode}/id/${id}`);
};

export default Ticket;