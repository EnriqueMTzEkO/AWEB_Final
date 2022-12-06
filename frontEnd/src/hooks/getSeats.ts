import axios from '../api/axios';

interface ISeats {
  id: string;
  row: number;
  slot: number;
  status: number;
};

export const getSeats = async (id: string) => {
  try {
    const response = await axios.get(`/resources/show/seat/${id}`);
    const temp = response?.data?.seats;

    const seats: Array<Array<ISeats>> = Array.from({length: 3}, () => []);
    
    for (let i = 0; i < 3; i++) {
      // @ts-ignore: Never bug
      seats[i] = temp.filter(e => e.row == i + 1);
    };
    console.log(seats);
    return seats;
  } catch (e) {
    console.log(e);
  }
};