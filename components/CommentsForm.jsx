import { useState, useEffect, useRef } from 'react';

function CommentsForm({slug}) {

   const [error, setError] = useState(false);
   const [localStorage, setLocalStorage] = useState(null);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   const commentEl = useRef();
   const nameEl = useRef();
   const emailEl = useRef();
   const storeDataEl = useRef();

   function handleCommentSubmission() {
      setError(false);

      const [comment, name, email, storeData] = [
         commentEl.current.value,
         nameEl.current.value,
         emailEl.current.value,
         storeDataEl.current.check

      ];

      if(!comment || !name || !email) {
         setError(true);
         return
      }

      const commentObj = {name, email, comment, slug};

      if(storeData) {
         localStorage.setItem('name', name);
         localStorage.setItem('email', email);
      } else {
         localStorage.removeItem('name', name);
         localStorage.removeItem('email', email);
      }
   }

   return (
      <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>

         <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            Post a Comment!
         </h3>

         <div className='mb-4'>
            <textarea ref={commentEl} rows='7' placeholder='Comment'
               name='comment' className='p-4 outline-none w-full rounded-lg
               focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            ></textarea>
         </div>

         <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>

            <input type="text" ref={nameEl} className='py-2 px-4 outline-none
               w-full rounded-lg focus:ring-2 focus:ring-gray-200
               bg-gray-100 text-gray-700' placeholder='Name' name='name'
            />

            <input type="email" ref={emailEl} className='py-2 px-4 outline-none
               w-full rounded-lg focus:ring-2 focus:ring-gray-200
               bg-gray-100 text-gray-700' placeholder='Email' name='email'
            />

         </div>

         <div className='mb-4'>
            <div>
               <input type="checkbox" name="storeData" id='storeData'
                  ref={storeDataEl} value='true' className='align-middle'
               />
               <label htmlFor="storeData" className='text-gray-500
                  cursor-pointer ml-2 text-xs'
               >
                  Remember my Name and Email.
               </label>
            </div>
         </div>

         {
            error &&
            <p className='text-xs text-red-500'>
               All fields are required.
            </p>
         }

         <div className='mt-8'>

            <button type='button' onClick={handleCommentSubmission}
               className='transition duration-200 ease hover:bg-indigo-900
               inline-block bg-pink-600 text-lg rounded-full text-white
               px-8 py-3 cursor-pointer'
            >
               Post Comment!
            </button>

            {
               showSuccessMessage &&
               <span className='text-xl float-right font-semibold mt-3
                  text-green-500'
               >
                  Submitted for review!
               </span>
            }

         </div>

      </div>
   )
}

export default CommentsForm;