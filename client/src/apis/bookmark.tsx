import axios from 'axios';

export interface BookmarkProps {
  recipeId: string;
  userId: string;
}

interface BookmarkIdProps {
  id: string;
}
export const getBookmarksByUserId = async (props: BookmarkIdProps) => {
  const { id } = props;
  try {
    const bookmarks = await axios.get(`http://localhost:5050/bookmark/${id}`);
    return bookmarks.data;
  } catch (err) {
    console.error(err);
  }
};

export const addBookmark = async (props: BookmarkProps) => {
  try {
    const bookmark = await axios.post('http://localhost:5050/bookmark/', { ...props });
    return bookmark.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookmark = async (props: BookmarkIdProps) => {
  const { id } = props;

  try {
    const bookmark = await axios.delete(`http://localhost:5050/bookmark/${id}`);
    return bookmark.data;
  } catch (err) {
    console.error(err);
  }
};
