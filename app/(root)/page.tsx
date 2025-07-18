import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '../components/InterviewCard'

const Page = () => {
  return (
   <>
   <section className='card-cta'>
       <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with ai-Power Practice and get feedback</h2>
          <p className=''>Practice on reel interview questions & get instant feed back</p>
          <Button asChild className='btn-primary max-sm:w-full' >
            <Link href='/interview'>Start an Innterview
             </Link>
          </Button>
       </div>
       <Image src="/robot.png" alt="robo-dube" width={400} height={400} className="max-sm:hidden" />
    </section>
    
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interview</h2>
        <div className='interviews-section'>
          {/* <p>You haven&apos;t taken any interview yet</p> */}
           {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
             ))}
        </div>
   </section>


   
   <section className='flex flex-col gap-6 mt-8'>
          <h2>Take an interview</h2>


          <div  className='interviews-section'>
             {/* <p>There is no interview available</p> */}
             {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
             ))}
          </div>
    </section></>
  )
}

export default Page