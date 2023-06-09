import axios from 'axios';
import { Recipe } from './recipe';

export interface BookmarkProps {
  recipe: Recipe;
  userId: string;
  _id?: string;
}

interface BookmarkIdProps {
  id: string;
}

export const getBookmarksByUserId = async (props: BookmarkIdProps) => {
  const { id } = props;
  try {
    const bookmarks = await axios.get(`https://tasting-table.herokuapp.com/bookmark/${id}`);
    // const bookmarks = await axios.get(`http://localhost:5050/bookmark/${id}`);
    return bookmarks.data;
  } catch (err) {
    console.error(err);
  }
};

export const addBookmark = async (props: BookmarkProps) => {
  try {
    const bookmark = await axios.post('https://tasting-table.herokuapp.com/bookmark/', {
      ...props
    });
    // const bookmark = await axios.post('http://localhost:5050/bookmark/', { ...props });
    return bookmark.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookmark = async (props: BookmarkIdProps) => {
  const { id } = props;

  try {
    const bookmark = await axios.delete(`https://tasting-table.herokuapp.com/bookmark/${id}`);
    // const bookmark = await axios.delete(`http://localhost:5050/bookmark/${id}`);
    return bookmark.data;
  } catch (err) {
    console.error(err);
  }
};
