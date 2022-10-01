import Head from 'next/head';
import {PostCard, PostWidget, Categories} from '../components';
import getPosts from '../services';

export default function Home({posts}) {
   // posts structure [{node: {author, createdAt, ...}}, node: {...}, ...]
   return (
      <div className='container mx-auto px-10 mb-8'>
         <Head>
            <title>HCMS Blog</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         {/* MAIN */}
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='lg:col-span-8 col-span-1'>
               {posts.map((post, index) => (
                  <PostCard post={post} key={index} />
               ))}
            </div>

            {/* SIDEBAR */}
            <div className='lg:col-span-4 col-span-1'>
               <div className='lg:sticky relative top-8'>
                  <PostWidget />
                  <Categories />
               </div>
            </div>

         </div>
      </div>
   )
}

export async function getStaticProps() {
   const posts = (await getPosts()) || [];
   return {
      props: {posts}
   }
}