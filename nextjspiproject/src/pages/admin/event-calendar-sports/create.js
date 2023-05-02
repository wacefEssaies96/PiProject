import EventCalendarForm from '@/components/EventCalendarForm'
import Head from 'next/head'

export default function EventCalendarAdminHomePage() {

  return (
    <div className='container'>
        <Head>
            <title>Event Calendar Form | Admin Page</title>
            <meta name='keywords' content='Events' />
        </Head>
        <EventCalendarForm operation={'Add'}/>
    </div>
  )
}