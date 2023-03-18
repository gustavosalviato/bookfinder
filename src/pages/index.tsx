import { Header } from '../components/Header'
import { Hero } from '../components/Hero'

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col relative">
        <Header />

        <main className="flex items-center justify-center max-w-[1120px] mx-auto h-full mt-20 mb-20 px-4 max-lg:flex-col max-sm:px-8">
          <Hero />

          <img
            className="w-[570px] h-[420px] max-lg:w-[500px] max-lg:h-[500px] mt-8 max-sm:hidden"
            src="/images/reading.svg"
            alt=""
          />
        </main>
      </div>
    </>
  )
}
