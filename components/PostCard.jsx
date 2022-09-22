const PostCard = ({post}) => {
   return (
      <div>
         {post.title} <br />
         {post.excerpt} <br /> <br />
      </div>
   )
};

export default PostCard;