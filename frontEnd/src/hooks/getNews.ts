/**
 * Really stretching "news" here
 */
import axios from 'axios';

export const getNews = async () => {
  const out: Array<string> = [];
  const raw = await axios.get('https://newsapi.org/v2/top-headlines?category=entertainment&country=mx&apiKey=9f9fb0c96ec54b388ca4890ef8001dc6');

  const data = raw.data.articles.slice(0, 5);
  // @ts-ignore: 
  data.forEach(e => {
    out.push(e.title);
  });

  return out;
};