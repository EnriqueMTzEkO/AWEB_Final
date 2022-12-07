import axios from '../api/axios';

interface ISeats {
  id: string;
  row: number;
  slot: number;
  status: string;
};

export const getSeats = async (id: string) => {
  try {
    const response = await axios.get(`/resources/show/seat/${id}`);
    const temp = response?.data?.seats;

    const seats: Array<Array<ISeats>> = Array.from({length: 3}, () => []);
    
    for (let i = 0; i < 3; i++) {
      // @ts-ignore: lmao
      let arr = temp.filter(e => e.row == i + 1);
      // @ts-ignore: why do i even use typescript
      arr.forEach((e, i) => {
        arr[i] = {id: e.id, status: `${e.status == 2 ? "seat-reserved" : e.status == 0 ? "seat-free" : "seat-occupied"}`}
      })
      // @ts-ignore: lmao
      seats[i] = arr;
    };

    return seats;
  } catch (e) {
    console.log(e);
  }
};