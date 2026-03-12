import Hero from '../components/Hero/Hero'
import Marquee from '../components/Marquee/Marquee'

export default function HomePage({ ready }) {
  return (
    <div className="page page--home">
      <Hero ready={ready} />
      <Marquee />
    </div>
  )
}
