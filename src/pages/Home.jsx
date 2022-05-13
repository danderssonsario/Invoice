import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='bg-gray-800 relative overflow-hidden h-screen'>
      <div className='max-w-7xl h-full m-auto'>
        <div className='relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
          <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-200 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Binvoice</span>{' '}
                <span className='block text-indigo-600 xl:inline'>fakturahantering</span>
              </h1>
              <p className='mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                Faktureringsplattformen där du som småföretagare eller frilansare enkelt kan hantera dina fakturor. Helt digitalt!
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <Link
                    to={'/register'}
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-800 md:py-4 md:text-lg md:px-10'
                  >
                    Kom igång!
                  </Link>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Link
                    to={'/login'}
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
                  >
                    Logga in
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
        <img
          className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
          src='invoice-indigo.jpg'
          alt=''
        />
      </div>
    </div>
  )
}

export default Home
