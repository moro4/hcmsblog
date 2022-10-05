import moment from 'moment';
import parse from 'html-react-parser';

function PostDetail({ post }) {
   console.log('in post', post.content);
   return (
      <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
         <div className='relative overflow-hidden shadow-md mb-6'>
            <img src={post.featuredImage.url} alt={post.title} className='
               object-top h-full w-full rounded-t-lg'
            />
         </div>
         <div className='px-4 lg:px-0'>
            <div className='flex items-center mb-8 w-full justify-center'>

               <div className='flex items-center justify-center lg:mb-0
                  w-auto mr-8'
               >
                  <img src={post.author.photo.url} alt={post.author.name}
                     height='30px' width='30px'
                     className='align-middle rounded-full'
                  />

                  <p className='inline align-middle text-gray-700 ml-2
                     text-lg'
                  >
                     {post.author.name}
                  </p>
               </div>

               <div className='font-medium text-gray-700 flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6
                     inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0
                        002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                     />
                  </svg>

                  <span>{moment(post.createdAt).format('DD MMM, YYYY')}</span>
               </div>

            </div>

            <h1 className='mb-8 text-center text-3xl font-semibold'>
               {post.title}
            </h1>
            <main className='maincontent'>
               {parse(post.content.html)}
            </main>
         </div>
      </div>
   )
}

export default PostDetail;